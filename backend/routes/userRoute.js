const router = require("express").Router();
const bcrypt = require("bcrypt")
const User = require("../models/User")

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

// DELETE USER 
router.delete("/:id", async (req, res) => {
  if(req.body.userId === req.params.id) {
      try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted Successfully!")

    } catch(err) {
      res.status(404).json("User not found!")
    }
  } else {
    res.status(401).json("You can't delete others accout")
  }
})

// GET SINGLE USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const {password, ...withoutPassword} = user._doc;
    res.status(200).json(withoutPassword)
  } catch (error) {
    res.status(500).json(error)
  }
})

// ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router; 