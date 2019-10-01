#!/usr/bin/env python
import os
import sys
from django_plant import inference
from django_plant.utils import globalvar
if __name__ == '__main__':
    model = inference.Inference()
    globalvar.init()
    globalvar.set_value('model', model)
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Server.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
