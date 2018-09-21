const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//Connection URL
const url = 'mongodb://localhost:27017';

//Database Name
const dbName = 'parcial1';



//Get visualizations
router.get('/visualizations', (req, res, next) => {
  MongoClient.connect(url, function(error, client) {
    assert.equal(null, error);
    console.log('Connected!');

    const db = client.db(dbName);
    let collection = db.collection('visualizations');

    collection.find().limit(20).toArray((err, result) => {
      assert.equal(null, err);
      console.log(result);
      res.status(200).send(result);
      client.close();
    });
  }); 
});

//Post visualization
router.post('/visualizations', (req, res, next) => {
  MongoClient.connect(url, function(error, client) {
    assert.equal(null, error);
    console.log('Connected!');

    const db = client.db(dbName);
    let collection = db.collection('visualizations');
    let jsonVegaString = JSON.stringify(req.body.jsonVega);

    collection.insertOne({
      nameAuthor: req.body.nameAuthor,
      visTitle: req.body.visTitle,
      jsonVega: jsonVegaString,
      data: req.body.data,
      timestamp: req.body.timestamp
    }, 
    (err, result) => {
      assert.equal(null, err);
      res.status(201).json({
        message: 'Visualization saved succesfully',
      });

      client.close();
    });


  });

});



module.exports = router;
