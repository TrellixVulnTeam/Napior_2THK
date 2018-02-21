# Napior Container

This repository contains the front-end application and back-end API. The app and API run inside of a docker container. The docker container can be built to run in either development or in production utilizing the CLI's ng serve and ng build commands, respectively.

## In Development (ng serve)

When running the container in development, your can take advantage of the Angular CLI's hot reloading. To run the app in development (i.e. using ng serve), run the following commands:

    npm install
    docker-compose build --build-arg ng_arg=dev napior
    docker-compose up
    
The statement `--build-arg ng_arg=dev napior` configures the container to execute the ng serve command. 

## In Production (ng build)

When running the container in development, you can take advantage of the Angular CLI's Ahead of Time Compilation. To run the app in production (i.e. using ng build --aot), run the following commands:

    npm install
    docker-compose build
    docker-compose up
    
If no build argument is provided, the container will default to production. If you would like, you can set the build argument `--build-arg ng_arg=prod napior`.

