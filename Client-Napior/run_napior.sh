#!/bin/bash
trap 'kill %1' SIGINT
ng serve --host 0.0.0.0 --port 8080 --aot & cd ../Server-Napior && python3 manage.py runserver 0.0.0.0:8081