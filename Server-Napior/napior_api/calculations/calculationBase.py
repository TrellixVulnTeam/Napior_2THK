class Calculation(object):

    def get_input(self, name):
        return self.inputs[name]

    def set_output(self, name, output):
        self.outputs[name] = output