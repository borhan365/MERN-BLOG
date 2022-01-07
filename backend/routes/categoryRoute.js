
const router = require("express").Router();
const Category = require("../models/Category")

// ADD CATEGORY
router.post("/", async (req, res) => {
  try {
    const category = await new Category(req.body)
    const newCategory = await category.save()
    res.status(200).json(newCategory)
  } catch(err) {
    res.status(500).json(err)
  }
})

// EDIT CATEGORY
router.put("/:id", async (req, res) => {
  if(req.body.userId === req.params.id) {
    try {
      const updateCategory = await Category.findByIdAndUpdate(req.params.id, 
        {$set: req.body}, {new: true}
      )
      res.status(200).json(updateCategory)
    } catch(err) {
      res.status(500).json(err)
    }
  }
})

// DELETE CATEGORY 
router.delete("/:id", async (req, res) => {
  try {
    const categroy = await Category.findById(req.params.id)
    categroy.delete()
    res.status(200).json("Category Deleted Successfully")
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET SINGLE CATEGORY
router.get("/:id", async (req, res) =>{
  try {
    const categroy = await Category.findById(req.params.id)
    res.status(200).json(categroy)
  } catch (err) {
    res.status(500).json(err)
  }
})

// FEATCH ALL CATEGROY
router.get("/", async(req, res) => {
  try {
    const categories = await Category.find(); 
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;