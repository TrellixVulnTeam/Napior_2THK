__author__ = 'charlie misner'

import sys
from napior_api.calculations.calculationBase import Calculation
from napior_api.calculations.modules.wind.Wind_Lib import Wind_Coeff, componentsAndCladding, table
from math import sqrt, log, exp
from numpy import zeros, array, asarray, ndarray, vstack, interp, transpose, around, shape, arange, maximum, amax, tan, radians, sin


class Wind_Loads(Calculation):
    id = "wind-load"
    displayName = "Wind Loads"
    description = "This calculation module determines wind forces on the <strong>Main Wind Force Resisting System based on the Directional Procedure as described in Chapter 27 of the ASCE 7-10</strong>."

    def __init__(self):

        # init inputs as empty
        # inputs can be retrieved with a call to self.get_input('propertyName') which returns a BoundSymbol.
        # symbol is None if the input is not provided
        self.inputs = {}

        # a valid, reasonable set for inputs that can be used by our app for demonstration purposes
        self.example = {
            "V": 110,
            "enclosureType": "Partially Enclosed",
            "buildingWidth": 100,
            "buildingLength": 110,
            "riskCategory": "II",
            "expCategory": "B",
            "assumeRigid": True,
            "period": 0.4,
            "storyHeights": [18, 12, 12, 12],
            "storyLengths": [100, 100, 100, 100],
            "storyWidths": [100, 100, 100, 100],
            "roofSlope": 5,
            "roofType": "Monoslope",
            "topography": "Varied",
            "kztSwitch": False,
            "kztKnown": 1.3,
            "crestToBuilding": 100,
            "halfHeightToCrest": 700,
            "hillHeight": 50,
            "hillShape": "2D Ridge",
            "calcCandC": True,
            "componentNames": ["Wind Girt", "Mullion", "Panel"],
            "componentAreas": [200, 8, 30]
        }

        #self.inputs = self.example

        # this will be filled in main with a call to self.set_output('propertyName', val)
        self.outputs = {}

        super().__init__()

    def main(self):
        #story_heights = self.get_input('storyHeights')
        self.wind_perpindicular_to('B')
        self.wind_perpindicular_to('L')

    def set_direction_output(self, name, output):
        self.direction_outputs[name] = output

    def wind_perpindicular_to(self, direction):
        self.direction_outputs = {}
        V = float(self.get_input("V"))
        enclosureType = self.get_input("enclosureType")
        width = float(self.get_input("buildingWidth"))
        length = float(self.get_input("buildingLength"))
        riskCategory = self.get_input("riskCategory")
        exposureCategory = self.get_input("expCategory")
        period = float(self.get_input("period"))
        assumeRigid = self.get_input("assumeRigid")
        st_hn = self.get_input('storyHeights')
        st_hn = list(st_hn)
        st_length = self.get_input("storyLengths")
        st_width = self.get_input("storyWidths")
        st_name = self.get_input("storyNames")
        topography = self.get_input("topography")
        slope = float(self.get_input("roofSlope"))
        roofType = self.get_input("roofType")
        x = float(self.get_input("crestToBuilding"))
        L_h = float(self.get_input("halfHeightToCrest"))
        H = float(self.get_input("hillHeight"))
        roofTribB = float(self.get_input("roofTribB"))
        roofTribL = float(self.get_input("roofTribL"))
        HillShape = self.get_input("hillShape")
        calcCandC = self.get_input("calcCandC")
        calcCandC = calcCandC
        CandCNames = self.get_input("componentNames")
        CandCNames = CandCNames
        CandCAreas = self.get_input("componentAreas")
        CandCAreas = CandCAreas

        velocity = V

        K_d = 0.85  # Bind wind directionality factor
        
        if direction == 'B':
            B = width
            L = length
            story_widths = st_width
            roofTrib = roofTribB
        elif direction == 'L':
            B = length
            L = width
            story_widths = st_length
            roofTrib = roofTribL

        # Assemble height arrays and determine building height
        height_array = []
        height_n = []
        height_array = st_hn
        n_stories = len(height_array)
        # Initialize vector with story heights
        h_i = zeros((n_stories, 1), float)
        # Assemble array with story heights for n stories in building.
        for i in range(0, n_stories):
            height_n = height_array[i]
            h_i[i, 0] = height_n
        h_n = h_i.sum(axis=0)  # Sum heights of all stories
        self.set_direction_output('Height', float(h_n))
        h_roof = 0
        if roofType == 'Flat':
            h_roof = 0
        elif roofType == 'Monoslope':
            h_roof = L * tan(radians(slope))
        elif roofType == 'Hip/Gable':
            h_roof = L * tan(radians(slope)) * 0.5
        bldg_ht = h_n[0] + h_roof / 2
        self.set_direction_output('MeanRoofHeight', '%0.1f' % bldg_ht)
        seq_height_array = height_array
        for i in range(0, n_stories):
            if i >= 1:
                seq_height_array[i] = seq_height_array[i] + height_array[i - 1]
        # Create story number array
        st_num_arr = arange(1., n_stories + 1)

        # Assemble tributary height array
        h_arr = zeros((n_stories, 1), float)
        for i in range(0, n_stories):
            if i == 0:
                h_arr_i = st_hn[i]
            else:
                h_arr_i = st_hn[i] - st_hn[i - 1]
            h_arr[i, 0] = h_arr_i
        trib_height_arr = zeros((n_stories, 1), float)
        for i in range(0, n_stories):
            if i == n_stories - 1:
                tribH_i = h_arr[i] / 2
            else:
                tribH_i = h_arr[i] / 2 + h_arr[i + 1] / 2
            trib_height_arr[i, 0] = tribH_i
        trib_height_arr = trib_height_arr.transpose()

        # Determine Topographic Factor
        K_zt_arr = zeros((n_stories, 1), float)
        Kzt_round = zeros((n_stories, 1), float)
        gamma = 0
        mu = 0
        K1 = 0
        K2 = 0
        K3_arr = []
        K1HLh_val = 0
        Kzt_table = 0
        kztSwitch = None
        if topography == 'Constant':
            for i in range(0, n_stories):
                K_zt_arr[i] = 1.0
        elif topography == 'Varied':
            kztSwitch = self.get_input("kztSwitch")
            kztSwitch = kztSwitch
            if kztSwitch:
                K1HLh = Wind_Coeff.K1_tab(self, exposureCategory)
                K1HLh_val = K1HLh[HillShape]
                K1 = K1HLh_val * (float(H) / float(L_h))
                topo_factors = Wind_Coeff.topo_factors(self)
                mu = topo_factors[HillShape]['mu']
                K2 = (1 - (abs(x) / (mu * L_h)))
                gamma = topo_factors[HillShape]['gamma']
                for i in range(0, n_stories):
                    K3 = exp(-gamma * seq_height_array[i] / L_h)
                    K3_arr.append('%0.2f' % K3)
                    K_zt_i = (1 + K1 * K2 * K3)**2
                    K_zt_arr[i] = K_zt_i
                    Kzt_round[i] = '%0.2f' % K_zt_i
            else:
                kztKnown = self.get_input("kztKnown")
                kztKnown = kztKnown
                for i in range(0, n_stories):
                    K_zt_arr[i] = kztKnown
        K_zt_arr = K_zt_arr.transpose()
        K_zth = K_zt_arr[0, n_stories - 1]
        K_zt_max = max(max(K_zt_arr))
        self.set_direction_output('maxKzt', float('%0.2f' % K_zt_max))

        # Determine Wind Velocity Factors
        Exp_Cat_Ind = {
            'B': 1,
            'C': 2,
            'D': 3,
        }
        Kz_array = asarray(table.interp_on_array(self, Wind_Coeff.Kz_tab(
            self), seq_height_array, 0, Exp_Cat_Ind[exposureCategory]))
        K_h = float(Kz_array[n_stories - 1])

        # Determine Velocity Pressure
        q_h = 0.00256 * K_h * K_zth * K_d * V**2
        q_z = 0.00256 * Kz_array * K_zt_arr * K_d * V**2
        self.set_direction_output(
            'velocityPressure', around(q_z[0, :], 1).tolist())

        # Determine Gust Factor
        if assumeRigid == True:
            Gust_Coeff = Wind_Coeff.Gust_tab(self, exposureCategory)
            Rigidity = 'Rigid'
            G = 0.85
            self.set_direction_output('gustFactor', float('%0.2f' % G))
            self.set_direction_output('Flexibility', Rigidity)
            T = 0
            h6 = 0
            z_bar = 0
            L_z = 0
            I_z = 0
            Q = 0
            f = 1000
            flex_factors = 0
            n1 = 1

        else:
            Gust_Coeff = Wind_Coeff.Gust_tab(self, exposureCategory)
            T = float(period)
            f = 1 / T
            h6 = 0.6 * h_n
            z_bar = max(0.6 * h_n, Gust_Coeff['z_min'])
            epsilon_bar = Gust_Coeff['epsilon_bar']
            l = Gust_Coeff['l']
            c = Gust_Coeff['c']
            L_z = l * (z_bar / 33)**epsilon_bar
            Q = sqrt(1 / (1 + 0.63 * ((B + h_n) / L_z)**0.63))
            I_z = c * (33 / z_bar)**(1 / 6)

            if f < 1:
                Rigidity = 'Flexible'
                n1 = f
                a_bar = Gust_Coeff['a_bar']
                b_bar = Gust_Coeff['b_bar']
                V_z = b_bar * ((z_bar / 33)**a_bar) * (88 / 60) * V
                Beta = 0.05
                nu_h = 4.6 * n1 * h_n / V_z
                R_h = (1 / nu_h) - (1 / (2 * nu_h**2)) * \
                    (1 - 2.718**(-2 * nu_h))
                nu_B = 4.6 * n1 * B / V_z
                R_B = (1 / nu_B) - (1 / (2 * nu_B**2)) * \
                    (1 - 2.718**(-2 * nu_B))
                nu_L = 15.4 * n1 * L / V_z
                R_L = (1 / nu_L) - (1 / (2 * nu_L**2)) * \
                    (1 - 2.718**(-2 * nu_L))
                N1 = (n1 * L_z) / V_z
                R_n = (7.47 * N1) / ((1 + 10.3 * N1)**(5 / 3))
                R = sqrt((1 / Beta) * R_n * R_h * R_B * (0.53 + 0.47 * R_L))
                g_R = sqrt(2 * log(3600 * n1) + (0.577 / (2 * log(3600 * n1))))
                G = 0.925 * ((1 + 1.7 * I_z * sqrt(3.4**2 * Q **
                                                   2 + g_R**2 * R**2)) / (1 + 1.7 * 3.4 * I_z))
                flex_factors = {
                    'N1': '%0.2f' % N1,
                    'nu_h': '%0.2f' % nu_h,
                    'R_h': '%0.2f' % R_h,
                    'nu_B': '%0.2f' % nu_B,
                    'R_B': '%0.2f' % R_B,
                    'nu_L': '%0.2f' % nu_L,
                    'R_L': '%0.2f' % R_L,
                    'R_n': '%0.2f' % R_n,
                    'R': '%0.2f' % R,
                    'g_R': '%0.2f' %g_R,
                    'V_z_bar': '%0.1f' % V_z
                }
                self.set_direction_output('gustFactor', float('%0.2f' % G))
                self.set_direction_output('Flexibility', Rigidity)

            else:
                Rigidity = 'Rigid'
                G = 0.925 * ((1 + 1.7 * 3.4 * I_z * Q) / (1 + 1.7 * 3.4 * I_z))
                flex_factors = []
                if n_stories == 1:
                    self.set_direction_output('gustFactor', float('%0.2f' % G))
                else:
                    self.set_direction_output('gustFactor', float('%0.2f' % G))
                self.set_direction_output('Flexibility', Rigidity)

        # Determine Pressure Coefficients
        Cp_windward = 0.8
        LtoB = L / B
        Cp_leeward = table.interp_single_array(
            self, Wind_Coeff.Wall_Cp_Leeward(self), LtoB, 0, 1)

        # Determine Wind Wall Pressures
        p_windward = q_z * G * Cp_windward
        self.set_direction_output('windwardWallPressure', around(
            p_windward[0, :], 1).tolist())
        p_leeward = q_h * G * Cp_leeward
        if n_stories == 1:
            self.set_direction_output(
                'leewardWallPressure', float('%0.1f' % p_leeward))
        else:
            self.set_direction_output(
                'leewardWallPressure', float('%0.1f' % p_leeward))
        p_total = p_windward - p_leeward
        self.set_direction_output('totalLateralPressure',
                                  around(p_total[0, :], 1).tolist())

        # Determine Roof Pressure Coefficients
        widths = story_widths
        roofType = roofType
        if roofType == 'Flat':
            slope = 0
        else:
            slope = slope
        htoL = h_n / L
        htoL = htoL[0]
        Cp_roof_windward_max = 0
        Cp_roof_windward_min = 0
        Cp_roof_leeward = 0
        RoofPoint0 = 0
        RoofPoint1 = L
        RoofPoint2 = 0
        RoofPoint3 = 0
        RoofPoint4 = 0
        nRoofZones = 1
        RoofZone1Length = 0
        RoofZone2Length = 0
        RoofZone3Length = 0
        RoofZone4Length = 0
        RoofZone1Cp = 0
        RoofZone2Cp = 0
        RoofZone3Cp = 0
        RoofZone4Cp = 0

        if slope < 10:
            Cp_roof_windward_max = -0.18
            SlopeLess10ArrayMin = array([
                [0, -0.9],
                [0.5, -0.9],
                [1.0, -1.3],
                [10000, -1.3]
            ])
            Cp_roof_windward_min = interp(
                htoL, SlopeLess10ArrayMin[:, 0], SlopeLess10ArrayMin[:, 1])
            Cp_roof_leeward = Cp_roof_windward_min

            if htoL < 0.5:
                if L > h_n[0] / 2:
                    RoofPoint1 = h_n[0] / 2
                    RoofPoint2 = L
                    nRoofZones = 2
                if L > h_n[0]:
                    RoofPoint2 = h_n[0]
                    RoofPoint3 = L
                    nRoofZones = 3
                if L > 2 * h_n[0]:
                    RoofPoint3 = 2 * h_n[0]
                    RoofPoint4 = L
                    nRoofZones = 4
                RoofZone1Length = RoofPoint1 - RoofPoint0  # 0-h/2
                RoofZone2Length = RoofPoint2 - RoofPoint1  # >h/2
                RoofZone3Length = RoofPoint3 - RoofPoint2
                RoofZone4Length = RoofPoint4 - RoofPoint3
                RoofZone1Cp = -0.9
                RoofZone2Cp = -0.9
                RoofZone3Cp = -0.5
                RoofZone4Cp = -0.3
            else:
                if L > h_n[0] / 2:
                    RoofPoint1 = h_n[0] / 2
                    RoofPoint2 = L
                    nRoofZones = 2
                RoofZone1Length = RoofPoint1 - RoofPoint0  # 0-h/2
                RoofZone2Length = RoofPoint2 - RoofPoint1  # >h/2
                RoofZone3Length = RoofPoint3 - RoofPoint2
                RoofZone4Length = RoofPoint4 - RoofPoint3
                RoofZone1Cp = -1.3
                RoofZone2Cp = -0.7
                RoofZone3Cp = 0
                RoofZone4Cp = 0
                AreaZone1 = widths[-1] * RoofZone1Length
                ReductionAreas = [100, 250, 1000]
                ReductionFactors = [1, 0.9, 0.8]
                ReductionFactor = interp(
                    AreaZone1, ReductionAreas, ReductionFactors)
            RoofZoneCpArray = [RoofZone1Cp,
                               RoofZone2Cp, RoofZone3Cp, RoofZone4Cp]
            RoofZoneLengthArray = [
                RoofZone1Length, RoofZone2Length, RoofZone3Length, RoofZone4Length]

            RoofZoneNames = []
            RoofZoneCps = []
            RoofZoneLengths = []
            for i in range(0, nRoofZones):
                RoofZoneCps.append(float('%0.2f' % RoofZoneCpArray[i]))
                RoofZoneLengths.append(float('%0.1f' % RoofZoneLengthArray[i]))
                RoofZoneNames.append('Zone ' + str((i + 1)))
            self.set_direction_output('RoofZoneCps', RoofZoneCps)
            self.set_direction_output('RoofZoneLengths', RoofZoneLengths)
            self.set_direction_output('RoofZoneNames', RoofZoneNames)

        if slope > 10:
            # Determine Minimum Windward Roof Pressure Coefficient from Table in Wind Libs
            SlopeGreater10ArrayMin = Wind_Coeff.Roof_Cp_Windward_great10_Min_tab(
                self)
            lSlopeMin1 = len(SlopeGreater10ArrayMin[:, 0])
            slopeArray = array([0, 0])
            for i in range(0, lSlopeMin1):
                if htoL > SlopeGreater10ArrayMin[i, 0] and htoL < SlopeGreater10ArrayMin[i + 1, 0]:
                    x0 = SlopeGreater10ArrayMin[i, 0]
                    x1 = SlopeGreater10ArrayMin[i + 1, 0]
                    y0 = SlopeGreater10ArrayMin[i, 2]
                    y1 = SlopeGreater10ArrayMin[i + 1, 2]
                    Slope_htoL_val = y0 + (y1 - y0) * ((htoL - x0) / (x1 - x0))
                    Slope_htoL_row = array(
                        [SlopeGreater10ArrayMin[i, 1], Slope_htoL_val])
                    slopeArray = vstack([slopeArray, Slope_htoL_row])
            Cp_roof_windward_min = interp(
                slope, slopeArray[:, 0], slopeArray[:, 1])

            # Determine Maximum Windward Roof Pressure Coefficient from Table in Wind Libs
            SlopeGreater10ArrayMax = Wind_Coeff.Roof_Cp_Windward_great10_Max_tab(
                self, slope)
            lSlopeMax1 = len(SlopeGreater10ArrayMax[:, 0])
            slopeArray = array([0, 0])
            for i in range(0, lSlopeMax1):
                if htoL > SlopeGreater10ArrayMax[i, 0] and htoL < SlopeGreater10ArrayMax[i + 1, 0]:
                    x0 = SlopeGreater10ArrayMax[i, 0]
                    x1 = SlopeGreater10ArrayMax[i + 1, 0]
                    y0 = SlopeGreater10ArrayMax[i, 2]
                    y1 = SlopeGreater10ArrayMax[i + 1, 2]
                    Slope_htoL_val = y0 + (y1 - y0) * ((htoL - x0) / (x1 - x0))
                    Slope_htoL_row = array(
                        [SlopeGreater10ArrayMax[i, 1], Slope_htoL_val])
                    slopeArray = vstack([slopeArray, Slope_htoL_row])
            Cp_roof_windward_max = interp(
                slope, slopeArray[:, 0], slopeArray[:, 1])

            # Determine Leeward Roof Pressure Coefficient from Table in Wind Libs
            Cp_roof_leeward_tab = Wind_Coeff.Roof_Cp_Leeward_tab(self)
            lSlopeMax1 = len(Cp_roof_leeward_tab[:, 0])
            slopeArray = array([0, 0])
            for i in range(0, lSlopeMax1):
                if htoL > Cp_roof_leeward_tab[i, 0] and htoL < Cp_roof_leeward_tab[i + 1, 0]:
                    x0 = Cp_roof_leeward_tab[i, 0]
                    x1 = Cp_roof_leeward_tab[i + 1, 0]
                    y0 = Cp_roof_leeward_tab[i, 2]
                    y1 = Cp_roof_leeward_tab[i + 1, 2]
                    Slope_htoL_val = y0 + (y1 - y0) * ((htoL - x0) / (x1 - x0))
                    Slope_htoL_row = array(
                        [Cp_roof_leeward_tab[i, 1], Slope_htoL_val])
                    slopeArray = vstack([slopeArray, Slope_htoL_row])
            Cp_roof_leeward = interp(slope, slopeArray[:, 0], slopeArray[:, 1])
        self.set_direction_output('Cp_roof_windward_max', float(
            '%0.2f' % Cp_roof_windward_max))
        self.set_direction_output('Cp_roof_windward_min', float(
            '%0.2f' % Cp_roof_windward_min))
        self.set_direction_output(
            'Cp_roof_leeward', float('%0.2f' % Cp_roof_leeward))

        # Determine roof pressures
        p_roof_windward_max = q_h * G * Cp_roof_windward_max
        p_roof_leeward = q_h * G * Cp_roof_leeward
        p_roof_windward_min = q_h * G * Cp_roof_windward_min
        p_roof_zone1 = q_h * G * RoofZone1Cp
        p_roof_zone2 = q_h * G * RoofZone2Cp
        p_roof_zone3 = q_h * G * RoofZone3Cp
        p_roof_zone4 = q_h * G * RoofZone4Cp
        p_roof_zone_array = [p_roof_zone1,
                             p_roof_zone2, p_roof_zone3, p_roof_zone4]

        p_roof_zones = []
        for i in range(0, nRoofZones):
            p_roof_zones.append(float('%0.1f' % p_roof_zone_array[i]))
        self.set_direction_output('p_roof_zones', p_roof_zones)

        self.set_direction_output(
            'leewardRoofPressure', float('%0.1f' % p_roof_leeward))
        self.set_direction_output('maximumWindwardRoofPressure',
                                  float('%0.1f' % p_roof_windward_max))
        self.set_direction_output('minimumWindwardRoofPressure',
                                  float('%0.1f' % p_roof_windward_min))

        # Determine lateral force on project roof area

        p_roof_windward_max_lat = p_roof_windward_max * sin(radians(slope))
        p_roof_windward_min_lat = p_roof_windward_min * sin(radians(slope))
        p_roof_leeward_lat = p_roof_leeward * sin(radians(slope))
        #roof_area_trib = h_roof * widths[-1]
        F_roof = 0

        #if roofType == "Monoslope":
        #    p_roof_total = max(abs(p_roof_leeward_lat), abs(
        #        p_roof_windward_max_lat), abs(p_roof_windward_min_lat))
        #    F_roof = p_roof_total * roof_area_trib / 1000
        #elif roofType == "Hip/Gable":
        #    p_roof_total = p_roof_windward_max_lat - p_roof_leeward_lat
        #    F_roof = p_roof_total * roof_area_trib / 1000
        #elif roofType == "Flat":
        #    p_roof_total = 0
        #    F_roof = 0
        roof_area_trib = roofTrib
        p_roof_total = p_windward[0][-1] - p_leeward
        F_roof = roofTrib * p_roof_total/1000
        self.set_direction_output('pRoofTotal', float('%0.1f' % p_roof_total))
        self.set_direction_output('fRoof', float('%0.1f' % F_roof))

        # Determine story forces and base shear
        widths = story_widths
        TribA_array = widths * trib_height_arr
        self.set_direction_output(
            'tribAreas', around(TribA_array[0, :], 1).tolist())
        Fw_arr = p_total * widths * trib_height_arr / 1000
        V = Fw_arr.sum(axis=1) + F_roof
        self.set_direction_output(
            'storyForces', around(Fw_arr[0, :], 1).tolist())
        self.set_direction_output('baseShear', float('%0.1f' % V[0]))

        # Determine Components and Cladding Pressures
        if calcCandC:
            CandC_results = []
            for i in range(len(CandCNames)):
                CandC_component = componentsAndCladding(
                    q_z, q_h, enclosureType, bldg_ht, roofType, slope, CandCAreas[i])
                CandC_component.calcCandCPressures()
                CandC_component_results = {
                    'componentName': CandCNames[i], 'componentResults': CandC_component.CandC_Data}
                CandC_results.append(CandC_component_results)
            self.set_direction_output('CandC_results', CandC_results)

        direction_outputs = self.direction_outputs
        self.set_output(direction, direction_outputs)

        # Compile Dictionary for Report
        self.reportValues = {
            'riskCategory': riskCategory,
            'enclosureType': enclosureType,
            'eave_ht': '%0.1f' % h_n[0],
            'bldg_ht': '%0.1f' % bldg_ht,
            'Kz_array': Kz_array,
            'roofType': roofType,
            'buildingWidth': width,
            'buildingLength': length,
            'seq_height_array': seq_height_array,
            'roofSlope': slope,
            'Period': T,
            'assumeRigid': assumeRigid,
            'velocity': velocity,
            'exposureCategory': exposureCategory,
            'topography': topography,
            'K_d': K_d,
            'kztSwitch': kztSwitch,
            'Kzt': K_zth,
            'K_zt_max': K_zt_max,
            'x': x,
            'L_h': L_h,
            'gamma': gamma,
            'mu': mu,
            'K1': '%0.2f' % K1,
            'K2': '%0.2f' % K2,
            'K3': K3_arr,
            'Kzt_arr': K_zt_arr[0],
            'Kz_arr': Kz_array,
            'K1HLh': '%0.2f' % K1HLh_val,
            'H': H,
            'Gust_Coeff': Gust_Coeff,
            'a_hat': '%0.2f' % Gust_Coeff['a_hat'],
            'alpha_bar': '%0.2f' % Gust_Coeff['a_bar'],
            '0.6H': '%0.1f' % h6,
            'z_bar': '%0.1f' % z_bar,
            'L_z': '%0.1f' % L_z,
            'I_z': '%0.1f' % I_z,
            'Q': '%0.2f' % Q,
            'G': '%0.2f' % G,
            'Rigidity': Rigidity,
            'n1': '%0.2f' % f,
            'flex_factors': flex_factors,
            'Cp_windward': '%0.1f' % Cp_windward,
            'Cp_leeward': '%0.1f' % Cp_leeward,
            'Cp_roof_windward_max': '%0.2f' % Cp_roof_windward_max,
            'Cp_roof_windward_min': '%0.2f' % float(str(Cp_roof_windward_min).strip('[]')),
            'Cp_roof_leeward': '%0.1f' % float(str(Cp_roof_leeward).strip('[]')),
            'RoofZone1Cp': RoofZone1Cp,
            'RoofZone2Cp': RoofZone2Cp,
            'RoofZone3Cp': RoofZone3Cp,
            'RoofZone4Cp': RoofZone4Cp,
            'RoofPoint1': RoofPoint1,
            'RoofPoint2': RoofPoint2,
            'RoofPoint3': RoofPoint3,
            'RoofPoint4': RoofPoint4,
            'nRoofZones': nRoofZones,
            'q_h': '%0.1f' % q_h,
            'p_h': '%0.1f' % p_leeward,
            'p_roof_zone1': '%0.1f' % p_roof_zone1,
            'p_roof_zone2': '%0.1f' % p_roof_zone2,
            'p_roof_zone3': '%0.1f' % p_roof_zone3,
            'p_roof_zone4': '%0.1f' % p_roof_zone4,
            'p_windward_roof_max': '%0.1f' % float(str(p_roof_windward_max).strip('[]')),
            'p_windward_roof_min': '%0.1f' % float(str(p_roof_windward_min).strip('[]')),
            'p_leeward_roof': '%0.1f' % float(str(p_roof_leeward).strip('[]')),
            'p_windward_roof_max_lat': '%0.1f' % float(str(p_roof_windward_max_lat).strip('[]')),
            'p_windward_roof_min_lat': '%0.1f' % float(str(p_roof_windward_min_lat).strip('[]')),
            'p_roof_leeward_lat': '%0.1f' % float(str(p_roof_leeward_lat).strip('[]')),
            'p_roof_total': '%0.1f' % p_roof_total,
            'h_roof': '%0.1f' % h_roof,
            'w_roof': '%0.1f' % widths[-1],
            'A_roof_trib': '%0.0f' % roof_area_trib,
            'F_roof': '%0.2f' % F_roof,
            'base_shear': float('%0.1f' % V[0])
        }
        self.set_direction_output('reportValues', self.reportValues)
        
        direction_outputs = self.direction_outputs
        self.set_output(direction, direction_outputs)

    if __name__ == '__main__':
        main()
