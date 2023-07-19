const router = require('express').Router();
const { json } = require('../../config/connection');
const { Tag, Product, ProductTag } = require('../../models');
const { on } = require('nodemon')

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes:[
      "id",
      "tag_name"
    ],  
    // be sure to include its associated Product data
    include:[{
      model: Product,
      attributes:[
        "id",
        "product_name",
        "price",
        "stock",
        "category_id"
      ],
    }]
  })
  .then(AllTag => json(AllTag))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Product.findOne({
    where:{id: req.params.id},
    attributes:[
      "id",
      "tag_name"
    ],
    // be sure to include its associated Product data
    include:[{
      model: Product,
      attributes:[
        "id",
        "product_name",
        "price",
        "stock",
        "category_id"
      ],
    }]
  })
  .then(OneTag =>{
    if (!OneTag){
      res.status(404).json(err);
      return;
    }
    res.json(OneTag);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(NewTag => res.json(NewTag))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    where:{
      id: req.params.id
    },
  })
  .then(DeletedTag =>{
    if(!DeletedTag[0]){
      res.status(404).json(err);
      return;
    }
    res.json(DeletedTag)
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
    },
  })
  .then(DeletedTag =>{
    if(!DeletedTag){
      res.status(404).json(err);
      return;
    }
    res.json(DeletedTag)
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
