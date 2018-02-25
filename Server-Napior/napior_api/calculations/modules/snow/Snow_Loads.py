from napior_api.calculations.calculationBase import Calculation
from math import sqrt, log, exp, sin, cos, radians, tan, radians
from numpy import zeros, array, asarray, linalg, vstack, delete, transpose, shape, interp, sum, hstack, size, linspace, flipud, ndarray, where, around, power, matrix

class Snow_Loads(Calculation):
    id = "snow-load"
    displayName = "Snow Loads"
    description = "This calculation module determines snow loads on various roof types per Chapter 7 of the ASCE 7-10."

    def __init__(self):

        # init inputs as empty
        # inputs can be retrieved with a call to self.get_input('propertyName') which returns a napior.bound_symbol.BoundSymbol.
        # symbol.raw is None if the input is not provided
        self.inputs = {}

        # a valid, reasonable set for inputs that can be used by our app for demonstration purposes
        self.example = {
            "company": "Napior",
            "project": "Super awesome building",
            "description": "It IS awesome",
            "engineer": "Kyle Dennison",
            "groundSnowLoad": 25,
            "temperatureFactor": 1.0,
            "terrainCategory": "B",
            "roofExposure": "Sheltered",
            "riskCategory":"II",
            "roofType": "Stepped",
            "roofSlope": 10,
            "roofSurfaceType": "Slippery",
            "distEaveToRidge": 25,
            "lengthUpperRoof": 20,
            "lengthLowerRoof": 15,
            "stepHeight":5
        }
        
        self.inputs = self.example

        self.schema = {
            "type":"object",
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
                "groundSnowLoad": {
                    "type": "number",
                    "title": "Ground Snow Load",
                    "description": "Ground snow load pg"
                },
                "temperatureFactor": {
                    "type": "number",
                    "title": "Temperature Factor",
                    "description": "Roof type temperature factor.",
                    "enum": [1.0, 1.1, 1.2, 1.3, 0.85]
                },
                "terrainCategory": {
                    "type": "string",
                    "title": "Terrain Category",
                    "description": "Type of terrain that the building is in",
                    "enum": ["B","C","D","Windswept Mountains", "Alaska Treeless"]
                },
                "roofExposure": {
                    "type": "string",
                    "title": "Roof Exposure Category",
                    "description": "Exposure category for roof.",
                    "enum": ["Fully Exposed","Partially Exposed","Sheltered"]
                },
                "riskCategory": {
                    "type": "string",
                    "title": "Risk Category",
                    "description": "Building Risk Category",
                    "enum": ["I", "II", "III", "IV"]
                },
                "roofType":{
                    "type": "string",
                    "title": "Roof Type",
                    "description": "Type of roof segment being observed",
                    "enum": ["Flat", "Monoslope", "Hip/Gable", "Stepped"]
                },
                "roofSlope":{
                    "type": "number",
                    "title": "Roof Slope",
                    "description": "Slope of the roof in degrees"
                },
                "roofSurfaceType":{
                    "type": "string",
                    "title": "Roof Surface Type",
                    "description": "Whether the roof is slippery or not.",
                    "enum": ["Slippery", "Other"]
                },
                "distEaveToRidge":{
                    "type": "number",
                    "title": "Distance from the eave to the ridge.",
                    "description": "Distance from the eave to the ridge for a Hip/Gable roof."
                },
                "lengthUpperRoof":{
                    "type": "number",
                    "title": "Upper Roof Length",
                    "description": "Length of the upper portion of a Stepped roof."
                },
                "lengthLowerRoof":{
                    "type": "number",
                    "title": "Lower Roof Length",
                    "description": "Length of the lower portion of a Stepped roof."
                },
                "stepHeight": {
                    "type": "number",
                    "title": "Roof Step Height",
                    "description": "Height of step for Stepped roof."
                }
            },
            "required": ["groundSnowLoad", "temperatureFactor", "terrainCategory", "roofExposure", "riskCategory", "roofType", "roofSurfaceType"]
        }

        # this will be filled in main with a call to self.set_output('propertyName', val)
        self.outputs = {}

        super().__init__()

    def main(self):

        roof_slope = 0
        pg = self.get_input('groundSnowLoad')
        Ct = self.get_input('temperatureFactor')
        Ct = '%0.2f' %Ct
        terrain_category = self.get_input('terrainCategory')
        roof_exposure = self.get_input('roofExposure')
        risk_category = self.get_input('riskCategory')
        roof_type = self.get_input('roofType')
        roof_slope = self.get_input('roofSlope')
        roof_surface_type = self.get_input('roofSurfaceType')
        dist_eave_to_ridge = self.get_input('distEaveToRidge')
        length_upper_roof = self.get_input('lengthUpperRoof')
        length_lower_roof = self.get_input('lengthLowerRoof')
        hc = self.get_input('stepHeight')

        if roof_type == 'Flat':
            roof_slope = 0
            dist_eave_to_ridge = 0
            length_upper_roof = 0
            length_lower_roof = 0
            hc = 0
        elif roof_type == 'Monoslope':
            dist_eave_to_ridge = 0
            length_upper_roof = 0
            length_lower_roof = 0
            hc = 0
        elif roof_type == 'Hip/Gable':
            length_upper_roof = 0
            length_lower_roof = 0
            hc = 0
        else:
            roof_slope = 0
            dist_eave_to_ridge = 0

        exposure_factor_table = {
                                 "Fully Exposed":{"B":0.9, "C":0.9, "D":0.8, "Windswept Mountains":0.7, "Alaska Treeless":0.7},
                                 "Partially Exposed":{"B":1.0, "C":1.0, "D":0.9, "Windswept Mountains":0.8, "Alaska Treeless":0.8},
                                 "Sheltered":{"B":1.2, "C":1.1, "D":1.0, "Windswept Mountains":0.8, "Alaska Treeless":0.8}
                                 }
        importance_factor_table = {"I":0.8,"II":1.0,"III":1.1,"IV":1.2}

        Ce = exposure_factor_table[roof_exposure][terrain_category]
        self.set_output('exposureFactor', '%0.1f' %Ce)
        self.set_output('temperatureFactor', '%0.1f' %float(Ct))
        Is = importance_factor_table[risk_category]
        self.set_output('Is', '%0.1f' %Is)
        gamma = min(0.13*pg+14, 30.0) #psf
        pf1 = 0.7*Ce*float(Ct)*Is*pg #psf
        if pg <= 20:
            pm = Is*pg #psf
        else:
            pm = Is*20 #psf
        if roof_slope < 15 and pg > 20:
            pf = max(pf1,pm) #psf
        else:
            pf = pf1
        self.set_output('pf', '%0.1f' %pf)

        Cs_definition_table = {
                               "0.85":{"Slippery": 5.0, "Other": 30.0},
                               "1.00":{"Slippery": 5.0, "Other": 30.0},
                               "1.10":{"Slippery": 10.0, "Other": 37.5},
                               "1.20":{"Slippery": 15.0,	"Other": 45.0},
                               "1.30":{"Slippery": 15.0,	"Other": 45.0}
                              }
        Cs_base = Cs_definition_table[str(Ct)][roof_surface_type]
        if roof_slope < Cs_base:
            Cs = 1.0
        elif roof_slope > 70:
            Cs = 0
        else:
            slope1 = Cs_definition_table[str(Ct)][roof_surface_type]
            slope2 = 70.0
            Cs = 1-(roof_slope-slope1)/(slope2-slope1)
        self.set_output('Cs','%0.2f' %Cs)
        ps = Cs*pf
        self.set_output('ps', '%0.1f' %ps)

        lu=0;
        S=0;
        hd=0
        leeward_surcharge_load=0;
        leeward_surcharge_width=0;
        if roof_type == "Hip/Gable" and roof_slope < 30.2 and roof_slope > 2.38:
            S = 1.0/tan(radians(roof_slope))
            lu = dist_eave_to_ridge #feet
            hd = 0.43*(lu**(1.0/3))*((pg+10)**(0.25))-1.5
            windward_load = 0.3*float(ps)
            self.set_output('minDriftLoad', '%0.1f' %windward_load)
            leeward_surcharge_load = hd*gamma/S**(1/2)
            self.set_output('maxDriftLoad', '%0.1f' %leeward_surcharge_load)
            leeward_surcharge_width = (8.0/3.0)*hd*S**(1/2)
            self.set_output('w', '%0.1f' %leeward_surcharge_width)

        hb = pf/gamma
        hchb = hc/hb
        lu_leeward = 0
        lu_windward = 0
        hd_leeward = 0
        hd_windward = 0
        hd_max = 0
        surcharge_width = 0
        surcharge_width1 = 0
        wmax = 0
        pd = 0
        pd_min = 0
        if roof_type == "Stepped" and hc/hb > 0.2:
            lu_leeward = length_upper_roof
            hd_leeward = 0.43*(lu_leeward**(1.0/3))*((pg+10)**(0.25))-1.5
            lu_windward = length_lower_roof
            hd_windward = 0.43*(lu_windward**(1.0/3))*((pg+10)**(0.25))-1.5
            hd_max = max(hd_leeward, hd_leeward)
            hd = min(hd_max, hc)
            self.set_output('hd', '%0.1f' %hd)
            wmax = 8*hc
            if hc > hd_max:
                surcharge_width1 = 4*hd
                surcharge_width = min(surcharge_width1, 8*hc)
            else:
                surcharge_width1 = 4*hd**2/hc
                surcharge_width = min(surcharge_width1, 8*hc)
            pd = gamma*hd
            self.set_output('maxDriftLoad', '%0.1f' %pd)
            self.set_output('w', '%0.1f' %surcharge_width)
            if surcharge_width < length_lower_roof:
                pd_min = 0
            else:
                pd_min = pd + (length_lower_roof)*((-pd)/(surcharge_width))
            self.set_output('minDriftLoad', '%0.1f' %pd_min)
            p_total_max = pf + pd
            self.set_output('p_total_max', '%0.1f' %p_total_max)
            p_total_min = pf + pd_min
            self.set_output('p_total_min', '%0.1f' %p_total_min)

        self.reportValues = {
            'risk_category': risk_category,
            'pg': pg,
            'Ct': Ct,
            'terrain_category': terrain_category,
            'roof_exposure': roof_exposure,
            'risk_category': risk_category,
            'roof_type': roof_type,
            'roof_slope': roof_slope,
            'roof_surface_type': roof_surface_type,
            'dist_eave_to_ridge': dist_eave_to_ridge,
            'length_upper_roof': length_upper_roof,
            'length_lower_roof': '%0.1f' %length_lower_roof,
            'hc': hc,
            'Ce': Ce,
            'Is': Is,
            'gamma': gamma,
            'pf1': pf1,
            'pf': '%0.2f' %pf,
            'pm': '%0.2f' %pm,
            'Cs_base': Cs_base,
            'Cs': '%0.2f' %Cs,
            'ps': '%0.2f' %ps,
            'S': '%0.2f' %S,
            'lu': lu,
            'hd': '%0.2f' %hd,
            'leeward_surcharge_load': '%0.1f' %leeward_surcharge_load,
            'leeward_surcharge_width': '%0.1f' %leeward_surcharge_width,
            'hc': '%0.1f' %hc,
            'hb': '%0.1f' %hb,
            'hchb': '%0.1f' %hchb,
            'hchb_lim': 0.2,
            'lu_leeward': '%0.1f' %lu_leeward,
            'lu_windward': '%0.1f' %lu_windward,
            'hd_windward': '%0.1f' %hd_windward,
            'hd_leeward': '%0.1f' %hd_leeward,
            'hd_max': '%0.1f' %hd_max,
            'surcharge_width': '%0.1f' %surcharge_width,
            'surcharge_width1': '%0.1f' %surcharge_width1,
            'wmax': '%0.1f' %wmax,
            'pd': '%0.1f' %pd,
            'pd_min': '%0.1f' %pd_min,
        }
        self.set_output('reportValues', self.reportValues)

    if __name__ == '__main__':
        main()
