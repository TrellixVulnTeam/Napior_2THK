__author__ = 'charlie misner'

# Calculates Seismic Story Forces using the Equivalent Lateral Force method.

from napior_api.calculations.calculationBase import Calculation
from numpy import zeros, array
from sympy import Min, Max, latex
import sys

#from modules.Equivalent_Lateral_Force.lib import SystemFactors

class Seismic_Loads(Calculation):
    id = "Seismic Loads"
    displayName = "Seismic Loads"
    description = "This calculation module determines seismic forces on building structures based on the Equivalent Lateral Force procedure as described in Chapter 12.8 of the ASCE 7-10."

    def __init__(self):

        self.inputs = {}

        self.example = {
            "company": "Napior",
            "project": "Seismic Loads",
            "description": "Determine the seismic loads on a project.",
            "engineer": "Charlie Misner",
            "usgsDataType": "giveMax",
            "Ss": 1.35,
            "S1": 0.5,
            "Sds": 0.9,
            "Sd1": 0.5,
            "Fa": 1.0,
            "Fv": 1.5,
            "Tl": 6,
            "R": 6,
            "Ct": 0.02,
            "x": 0.75,
            "siteClass": "D",
            "riskCategory": "II",
            "structCategory": "Building Frames",
            "structSystem": {
                "name": "Special reinforced concrete shear walls ",
                "category": "Building Frames"
            },
            "letNapiorCalcPeriod": False,
            "analyticalPeriod": 0.5,
            "storyHeights": [18, 12, 12, 12],
            "storyWeights": [550, 300, 300, 150],
            "initialStory": 1
        }

        #self.inputs = self.example

        self.schema = {
            "type": "object",
            "properties": {
                "company": {
                    "type": "string",
                    "description": "Company that owns the software or designed the building."
                },
                "project": {
                    "type": "string",
                    "description": "Project that the calculation is a part of."
                },
                "description": {
                    "type": "string",
                    "description": "Description of the building or calculation."
                },
                "engineer": {
                    "type": "string",
                    "description": "Engineer performing the calculation."
                },
                "usgsDataType":{
                    "type": "string",
                    "description": "Method of obtaining acceleration parameters",
                    "enum": ["usgsDirect", "giveDesign", "giveMax"]
                },
                "Ss": { 
                    "type": "number",
                    "description": "Short period spectral acceleration in units of g (e.g. = 0.9)"
                },
                "S1": { 
                    "type": "number",
                    "description": "1 second spectral acceleration in units of g (e.g. = 0.5)"
                },
                "Sds": { 
                    "type": "number",
                    "description": "DESIGN Short period spectral acceleration in units of g (e.g. = 0.9)"
                },
                "Sd1": { 
                    "type": "number",
                    "description": "DESIGN 1 second spectral acceleration in units of g (e.g. = 0.5)"
                },
                "Fa": { 
                    "type": "number",
                    "description": "Short period site coefficient (e.g. = 0.9)"
                },
                "Fv": { 
                    "type": "number",
                    "description": "1 second site coefficient (e.g. = 0.5)"
                },
                "Tl": { 
                    "type": "number",
                    "description": "Long transition period (e.g. = 6)"
                },
                "siteClass": {
                    "type": "string",
                    "title": "Site Class",
                    "description": "Seismic Site Class",
                    "enum": ["A", "B", "C", "D", "E", "F"]
                },
                "structCategory": {
                    "type": "string",
                    "title": "Structural Category",
                    "description": "Structural System Category",
                    "enum": []
                },
                "structSystem": {
                    "type": "object",
                    "enum": [], 
                    "description": "Structural System",
                    "title": "Structural System"
                },
                "riskCategory": {
                    "type": "string",
                    "title": "Risk Category",
                    "description": "Building Risk Category",
                    "enum": ["I", "II", "III", "IV"]
                },
                "initialStory": {
                    "type": "number",
                    "title": "Initial Story",
                    "default": "1"
                },
                "storyWeights": {
                    "type": "array",
                    "title": "Story Weights",
                    "description": "Weight of each story (k), weight in kips (e.g. 150) 1 kip = 1000 lbs",
                    "items": {
                        "type": "number"
                    },
                    "minItems": 1
                },
                "storyHeights": {
                    "type": "array",
                    "title": "Story Heights",
                    "description": "Height of each story (ft)",
                    "items": {
                        "type": "number"
                    },
                    "minItems": 1
                },
                "letNapiorCalcPeriod": {
                    "type":"boolean",
                    "title": "Let Napior Calculate Period",
                    "description": "User has an analytical period, or doesn't."
                },
                "analyticalPeriod": {
                    "type":"number",
                    "title": "Analytical Period",
                    "description": "Analytical Period"
                }
            },
            "required": ["Ss", "S1", "Tl", "siteClass", "structSystem", "riskCategory", "storyWeights", "storyHeights"]
        }

        self.outputs = {}

        """if len(self.schema['properties']['structSystem']['enum']) == 0:
            for category in self.factors.systemCategories:
                self.schema['properties']['structCategory']['enum'].append(self.factors.systemCategories[category]['displayName'])
                # construct sys options
                for system in self.factors.systemCategories[category]['systems']:
                    name = self.factors.systemCategories[category]['systems'][system].name
                    # construct category options
                    self.schema['properties']['structSystem']['enum'].append({
                        'category': self.factors.systemCategories[category]['displayName'],
                        'name': name
                    })"""
        super().__init__()

    def main(self):

        # Initialize parameters/ get inputs
        company = self.get_input('company')
        project = self.get_input('project')
        description = self.get_input('description')
        engineer = self.get_input('engineer')
        usgsData = self.get_input('usgsDataType')
        Ss = float(self.get_input('Ss'))
        S1 = float(self.get_input('S1'))
        TL = self.get_input('Tl')
        SiteClass = self.get_input('siteClass')
        RiskCategory = self.get_input('riskCategory')
        System = self.get_input('structSystem')
        System_Category= self.get_input('structCategory')
        letNapiorCalcPeriod = self.get_input('letNapiorCalcPeriod')
        if letNapiorCalcPeriod == False:
            analyticalPeriod = self.get_input('analyticalPeriod')
        elif  letNapiorCalcPeriod == True:
            analyticalPeriod = 0
        st_wt = self.get_input('storyWeights')
        st_hn = self.get_input('storyHeights')
        st_name = self.get_input('storyNames')
        self.set_output('storyNames', st_name)
        R = self.get_input('R')# Bind seismic response modification coefficient R-factor
        Ct = self.get_input('Ct') #Bind Period Factor
        x = self.get_input('x') #Bind period factor
        #st_name = self.get_input('st_name')
        #has_story_names = st_name == None

        #get_input always returns a symbol with the JSON value in BoundSymbol.raw
        weight_array = [float(i) for i in st_wt] #assemble story weights into raw array
        height_array = [float(i) for i in st_hn] #assemble story heights into raw array

        n_stories = len(height_array) #Determine number of stories

        # Determine Building Seismic Weight
        w_n = zeros((n_stories, 1), float)  # Initialize vector with story weights

        for i in range(0, n_stories):  # Assemble array with story weights for n stories in building.
            weight_n = weight_array[i]
            w_n[i, 0] = weight_n

        W = w_n.sum(axis=0) #Sum weight of all stories
        self.set_output('Weight', W) #Set weight output

        # Determine Building Height
        h_i = zeros((n_stories, 1), float)  # Initialize vector with story heights

        for i in range(0, n_stories):  # Assemble array with story heights for n stories in building.
            height_n = height_array[i]
            h_i[i, 0] = height_n

        h_n = h_i.sum(axis=0) #Sum heights of all stories
        self.set_output('Height', h_n)

        #  Compute Approximate Fundamental Period
        Ta = Ct*h_n**x
        Ta_1 = Ta
        Tra = Ta
        self.set_output('Ta', float("%.3f" %Ta))

        Cu = 1.4
        Cu_Ta = Cu*Ta
        self.set_output('CuTa', float("%.3f" % Cu_Ta))

        Tr = float(analyticalPeriod)
        if letNapiorCalcPeriod == False:
            if Tr > Cu_Ta:
                Ta = Cu_Ta
            elif Tr < Cu_Ta:
                if Tr > Tra:
                    Ta = analyticalPeriod
            elif Tr < Tra:
                Ta = Ta
            elif Tr == Tra:
                Ta = Ta

        #  Determine Seismic importance factor
        seismicImportanceMap = {
            'I': 1.0,
            'II': 1.0,
            'III': 1.24,
            'IV': 1.50
        }

        Ie = seismicImportanceMap[RiskCategory]

        ###############################################################################################################
        #Compute acceleration parameters
        if usgsData == 'giveMax':
            # Compute Fa
            FaTab = {
            'A':[0.8, 0.8, 0.8, 0.8, 0.8],
            'B':[1.0, 1.0, 1.0, 1.0, 1.0],
            'C':[1.2, 1.2, 1.1, 1.0, 1.0],
            'D':[1.6, 1.4, 1.2, 1.1, 1.0],
            'E':[2.5, 1.7, 1.2, 0.9, 0.9]
            }

            Ss_int = [0.25, 0.5, 0.75, 1.00, 1.25]
            Fa_array=FaTab[SiteClass]
            Fa = 1
            Ss = Ss
            if Ss <= Ss_int[0]:
                Fa = Fa_array[0]
            elif Ss >= Ss_int[4]:
                Fa = Fa_array[4]
            elif Ss >= Ss_int[3] and Ss <= Ss_int[(4)]:
                Fa_0 = Fa_array[3]
                Fa_1 = Fa_array[4]
                Ss_0 = Ss_int[3]
                Ss_1 = Ss_int[4]
                Fa = Fa_0+(Fa_1-Fa_0)*((Ss-Ss_0)/(Ss_1-Ss_0))
            else:
                for i in range(0,3):
                    if Ss >= Ss_int[i] and Ss <= Ss_int[(i+1)]:
                        Fa_0 = Fa_array[i]
                        Fa_1 = Fa_array[i+1]
                        Ss_0 = Ss_int[i]
                        Ss_1 = Ss_int[i+1]
                        Fa = Fa_0+(Fa_1-Fa_0)*((Ss-Ss_0)/(Ss_1-Ss_0))

            self.set_output('Fa', Fa)

            # Compute Fv
            FvTab = {
            'A':[0.8, 0.8, 0.8, 0.8, 0.8],
            'B':[1.0, 1.0, 1.0, 1.0, 1.0],
            'C':[1.7, 1.6, 1.5, 1.4, 1.3],
            'D':[2.4, 2.0, 1.8, 1.6, 1.5],
            'E':[3.5, 3.2, 2.8, 2.4, 2.4]
            }

            S1_int = [0.1, 0.2, 0.3, 0.4, 0.5]
            Fv_array=FvTab[SiteClass]
            Fv = 1
            S1 = S1
            if S1 <= S1_int[0]:
                Fv = Fv_array[0]
            elif S1 >= S1_int[4]:
                Fv = Fv_array[4]
            elif S1 >= S1_int[3] and S1 <= S1_int[(4)]:
                Fv_0 = Fa_array[3]
                Fv_1 = Fa_array[4]
                S1_0 = Ss_int[3]
                S1_1 = Ss_int[4]
                Fv = Fv_0+(Fv_1-Fv_0)*((S1-S1_0)/(S1_1-S1_0))
            else:
                for i in range(0,3):
                    if S1 >= S1_int[i] and S1 <= S1_int[i+1]:
                        Fv_0 = Fv_array[i]
                        Fv_1 = Fv_array[i+1]
                        S1_0 = S1_int[i]
                        S1_1 = S1_int[i+1]
                        Fv = Fv_0+(Fv_1-Fv_0)*((S1-S1_0)/(S1_1-S1_0))

            self.set_output('Fv', Fv)

            Sds=2/3*Fa*Ss
            self.set_output('Sds', float("%.2f" % Sds))
            Sd1=2/3*Fv*S1
            self.set_output('Sd1', float("%.2f" % Sd1))
        elif usgsData == 'usgsDirect':
            Ss = float(Ss)
            S1 = float(S1)
            Sds = float(self.get_input('Sds'))
            Sd1 = float(self.get_input('Sd1'))
            self.set_output('Sds', float("%.2f" % Sds))
            self.set_output('Sd1', float("%.2f" % Sd1))
            Fa = float(self.get_input('Fa'))
            Fv = float(self.get_input('Fv'))

        ##############################################################################################################
        # Compute Seismic Coefficient
        RIe = R/Ie
        Cs = Sds/(R/Ie)

        TLr = float(TL)
        if Tra <= TLr:
            Cs1 = Sd1/(Ta*(R/Ie))
        else:
            Cs1 = (Sd1*TL)/((Ta**2)*(R/Ie))

        CsMin = Min(Cs, Cs1)
        Cs2 = 0.044*Sds*Ie
        Cs3 = 0.01

        Stest = S1*3/2
        Smax = 0.6
        if S1 > 0.6:
            Cs4 = (0.5*S1*3/2)/(R/Ie)
        else:
            Cs4 = 0

        CsMax = Max(CsMin, Cs2, Cs3, Cs4)
        self.set_output('Cs', float("%.3f" % CsMax))

        #  Compute Seismic Base Shear
        V = CsMax*W
        self.set_output('V', float("%.1f" % V))

        ###############################################################################################################
        # Determine shape factor
        k = 2.0
        if Ta <= 0.5:
            k = 1.0
        elif Ta <= 2.5:
            k = 0.5*Ta + 0.75

        ###############################################################################################################
        #  Determine story forces

        for i in range(0, n_stories):
            if i >= 1:
                height_array[i] = height_array[i] + height_array[i-1]

        #  Determine story forces

        hk = array(height_array).astype(float)**k
        Whk = array(weight_array).astype(float)*hk
        sum_Whk = Whk.sum(axis=0)
        Whk_val = sum_Whk


        Cvx = Whk / sum_Whk
        Fx_array = V * Cvx

        #  Report Values, All Outputs pertinent to our customers
        outArray = []
        if float(n_stories) > 1.5:
            for i in range(0, n_stories):
                st_force = Fx_array[i]
                outArray.append(float("%.1f" % st_force))
                self.set_output('Story_Forces', outArray)

        if float(n_stories) < 1.5:
            self.set_output('Story_Forces', [float("%.1f" % V)])

        ###############################################################################################################
        # Compile Dictionary for Report (Temp Fix)

        self.reportValues = {
                'company': company,
                'project': project,
                'description': description,
                'engineer': engineer,
                'st_wt':weight_array,
                'st_ht': height_array,
                'k': '%0.2f' %k,
                'sum_Whk': '%0.2f' %Whk_val,
                'Ct': Ct,
                'x': x,
                'Ta_1': '%0.2f' %Tra,
                'Cu': Cu,
                'Ta': Tra,
                'CuTa': Cu_Ta,
                'Sds': Sds,
                'Sd1': Sd1,
                'Fa': '%0.2f' %Fa,
                'Fv': '%0.2f' %Fv,
                'Stest': Stest,
                'Smax': Smax,
                'Tra': Tra,
                'TLr': TLr,
                'T_m': Tr,
                'R': R,
                'Ie': Ie,
                'Cs':'%0.2f' %Cs,
                'Cs1':'%0.2f' % Cs1,
                'CsMin':'%0.2f' % CsMin,
                'Cs2':'%0.2f' % Cs2,
                'Cs3':'%0.2f' % Cs3,
                'Cs4':'%0.2f' % Cs4,
                'CsMax':'%0.2f' % CsMax,
                'heightArray': height_array,
                'Whk': Whk,
                'Cvx':Cvx
                }
        self.set_output('reportValues', self.reportValues)

    if __name__ == '__main__':
        main()
