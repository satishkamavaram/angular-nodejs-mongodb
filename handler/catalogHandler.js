var catalogModel  = require('../models/catalog');
var util  = require('../util/util');


var addCatalog = function(req,res,next) {
   console.log(req.body);
   var token  =  util.getTokenFromQuery(req.query.token);
// Body - { name: 'testCatalog1',
//  desc: 'tesddes',
//  imagePath: 'https://firebearstudio.com/blog/wp-content/uploads/2016/01/Best-Node.JS-Books-1024x551.jpg',
//  shoppingItems: [ { name: 'dsf1', amount: 1 } ] }

  var newCatalog  = new catalogModel({
    'name':req.body.name,
    'desc' : req.body.desc,
    'imagePath' :req.body.imagePath,
    'shoppingItems' : req.body.shoppingItems,
    'createdBy' : token.user
  });

   newCatalog.save()
   .then((doc)=> {
     console.log(doc);
     return res.status(201).json({
       msg : 'Catalog Successfully Added',
       id : doc._id
     });
   })
   .catch((err)=> {
     return res.status(500).json({
       title : 'Error adding to Catalog',
       err : err
     });
   })


}

var updateCatalog = function(req,res,next) {
   console.log(req.body);
   var token  =  util.getTokenFromQuery(req.query.token);
//query builder

//Response - { shoppingList:
//   [ { amount: '10', name: 'book1' },
//     { amount: '20', name: 'book2' },
//     { amount: '30', name: 'book3' } ] }
    catalogModel.update({'_id':req.body.id},
    {'$set': {
      'name':req.body.name,
      'desc' : req.body.desc,
      'imagePath' :req.body.imagePath,
      'shoppingItems' : req.body.shoppingItems,
      'updatedBy' : token.user,
      'updatedDate' : Date.now()
    }})
    .then((doc)=> {
      console.log(doc);
      return res.status(201).json({
        msg : 'Catalog Successfully Edited',
      });
    })
    .catch((err)=> {
      return res.status(500).json({
        title : 'Error editing to Catalog',
        err : err
      });
    })
}

var deleteCatalog = function(req,res,next) {
   console.log(req.body);
   console.log(req.params.id );
   var token  =  util.getTokenFromQuery(req.query.token);

   catalogModel.remove({ _id: req.params.id })
   .then((doc)=> {
     console.log(doc);
     return res.status(200).json({
       msg : 'Catalog Successfully Deleted',
     });
   })
   .catch((err)=> {
     console.log(err);
     return res.status(500).json({
       title : 'Error deleting Catalog',
       err : err
     });
   })
}

var getCatalogList = function(req,res,next) {
   console.log(req.body);
   var token  =  util.getTokenFromQuery(req.query.token);
//query builder

//Response - [ { _id: 58ff825091871f04b92173a7,
//    name: 'testCatalog',
//    desc: 'testCatalogDesc',
//    imagePath: 'https://firebearstudio.com/blog/wp-content/uploads/2016/01/Best-Node.JS-Books-1024x551.jpg',
//    shoppingItems: [ [Object], [Object] ] }]
   catalogModel.find({})
   .select('name desc imagePath shoppingItems')
   .exec()
   .then((doc)=> {
     console.log(doc);
     return res.status(200).json(doc);
   })
   .catch((err)=> {
     console.log(err);
     return res.status(500).json({
       title : 'Error retrieving Catalog List',
       err : err
     });
   })
}

module.exports =  {
  addCatalog : addCatalog,
  updateCatalog : updateCatalog,
  getCatalogList : getCatalogList,
  deleteCatalog : deleteCatalog
}
