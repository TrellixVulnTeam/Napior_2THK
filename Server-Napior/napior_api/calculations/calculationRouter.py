from napior_api.calculations.modules.seismic.Seismic_Loads import Seismic_Loads
from napior_api.calculations.modules.wind.Wind_Loads import Wind_Loads
from napior_api.calculations.modules.snow.Snow_Loads import Snow_Loads


class routeCalculation():

    def runCalculaton(self, inputs):
        
        calculationIndex = {
            'seismicLoads': Seismic_Loads(),
            'windLoads': Wind_Loads(),
            'snowLoads': Snow_Loads()
        }
        
        calc = calculationIndex[inputs['type']]
        calc.inputs = inputs
        calc.main()
        calcOutputs = calc.outputs
        #print(calcOutputs)

        return calcOutputs