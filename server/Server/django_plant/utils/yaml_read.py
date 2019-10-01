import yaml

def parse():
    with open('./django_plant/config.yaml','rb') as file:
        config=yaml.load(file)
        return config
