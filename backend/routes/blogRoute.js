const router = require("express").Router(); 
const Post = require("../models/Post")

// POST NEW BLOG
router.post("/", async (req, res) => {
  try {
    const newBlog = new Post(req.body);  
    const blog = await newBlog.save(); 
    res.status(200).json(blog); 
  } catch (err) {
    res.status(500).json(err);
  }
})

// EDIT BLOG POST
router.put("/:id", async(req, res) => {
  try {

    const post = await Post.findById(req.params.id)
    if(post.username === req.body.username) {
      const updatePost = await Post.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {new: true})
      res.status(200).json(updatePost)
    }  else {
      res.status(401).json("You can update only your post!");
    }

  } catch (error) {
    res.status(500).json(error)
  }
})

// GET SINGLE BLOG ARTICLE
router.get("/:id", async (req, res) => {
  try {
    const single = await Post.findById(req.params.id)
    res.status(200).json(single)
  } catch(err) {
    res.status(500).json(err)
  }
})
//get post by category ID
router.get("/postbycatid/:catid", async (req, res) => {
  try {
    const posts = await Post.find()
    // console.log(posts)
    const requiredPosts = posts.filter(p => p.category.includes(req.params.catid))
    console.log(requiredPosts)
    res.status(200).json(requiredPosts)
  } catch(err) {
    res.status(500).json(err)
  }
})
// DELETE BLOG ARTICLE
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Post.findById(req.params.id)
    blog.delete()
    res.status(200).json("Article Deleted Successfully!")
  } catch(err) {
    res.status(500).json(err)
  }
})

// FETCH ALL BLOG POST
router.get("/", async (req, res) => {
  const username = req.query.username; 
  const category = req.query.category;
  try{
    let posts; 
    if(username) {
      posts = await Post.find({ username })
    } else if(category) {
      posts = await Post.find({ 
        categories: {
          $in: category
        }
      })
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts); 
  } catch(err) {
    res.status(500).json(err);
  }
})


module.exports = router; 