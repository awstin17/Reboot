# Reboot

Reboot is an ionic application that assists verterans reintegrate into civilian life by assisting them and providing information and resources along the way. 

## Getting Started

Reboot is an ionic project using typescript. The backend API uses MongoDB as a data source for a loopback api server. The corresponding backend server can be found at: 

```
https://github.com/awstin17/reboot-backend
```

### Prerequisites

To begin make sure node and npm are installed. Please make sure latest Node 6 LTS and NPM 3+ are installed. In addition, make sure that you have [Ionic CLI](https://ionicframework.com/docs/cli/) installed locally. This project was uses Ionic 3.x. 

```
npm install -g ionic
```

### Installing

Clone the remote repository

```
git clone https://github.com/awstin17/Reboot-frontend.git
```

From within the `reboot-frontend` directory, run `npm install` to install all dependencies.

```
npm install
```

Once that completes, use `ionic serve` to get a local copy running

```
ionic serve
```

This should deploy the an instance of the app running locally at:

```
http://localhost:3000/
```


### Branches

The most important two branches on this repository right now are:

`master` - This branch is a snapshot of what the main repository for [Reboot](https://github.com/SoftStackFactory/reboot) looked like when I left the project around the beginning of November, 2018.

`reboot-demo-firebase` - These are the tweaks I did to master to make it more polished for the demo that you can access [here](https://reboot-demo-2.firebaseapp.com/).

## Built With

* [Ionic](https://ionicframework.com/)
* [Angular](https://angular.io/)
* [MongoDB](https://www.mongodb.com/)
* [Loopback](http://loopback.io/)
* [ChartJs](http://www.chartjs.org/)
