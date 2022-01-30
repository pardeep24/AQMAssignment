
## How to run the project

- Run `git clone https://github.com/pardeep24/AQMAssignment.git`


### Running frontend code

- Go to main project folder `cd AQMAssignment`
- Run `npm install` to install all required project dependencies
- Run `npm start` to the project in dev mode
- Open the `https://localhost:3000` to run the project 

## Environments and Deployments

| Environment | Base URL | Description  | Deployment |
| :-------:   | :------: | :----------: | :--------: |
| Development | [http://localhost:3000/](http://localhost:3000) | When running locally on your machine  | When PR is Raise Netlify will create a preview URL on related environement on based on master branch  |
| Production | [https://tender-kare-4b2fb6.netlify.app/](https://tender-kare-4b2fb6.netlify.app/) | An environment corresponding to `master` branch of this repo  |  Any changes on `master` will auto deploy on Netlify |


## Tech Stack

- React JS

## Packages Used

- npm i moment
- npm i @nivo/bar
- npm i @nivo/core
- npm i @nivo/line


## Features

- AQI data from Websocket represent in Table format 
- For graphically data represented in Bar Chart 
- Ability to select multiple cities and compare their live data using Line Chart
