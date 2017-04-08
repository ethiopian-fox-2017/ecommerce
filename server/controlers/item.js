let Item = require('../models/item');
module.exports={
  create:function(req,res){
    Item.create({
      "item_id":req.body.item_id,
      "picture_url":req.body.picture_url,
      "name":req.body.name,
      "desc": req.body.desc,
      "stock":req.body.stock
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
    Item.find({

    },function(err,data){
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }

    })
  },

  update:function(req,res){
    Item.findOne({
      facebookid:req.params.id
    },function(err,data){
      if (err) {
        res.send(err)
      } else {
        data.item_id=req.body.item_id||data.item_id;
        data.picture_url=req.body.picture_url||data.picture_url;
        data.name=req.body.name||data.name;
        data.desc=req.body.desc||data.desc;
        data.stock=req.body.stock||data.stock;
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
    Item.findOneAndRemove({
      _id: req.params.id
    },
      function(err,data){
        if (err) {
          res.send(err);
        } else {
          res.send('data deleted');
        }
    })

  }
}
