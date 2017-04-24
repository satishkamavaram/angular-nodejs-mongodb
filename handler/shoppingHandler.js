var shoppingModel  = require('../models/shopping');
var util  = require('../util/util');

var addToShopping = function(req,res,next) {
   console.log(req.body);
   var token  =  util.getTokenFromQuery(req.query.token);
// Body - { shoppingList: [ { name: 'test', amount: 1 } ] }
   shoppingModel.update({'userId':token.user},
   {'$pushAll': {
    'shoppingList': req.body.shoppingList
  }},
   {upsert: true})
   .then((doc)=> {
     return res.status(201).json({
       msg : 'Shopping Item Successfully Added',
     });
   })
   .catch((err)=> {
     return res.status(500).json({
       title : 'Error adding to Shopping',
       err : err
     });
   })

  /* shopping.save()
   .then((doc)=> {
     return res.status(201).json({
       msg : 'Shopping Item Successfully Added',
     });
   })
   .catch((err)=> {
     return res.status(500).json({
       title : 'Error adding to Shopping',
       err : err
     });
   })*/
}

var getShoppingList = function(req,res,next) {
   console.log(req.body);
   var token  =  util.getTokenFromQuery(req.query.token);
//query builder

//Response - { shoppingList:
//   [ { amount: '10', name: 'book1' },
//     { amount: '20', name: 'book2' },
//     { amount: '30', name: 'book3' } ] }
   shoppingModel.findOne({'userId':token.user})
   .select('shoppingList -_id')
   .exec()
   .then((doc)=> {
     console.log(doc);
     return res.status(200).json(doc);
   })
   .catch((err)=> {
     console.log(err);
     return res.status(500).json({
       title : 'Error retrieving Shopping List',
       err : err
     });
   })
}

module.exports =  {
  addItemToShopping : addToShopping,
  getShoppingList : getShoppingList
}
