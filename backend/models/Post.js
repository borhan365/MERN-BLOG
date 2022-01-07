const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema; 

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    }, 
    desc: {
      type: {},
      required: true,
    }, 
    excerpt: {
      type: {},
    }, 
    photo: {
      type: String,
    },
    username: {
      type: String,
      required: true
    },
    category:  [{
      type: String
  }],
  }, { timestamps: true }
)
// {
      //   type: ObjectId, 
      //   ref: "Category" 
      // }
module.exports = mongoose.model("Post", postSchema); 