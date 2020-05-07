# Museum Wiki Frontend

This project was written by Peter Li. It is the frontend of the Museum Wiki project for CS205 Spring 2020. 

## Setup

First, clone this project using `git clone`. 

Node.js is required for this project. Please install the latest stable version of node.js and then run `npm install` in the project root directory to install all dependencies. Because they amount to over 700MB, this process may take a while. 

After the installation of all dependencies are complete. The program will be able to run. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. Because the frontend relies on a server for data, there should be some error messages about the internet connection. To see the full picture of the project, please run the backend instead. 

## Build

Run `ng build prod=true` to build the project in production mode. The build artifacts will be stored in `../frontend`, which is in the folder Lafayette53 in the parent project. 

## Electron

Run `npm run electron` to run the frontend with electron. Note that this will execute the last frontend build stored in `electron/dist`, so it does not reflect the current progress of the project. 

To see how the *current* project looks like in electron, run `npm run electron-build` to build the project into `electron/dist` and then run the program with electron. 

To distribute the frontend app using electron, navigate to `museum-wiki-frontend/electron` and run `npm install`. Then, run `electron-packager .`. This will package the build in `electron/dist` into an electron app that run on the operating system of the host computer. For more information, please read about the documentation of electron-packager. 

## Documentation

To generate the documentation for this project, simply run `npm run compodoc`, and a new folder called documentation will appear. Open `documentation/index.html` to see the documentation. 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
