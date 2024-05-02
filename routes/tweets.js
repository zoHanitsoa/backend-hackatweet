var express = require('express');
var router = express.Router();
require('../models/connection');

const Tweet = require('../models/tweets');

// const fetch = require('node-fetch');



router.post('/newTweet', (req, res) => {

   console.log('new tweet en cours d enregistrement')

    const newTweet = new Tweet({
        content: req.body.tweetContent,
        date : new Date(),
        nbLike : 0,
        user : 'manu',
    });

    newTweet.save()
    res.json({ result: true , content : newTweet});
     
      
   
});

module.exports = router;