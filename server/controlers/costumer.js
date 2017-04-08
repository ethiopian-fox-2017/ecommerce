let Costumer = require('../models/costumer');
var jwt = require('jsonwebtoken');
module.exports={
  create:function(req,res){
    Costumer.create({
      "username":req.body.username,
      "facebookid":req.body.facebookid,
      "gender":req.body.gender,
      "email": req.body.email
    },
      function(err,succ){
        if (err) {
          res.send(err);
        } else {
          res.send('insert data succes');
        }
      })
  },

  views:function(req,res){
    Costumer.find({

    },function(err,data){
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }

    })
  },

  update:function(req,res){
    console.log(masuk);
    Costumer.findOne({
      facebookid:req.params.id
    },function(err,data){
      if (err) {
        res.send(err)
      } else {
        data.username=req.body.username||data.username;
        data.facebookid=req.body.facebookid||data.facebookid;
        data.gender=req.body.gender||data.gender;
        data.email=req.body.email||data.email;
        data.save(function (err, data) {
             if (err) {
                 res.status(500).send(err)
             }
             res.send('update success');
         });
      }
    })
  },

  delete:function(req,res){
    Costumer.findOneAndRemove({
      facebookid: req.params.id
    },
      function(err,data){
        if (err) {
          res.send(err);
        } else {
          res.send('data deleted');
        }
    })

  },
  login:function(req,res){
    Costumer.findOne({
      facebookid:req.body.facebookid
    },function(err,data){
      if (err) {
        console.log(err)
      } else {
        if (data) {
          let token=jwt.sign({
                    data: data
                    }, 'secret', { expiresIn: 60 * 60 });
          res.send(token);
        } else {
          Costumer.create({
            "username":req.body.username,
            "facebookid":req.body.facebookid,
            "gender":req.body.gender,
            "email": req.body.email
          },function(err,data){
            if (err) {
              console.log(err)
            } else {
              let token=jwt.sign({
                        data: data
                        }, 'secret', { expiresIn: 60 * 60 });
              res.send(token);
            }
          })
        }
      }
    })
  }



}
