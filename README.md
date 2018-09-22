# WebDevExam1 - Vega Lite Editor!

The objective of this project is to create a minimalistic Vega-Lite editor in which a user can create his own
visualizations by writing their json specs in the editor and uploading data with a .csv file. Aditionally, the
users can store their visualizations and leave ratings to other visualizations they like.

### Creative Component
As an addition to the exam, my creative component is that I added a search bar where the users can search authors of visualizations. The users can type the name of an author and they will get the list of their visualizations that are stored in the database and some statistics regarding the ratings of their visualizations.

### Specs and Data Examples
Inside the folder /data of this project, you can find some examples of correct json specs for the Vega-Lite editor and some .csv files that you can try.


### Getting started

To get a copy of these repository install git bash, open it from the command line and use $ git clone: https://github.com/Andres710/WebDevExam1.git

Then, open the root directory and run

```
$ npm install
```

Once it finishes, open the frontend folder and run npm install again.

To deploy the application return to the root directory and run 

```
$ npm start
```

### Prerequisites

Firstly, you need to install nodeJS, the installer can be downloaded from: https://nodejs.org/es/ Be sure to select the install npm option and the addToPATH option during the installation process.

Secondly, install mongoDB in your local environment. Follow the instructions on the link below to get it:

https://docs.mongodb.com/manual/administration/install-community/

It's recommended to have yarn installed, because it makes the use of the React front-end easier. To install it use:

```
$ npm install -g yarn
```

#### Checklist

```
NodeJS
MongoDB
Yarn
```

### Installing

Go to the root directory and run the npm install command.
```
$ npm install
```
Then, you can run the back-end using the npm start command.
```
$ npm start
```
Go to the frontend directory and run the yarn install command.
```
$ cd front
$ yarn install
```
Then, you can run the fron-end using the yarn start command.
```
$ yarn start
```

Front-end should be running in localhost:3000, while the server should be running in localhost:3001

### Built With

* React - The javascript library used to develop the front-end.
* NPM - Dependency Management
* Express - The web framework used.
* MongoDB - The databased used.

### Author

* Andrés Felipe López - <a href="https://github.com/Andres710">Andres710</a>

### License
This project is licensed under the MIT License - see the LICENSE.md file for details