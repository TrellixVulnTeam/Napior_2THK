from numpy import array, vstack, interp
from math import sqrt, log, exp
import sys

class Wind_Coeff(object):

    def Kz_tab(self):
        Kz_tab = array([
            [0,	    0.57,	0.85,	1.03],
            [15,	0.57,	0.85,	1.03],
            [20,	0.62,	0.9,    1.08],
            [25,	0.66,	0.94,	1.12],
            [30,	0.7,    0.98,	1.16],
            [40,	0.76,	1.04,	1.22],
            [50,	0.81,	1.09,	1.27],
            [60,	0.85,	1.13,	1.31],
            [70,    0.89,	1.17,	1.34],
            [80,	0.93,	1.21,	1.38],
            [90,	0.96,	1.24,	1.4],
            [100,	0.99,	1.26,	1.43],
            [120,	1.04,	1.31,	1.48],
            [140,	1.09,	1.36,	1.52],
            [160,	1.13,	1.39,	1.55],
            [180,	1.17,	1.43,	1.58],
            [200,	1.2,    1.46,	1.61],
            [250,	1.28,	1.53,	1.68],
            [300,	1.35,	1.59,	1.73],
            [350,	1.41,	1.64,	1.78],
            [400,	1.47,	1.69,	1.82],
            [450,	1.52,	1.73,	1.86],
            [500,	1.56,	1.77,	1.89]
        ])
        return Kz_tab

    def Gust_tab(self,exposureCategory):
        Gust_tab = {
            'B':{
                'alpha':7,
                'z_g':1200,
                'a_hat':0.142857143,
                'b_hat':0.84,
                'a_bar':0.25,
                'b_bar':0.45,
                'c':0.30,
                'l':320,
                'epsilon_bar':0.33,
                'z_min':30
            },
            'C':{
                'alpha':9.5,
                'z_g':900,
                'a_hat':0.105263158,
                'b_hat':1.00,
                'a_bar':0.153846154,
                'b_bar':0.65,
                'c':0.20,
                'l':500,
                'epsilon_bar':0.20,
                'z_min':15
            },
            'D':{
                'alpha':11.5,
                'z_g':700,
                'a_hat':0.086956522,
                'b_hat':1.07,
                'a_bar':0.111111111,
                'b_bar':0.8,
                'c':0.15,
                'l':650,
                'epsilon_bar':0.125,
                'z_min':7
            }
        }
        return Gust_tab[exposureCategory]

    def Wall_Cp_Leeward(self):

        Cp_leeward = array([
            [0, -0.5],
            [1, -0.5],
            [2, -0.3],
            [4, -0.2],
            [10000, -0.2]
        ])
        return Cp_leeward

    def Roof_Cp_Windward_less10_tab(self):

        SlopeLess10ArrayMin = array([
                [0, -0.9],
                [0.5,-0.9],
                [1.0,-1.3],
                [10000,-1.3]
            ])
        return SlopeLess10ArrayMin

    def Roof_Cp_Windward_great10_Min_tab(self):

        SlopeGreater10ArrayMin = array([
                [0.00, 10, -0.7],
                [0.25, 10, -0.7],
                [0.50, 10, -0.9],
                [1.00, 10, -1.3],
                [100000, 10, -1.3],
                [0.00, 15, -0.5],
                [0.25, 15, -0.5],
                [0.50, 15, -0.7],
                [1.00, 15, -1.0],
                [100000, 15, -1.0],
                [0.00, 20, -0.3],
                [0.25, 20, -0.3],
                [0.50, 20, -0.4],
                [1.00, 20, -0.7],
                [100000, 20, -0.7],
                [0.00, 25, -0.2],
                [0.25, 25, -0.2],
                [0.50, 25, -0.3],
                [1.00, 25, -0.5],
                [100000, 25, -0.5],
                [0.00, 30, -0.2],
                [0.25, 30, -0.2],
                [0.50, 30, -0.2],
                [1.00, 30, -0.3],
                [100000, 30, -0.3],
                [0.00, 35, 0.0],
                [0.25, 35, 0.0],
                [0.50, 35, -0.2],
                [1.00, 35, -0.2],
                [100000, 35, -0.2],
                [0.00, 45, 0.0],
                [0.25, 45, 0.0],
                [0.50, 45, 0.0],
                [1.00, 45, 0.0],
                [100000, 45, 0.0],
                [0.00, 60, 0.0],
                [0.25, 60, 0.0],
                [0.50, 60, 0.0],
                [1.00, 60, 0.0],
                [100000, 60, 0.0],
                [0.00, 100000, 0.0],
                [0.25, 100000, 0.0],
                [0.50, 100000, 0.0],
                [1.00, 100000, 0.0],
                [100000, 100000, 0.0]
            ])
        return SlopeGreater10ArrayMin

    def Roof_Cp_Windward_great10_Max_tab(self, slope):

        SlopeGreater10ArrayMax = array([
                [0.00, 10, -0.18],
                [0.25, 10, -0.18],
                [0.50, 10, -0.18],
                [1.00, 10, -0.18],
                [100000, 10, -0.18],
                [0.00, 15, 0.0],
                [0.25, 15, 0.0],
                [0.50, 15, -0.18],
                [1.00, 15, -0.18],
                [100000, 15, -0.18],
                [0.00, 20, 0.2],
                [0.25, 20, 0.2],
                [0.50, 20, 0.0],
                [1.00, 20, -0.18],
                [100000, 20, -0.18],
                [0.00, 25, 0.3],
                [0.25, 25, 0.3],
                [0.50, 25, 0.2],
                [1.00, 25, 0.0],
                [100000, 25, 0.0],
                [0.00, 30, 0.3],
                [0.25, 30, 0.3],
                [0.50, 30, 0.2],
                [1.00, 30, 0.2],
                [100000, 30, 0.2],
                [0.00, 35, 0.4],
                [0.25, 35, 0.4],
                [0.50, 35, 0.3],
                [1.00, 35, 0.2],
                [100000, 35, 0.2],
                [0.00, 45, 0.4],
                [0.25, 45, 0.4],
                [0.50, 45, 0.4],
                [1.00, 45, 0.3],
                [100000, 45, 0.3],
                [0.00, 60, 0.01*slope],
                [0.25, 60, 0.01*slope],
                [0.50, 60, 0.01*slope],
                [1.00, 60, 0.01*slope],
                [100000, 60, 0.01*slope],
                [0.00, 100000, 0.01*slope],
                [0.25, 100000, 0.01*slope],
                [0.50, 100000, 0.01*slope],
                [1.00, 100000, 0.01*slope],
                [100000, 100000, 0.01*slope]
            ])
        return SlopeGreater10ArrayMax

    def Roof_Cp_Leeward_tab(self):

        RoofCpLeeward = array([
            [0.00, 10, -0.3],
            [0.25, 10, -0.3],
            [0.50, 10, -0.5],
            [1.00, 10, -0.7],
            [100000, 10, -0.7],
            [0.00, 15, -0.5],
            [0.25, 15, -0.5],
            [0.50, 15, -0.5],
            [1.00, 15, -0.6],
            [100000, 15, -0.6],
            [0.00, 20, -0.6],
            [0.25, 20, -0.6],
            [0.50, 20, -0.6],
            [1.00, 20, -0.6],
            [100000, 10, -0.6],
            [0.00, 100000, -0.6],
            [0.25, 100000, -0.6],
            [0.50, 100000, -0.6],
            [1.00, 100000, -0.6],
            [100000, 100000, -0.6]
        ])
        return RoofCpLeeward

    def K1_tab(self,exposureCategory):

        K1HLh = {
            'B':{
                '2D Ridge': 1.30,
                '2D Escarpment': 0.75,
                '3D Axisymmetric Hill': 0.95
            },
            'C':{
                '2D Ridge': 1.45,
                '2D Escarpment': 0.85,
                '3D Axisymmetric Hill': 1.05
            },
            'D':{
                '2D Ridge': 1.55,
                '2D Escarpment': 0.95,
                '3D Axisymmetric Hill': 1.15
            }
        }
        return K1HLh[exposureCategory]

    def topo_factors(self):

        topo_factors = {
            '2D Ridge':{
                'gamma': 3,
                'mu': 1.5
            },
            '2D Escarpment':{
                'gamma': 2.5,
                'mu': 4
            },
            '3D Axisymmetric Hill':{
                'gamma': 4,
                'mu': 1.5
            }
        }
        return topo_factors

class componentsAndCladding:

    def __init__(self, qz, qh, enclosureType, bldg_ht, roofType, slope, area):
        self.qz = qz
        self.qh = qh
        self.GCpPos = 0.8
        self.GCpNeg = -1.5
        GCpiData = {"Partially Enclosed":0.55 , "Enclosed": 0.18}
        self.GCpi = GCpiData[enclosureType]
        self.h = bldg_ht
        self.roof = roofType
        self.slope = slope
        self.area = area
        
    def calcCandCPressures(self):
        CandC_GCp_Data = self.calcGCp(self.roof, self.slope, self.area)
        self.CandC_Data = CandC_GCp_Data
        self.CandC_Data['GCpi'] = self.GCpi

        CandC_Pressures_positive = []
        CandC_Pressures_negative= []
        for i in range(len(CandC_GCp_Data['zones'])):
            if  self.h < 60:
                pressure_pos = self.qh*(CandC_GCp_Data['GCp_positive'][i] - self.GCpi)
                pressure_neg = self.qh*(CandC_GCp_Data['GCp_negative'][i] - self.GCpi)                    
            elif self.h >= 60:
                pressure_pos = self.qz*(CandC_GCp_Data['GCp_positive'][i] - self.GCpi)
                pressure_neg = self.qh*(CandC_GCp_Data['GCp_negative'][i] - self.GCpi)
            CandC_Pressures_positive.append(pressure_pos.tolist())
            CandC_Pressures_negative.append(pressure_neg.tolist())
        self.CandC_Data['positive_pressures'] = CandC_Pressures_positive
        self.CandC_Data['negative_pressures'] = CandC_Pressures_negative

    def calcGCp(self, roof, slope, area):
        CandCGCpLowrise = {
            'Walls': {
                'allAngles':[
                    {  'name': 'Zone 4',
                        'negative':{
                            'GCp1': -1.1,
                            'GCp2': -0.8,
                            'A1':10,
                            'A2':500,
                            'a': 16962801,
                            'b': 6.52
                        },
                        'positive':{
                            'GCp1': 1,
                            'GCp2': 0.7,
                            'A1':10,
                            'A2':500,
                            'a': 4604229,
                            'b': -13.04
                        }
                    },
                    {  'name': 'Zone 5',
                        'negative':{
                            'GCp1': -1.4,
                            'GCp2': -0.8,
                            'A1':10,
                            'A2':500,
                            'a': 92085,
                            'b': 13.04
                        },
                        'positive':{
                            'GCp1': 1,
                            'GCp2': 0.7,
                            'A1':10,
                            'A2':500,
                            'a': 4604229,
                            'b': -13.04
                        }
                    }
                ]   
            },
            'Flat': {
                'allAngles':[
                    {  'name': 'Zone 1',
                        'negative':{
                            'GCp1': -1.0,
                            'GCp2': -0.9,
                            'A1':10,
                            'A2':100,
                            'a': 99831201460,
                            'b': 23.02
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 9996,
                            'b': -23.02
                        }
                    },
                    {  'name': 'Zone 2',
                        'negative':{
                            'GCp1': -1.8,
                            'GCp2': -1.1,
                            'A1':10,
                            'A2':100,
                            'a': 3730,
                            'b': 3.29
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 9996,
                            'b': -23.02
                        }
                    },
                    {  'name': 'Zone 3',
                        'negative':{
                            'GCp1': -2.8,
                            'GCp2': -1.1,
                            'A1':10,
                            'A2':100,
                            'a': 444,
                            'b': 1.35
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 9996,
                            'b': -23.02
                        }
                    }
                ]
            },
            'Hip/Gable': {
                '0to7':[
                    {  'name': 'Zone 1',
                        'negative':{
                            'GCp1': -1.0,
                            'GCp2': -0.9,
                            'A1':10,
                            'A2':100,
                            'a': 99831201460,
                            'b': 23.02
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 9996,
                            'b': -23.02
                        }
                    },
                    {  'name': 'Zone 2',
                        'negative':{
                            'GCp1': -1.8,
                            'GCp2': -1.1,
                            'A1':10,
                            'A2':100,
                            'a': 3730,
                            'b': 3.29
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 9996,
                            'b': -23.02
                        }
                    },
                    {  'name': 'Zone 3',
                        'negative':{
                            'GCp1': -2.8,
                            'GCp2': -1.1,
                            'A1':10,
                            'A2':100,
                            'a': 444,
                            'b': 1.35
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 9996,
                            'b': -23.02
                        }
                    }
                ],
                '7to27':[
                    {  'name': 'Zone 1',
                        'negative':{
                            'GCp1': -0.9,
                            'GCp2': -0.8,
                            'A1':10,
                            'A2':100,
                            'a': 10024673532,
                            'b': 23.03
                        },
                        'positive':{
                            'GCp1': 0.5,
                            'GCp2': 0.3,
                            'A1':10,
                            'A2':100,
                            'a': 3162,
                            'b': -11.51
                        }
                    },
                    {  'name': 'Zone 2',
                        'negative':{
                            'GCp1': -1.5,
                            'GCp2': -1.2,
                            'A1':10,
                            'A2':100,
                            'a': 998309,
                            'b': 7.67
                        },
                        'positive':{
                            'GCp1': 0.5,
                            'GCp2': 0.3,
                            'A1':10,
                            'A2':100,
                            'a': 3162,
                            'b': -11.51
                        }
                    },
                    {  'name': 'Zone 3',
                        'negative':{
                            'GCp1': -2.6,
                            'GCp2': -2.0,
                            'A1':10,
                            'A2':100,
                            'a': 215223,
                            'b': 3.84
                        },
                        'positive':{
                            'GCp1': 0.5,
                            'GCp2': 0.3,
                            'A1':10,
                            'A2':100,
                            'a': 3162,
                            'b': -11.51
                        }
                    }
                ],
                '>27':[
                    {  'name': 'Zone 1',
                        'negative':{
                            'GCp1': -1,
                            'GCp2': -0.8,
                            'A1':10,
                            'A2':100,
                            'a': 1000194,
                            'b': 11.51
                        },
                        'positive':{
                            'GCp1': 0.9,
                            'GCp2': 0.8,
                            'A1':10,
                            'A2':100,
                            'a': 9997409053,
                            'b': -23.03
                        }
                    },
                    {  'name': 'Zone 2',
                        'negative':{
                            'GCp1': -1.2,
                            'GCp2': -1.0,
                            'A1':10,
                            'A2':100,
                            'a': 9990502,
                            'b': 11.51
                        },
                        'positive':{
                            'GCp1': 0.9,
                            'GCp2': 0.8,
                            'A1':10,
                            'A2':100,
                            'a': 9997409053,
                            'b': -23.03
                        }
                    },
                    {  'name': 'Zone 3',
                        'negative':{
                            'GCp1': -1.2,
                            'GCp2': -1.0,
                            'A1':10,
                            'A2':100,
                            'a': 9948700,
                            'b': 11.51
                        },
                        'positive':{
                            'GCp1': 0.9,
                            'GCp2': 0.8,
                            'A1':10,
                            'A2':100,
                            'a': 9997409053,
                            'b': -23.03
                        }
                    }
                ]
            },
            'Monoslope': {
                '0to3':[
                    {  'name': 'Zone 1',
                        'negative':{
                            'GCp1': -1.0,
                            'GCp2': -0.9,
                            'A1':10,
                            'A2':100,
                            'a': 99831201460,
                            'b': 23.02
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 9996,
                            'b': -23.02
                        }
                    },
                    {  'name': 'Zone 2',
                        'negative':{
                            'GCp1': -1.8,
                            'GCp2': -1.1,
                            'A1':10,
                            'A2':100,
                            'a': 3730,
                            'b': 3.29
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 9996,
                            'b': -23.02
                        }
                    },
                    {  'name': 'Zone 3',
                        'negative':{
                            'GCp1': -2.8,
                            'GCp2': -1.1,
                            'A1':10,
                            'A2':100,
                            'a': 444,
                            'b': 1.35
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 9996,
                            'b': -23.02
                        }
                    }
                ],
                '3to10':[
                    {  'name': 'Zone 1',
                        'negative':{
                            'GCp1': -1.1,
                            'GCp2': -1.1,
                            'A1':1000000000000,
                            'A2':10000000000000,
                            'a': '-',
                            'b': '-'
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 10000,
                            'b': -23.03
                        }
                    },
                    {  'name': 'Zone 2',
                        'negative':{
                            'GCp1': -1.3,
                            'GCp2': -1.2,
                            'A1':10,
                            'A2':100,
                            'a': 99673659434696.1,
                            'b': 23.02
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 10000,
                            'b': -23.03
                        }
                    },
                    {  'name': "Zone 2'",
                        'negative':{
                            'GCp1': -1.6,
                            'GCp2': -1.5,
                            'A1':10,
                            'A2':100,
                            'a': 99700124161117400,
                            'b': 23.02
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 10000,
                            'b': -23.03
                        }
                    },
                    {  'name': 'Zone 3',
                        'negative':{
                            'GCp1': -1.8,
                            'GCp2': -1.2,
                            'A1':10,
                            'A2':100,
                            'a': 10028,
                            'b': 3.84
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 10000,
                            'b': -23.03
                        }
                    },
                    {  'name': "Zone 3'",
                        'negative':{
                            'GCp1': -2.6,
                            'GCp2': -1.6,
                            'A1':10,
                            'A2':100,
                            'a': 3967,
                            'b': 2.30
                        },
                        'positive':{
                            'GCp1': 0.3,
                            'GCp2': 0.2,
                            'A1':10,
                            'A2':100,
                            'a': 10000,
                            'b': -23.03
                        }
                    }
                ],
                '>10':[
                    {  'name': 'Zone 1',
                        'negative':{
                            'GCp1': -1.3,
                            'GCp2': -1.1,
                            'A1':10,
                            'A2':100,
                            'a': 31596598,
                            'b': 11.51
                        },
                        'positive':{
                            'GCp1': 0.4,
                            'GCp2': 0.3,
                            'A1':10,
                            'A2':100,
                            'a': 99996,
                            'b': -23.03
                        }
                    },
                    {  'name': 'Zone 2',
                        'negative':{
                            'GCp1': -1.6,
                            'GCp2': -1.2,
                            'A1':10,
                            'A2':100,
                            'a': 100039,
                            'b': 5.76
                        },
                        'positive':{
                            'GCp1': 0.4,
                            'GCp2': 0.3,
                            'A1':10,
                            'A2':100,
                            'a': 99996,
                            'b': -23.03
                        }
                    },
                    {  'name': 'Zone 3',
                        'negative':{
                            'GCp1': -2.9,
                            'GCp2': -2.0,
                            'A1':10,
                            'A2':100,
                            'a': 16671,
                            'b': 2.56
                        },
                        'positive':{
                            'GCp1': 0.4,
                            'GCp2': 0.3,
                            'A1':10,
                            'A2':100,
                            'a': 99996,
                            'b': -23.03
                        }
                    }
                ]
            },
        }
        CandCGCpMidrise = {
            'Walls': {
                'allAngles':[
                    {  'name': 'Zone 4',
                        'negative':{
                            'GCp1': -0.9,
                            'GCp2': -0.7,
                            'A1':20,
                            'A2':500,
                            'a': 39020857,
                            'b': 16.09
                        },
                        'positive':{
                            'GCp1': 0.9,
                            'GCp2': 0.6,
                            'A1':20,
                            'A2':500,
                            'a': 312258,
                            'b': -10.73
                        }
                    },
                    {  'name': 'Zone 5',
                        'negative':{
                            'GCp1': -1.8,
                            'GCp2': -1,
                            'A1':20,
                            'A2':500,
                            'a': 27948,
                            'b': 4.02
                        },
                        'positive':{
                            'GCp1': 0.9,
                            'GCp2': 0.6,
                            'A1':20,
                            'A2':500,
                            'a': 312258,
                            'b': -10.73
                        }
                    }
                ]   
            },
            'Flat': {
                'allAngles':[
                    {  'name': 'Zone 1',
                        'negative':{
                            'GCp1': -1.4,
                            'GCp2': -0.9,
                            'A1':10,
                            'A2':500,
                            'a': 570389,
                            'b': 1.00
                        },
                        'positive':{
                            'GCp1': 0.9,
                            'GCp2': 0.6,
                            'A1':20,
                            'A2':500,
                            'a': 312258,
                            'b': -10.73
                        }
                    },
                    {  'name': 'Zone 2',
                        'negative':{
                            'GCp1': -2.3,
                            'GCp2': -1.6,
                            'A1':10,
                            'A2':500,
                            'a': 3819161,
                            'b': 5.59
                        },
                        'positive':{
                            'GCp1': 0.9,
                            'GCp2': 0.6,
                            'A1':20,
                            'A2':500,
                            'a': 312258,
                            'b': -10.73
                        }
                    },
                    {  'name': 'Zone 3',
                        'negative':{
                            'GCp1': -3.2,
                            'GCp2': -2.3,
                            'A1':10,
                            'A2':500,
                            'a': 11049318,
                            'b': 4.35
                        },
                        'positive':{
                            'GCp1': 0.9,
                            'GCp2': 0.6,
                            'A1':20,
                            'A2':500,
                            'a': 312258,
                            'b': -10.73
                        }
                    }
                ]
            }
        }

        zone_names = []
        GCp_positive_array = []
        GCp_negative_array = []

        if self.h <= 60:
            if self.roof == 'Flat':
                angleGroup = 'allAngles'
            elif self.roof == 'Monoslope':
                if self.slope < 3:
                    angleGroup = '0to3'
                elif self.slope < 10:
                    angleGroup = '3to10'
                else:
                    angleGroup = '>10'
            elif self.roof == 'Hip/Gable':
                if self.slope < 7:
                    angleGroup = '0to7'
                elif self.slope < 27:
                    angleGroup = '7to27'
                else:
                    angleGroup = '>27'
            GCp_properties = CandCGCpLowrise[self.roof][angleGroup]
            GCp_properties.append(CandCGCpLowrise['Walls']['allAngles'][0])
            GCp_properties.append(CandCGCpLowrise['Walls']['allAngles'][1])
        else:
            GCp_properties = CandCGCpMidrise['Flat']['allAngles']
            GCp_properties.append(CandCGCpMidrise['Walls']['allAngles'][0])
            GCp_properties.append(CandCGCpMidrise['Walls']['allAngles'][1])

        for zone in GCp_properties: #Calculate GCp for each zone type
            zone_names.append(zone['name'])
            #Calculate negative GCp
            if area <= zone['negative']['A1']: 
                GCp_neg = zone['negative']['GCp1']
            elif area >= zone['negative']['A2']:
                GCp_neg = zone['negative']['GCp2']
            else:
                GCp_neg = (1/zone['negative']['b'])*log(area/zone['negative']['a'])
            GCp_negative_array.append(GCp_neg)
            #Calculate positive GCp
            if area < zone['positive']['A1']:
                GCp_pos = zone['positive']['GCp1']
            elif area > zone['positive']['A2']:
                GCp_pos = zone['positive']['GCp2']
            else:
                GCp_pos = (1/zone['positive']['b'])*log(area/zone['positive']['a'])
            GCp_positive_array.append(GCp_pos)
        GCp_Data = {'zones': zone_names, 'GCp_positive': GCp_positive_array, 'GCp_negative': GCp_negative_array}
        return GCp_Data
        


class table(object):

    def __init__(self):
        self.table = []

    def interp_on_array(self, interp_array, x_array, col_x, col_y):

        l_y = len(interp_array[:,0])-1
        l_x = len(x_array)

        y_array=[]
        for i in range(0,l_x):
            yi = 0
            xi = x_array[i]
            if xi <= interp_array[1,col_x]:
                yi = interp_array[0,col_y]
            elif xi>= interp_array[l_y,col_x]:
                yi= interp_array[l_y,col_y]
            elif xi>= interp_array[l_y-1,col_x] and xi<= interp_array[l_y,col_x]:
                y_0 = interp_array[l_y-1,col_y]
                y_1 = interp_array[l_y,col_y]
                x_0 = interp_array[l_y-1,col_x]
                x_1 = interp_array[l_y,col_x]
                yi= y_0+(y_1-y_0)*((xi-x_0)/(x_1-x_0))
            else:
                for j in range(0,l_y):
                    if xi>= interp_array[j,col_x] and xi<= interp_array[(j+1,col_x)]:
                        y_0 = interp_array[j, col_y]
                        y_1 = interp_array[j+1, col_y]
                        x_0 = interp_array[j, col_x]
                        x_1 = interp_array[j+1, col_x]
                        yi= y_0+(y_1-y_0)*((xi-x_0)/(x_1-x_0))
            y_array.append(yi)
        return y_array

    def interp_single_array(self, interp_array, x, col_x, col_y):

        l_y = len(interp_array[:,0])-1
        yi = 0
        xi = x
        if xi <= interp_array[1,col_x]:
            yi = interp_array[0,col_y]
        elif xi>= interp_array[l_y,col_x]:
            yi= interp_array[l_y,col_y]
        elif xi>= interp_array[l_y-1,col_x] and xi<= interp_array[l_y,col_x]:
            y_0 = interp_array[l_y-1,col_y]
            y_1 = interp_array[l_y,col_y]
            x_0 = interp_array[l_y-1,col_x]
            x_1 = interp_array[l_y,col_x]
            yi= y_0+(y_1-y_0)*((xi-x_0)/(x_1-x_0))
        else:
            for j in range(0,l_y):
                if xi>= interp_array[j,col_x] and xi<= interp_array[(j+1,col_x)]:
                    y_0 = interp_array[j, col_y]
                    y_1 = interp_array[j+1, col_y]
                    x_0 = interp_array[j, col_x]
                    x_1 = interp_array[j+1, col_x]
                    yi= y_0+(y_1-y_0)*((xi-x_0)/(x_1-x_0))
        return yi
