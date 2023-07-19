const router = require('express').Router();
const { Category, Product } = require('../../models');
const {findOne} = require('../../models/Product')

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes:[
      "id",
      "category_name",
    ],
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
  // be sure to include its associated Products
  .then(AllCategory => res.json(AllCategory))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where:{id: req.params.id},
    attributes:[
      "id",
      "category_name",
    ],
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
  // be sure to include its associated Products
  .then(OneCategory =>{
    if (!OneCategory){
      res.status(404).json(err);
      return;
    }
    res.json(OneCategory);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({category_name: req.body.category_name})
  .then(NewCategory => res.json(NewCategory))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where:{id: req.params.id}
  })
  .then(DeletedCategory =>{
    if (!DeletedCategory){
      res.status(404).json(err);
      return;
    }
    res.json(DeletedCategory);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{id: req.params.id}
  })
  .then(DeletedCategory =>{
    if (!DeletedCategory){
      res.status(404).json(err);
      return;
    }
    res.json(DeletedCategory);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
