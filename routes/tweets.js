var express = require('express');
var router = express.Router();
require('../models/connection');

const Tweet = require('../models/tweets');
const User = require('../models/users');

// const fetch = require('node-fetch');

router.get('/', (req,res) => {

  Tweet.find().sort({date : -1})
  .populate('user')
  .then(data => {
		res.json({ allTweets: data });
	});


})

router.post('/newTweet', async (req, res) => {

   console.log('new tweet en cours d enregistrement')

   const token = req.body.token
   const userData = await User.findOne({token : token})
  //  console.log(userData._id)

   

    const newTweet = new Tweet({
        content: req.body.tweetContent,
        date : new Date(),
        nbLike : 0,
        user : userData._id,
    });

    newTweet.save()
    res.json({ result: true , content : newTweet});
     
});


router.put('/like/:tweetId', (req, res) => {
const tweetId = req.params.tweetId;
console.log('plus un')
  // Tweet.findOneAndUpdate({_id: tweetId})
  if (tweetId.match(/^[0-9a-fA-F]{24}$/)) {
    Tweet.findOneAndUpdate({_id : tweetId} ,  { 
      $inc: { nbLike: 1 } 
   }, {new: true })
    .then(data => {
      console.log(data)
      res.json({result : true , tweet : data})

    })
  }
})

router.put('/dislike/:tweetId', (req, res) => {
  const tweetId = req.params.tweetId;
  console.log('plus un')
    // Tweet.findOneAndUpdate({_id: tweetId})
    if (tweetId.match(/^[0-9a-fA-F]{24}$/)) {
      Tweet.findOneAndUpdate({_id : tweetId} ,  { 
        $inc: { nbLike: -1 } 
     }, {new: true })
      .then(data => {
        console.log(data)
        res.json({result : true , tweet : data})
  
      })
    }
  })



    
  router.delete('/delete/:tweetId' , (req,res) => {

    const tweetId = req.params.tweetId;
    if (tweetId.match(/^[0-9a-fA-F]{24}$/)) {
      Tweet.deleteOne({_id : tweetId})
      .then(data => {
        console.log(data)
        if (data.deletedCount > 0) {
          res.json({result : true , content : data})
        } else {
          res.json({result : false , error : "Tweet doesn't exist. Impossible to delete"} )
        }
        
      })
    } else {
      res.json({result : false , error : 'Wrong ID. Impossible to delete'} )
    }
    
  })


   


module.exports = router;