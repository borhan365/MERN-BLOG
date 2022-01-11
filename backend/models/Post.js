const mongoose = require("mongoose")

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
    categories: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
      },
  }, { timestamps: true }
)
module.exports = mongoose.model("Post", postSchema); 