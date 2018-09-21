# scheduler-web

## Demo Appointment Scheduler Web App

Instructions are for Linux/Mac/Windows. Should work cross platform.

### Setting up a build environment

#### Windows

If you are on Windows, do this first to install python, msbuild, etc:

```
npm i -g windows-build-tools
```

#### Non-Windows

Be sure you have a cpp compiler and python installed.


#### Everyone (including Windows)

Be sure you're in the top directory of this project and do a:

```
npm ci 
```


### Development

Easiest thing to do while development is run this in its own terminal window:

```
npm run dev
```

this will build and tell you if there are errors. It will then continue to watch for any changes in anything that gets built,
and rebuild automatically. You will have to reload the website after a build.


### Production Build

From a terminal window/console run the below command.

```
npm run build
```

Note: 2018-09-06, This package uses Parcel to bundle produciton code.  Since version 1.9x there is a bug on widows building packages with typescript and will be resolved in version 2.x.  

### Viewing the website
After building the production code you can test the site by hosting off of hosting service such as apaache, nginx, iis.  For testing purposes you can run the below command and navigate to [http://localhost:3000/](http://localhost:3000/)

```
npm run server
```

Will start a SPA express server and listen on port 3000.

### Deployment

When deploying to production, this is served as a static site.

### API Server

Checkout the scheduler-api project, and build/start/dev. See documentation there.
