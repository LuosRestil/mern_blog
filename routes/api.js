const express = require("express");
const BlogPost = require("../models/blogPost");

const router = express.Router();

router.get("/", (req, res) => {
  // BlogPost.find({})
  //   .sort({ date: "descending" })
  //   .then(data => {
  //     console.log(data);
  //     return res.json(data);
  //   })
  //   .catch(err => {
  //     return res.json({ msg: err });
  //   });

  // alternative method...
  BlogPost.find({})
    .sort({ date: "descending" })
    .exec((err, docs) => {
      if (err) {
        return res.json({ msg: "A database error occurred..." });
      }
      console.log(docs);
      return res.json(docs);
    });
});

router.get("/name", (req, res) => {
  const data = {
    username: "apinameroute",
    age: 12
  };
  res.json(data);
});

router.post("/save", (req, res) => {
  const newBlogPost = new BlogPost(req.body);
  newBlogPost.save(err => {
    if (err) {
      return res
        .status(500)
        .json({ msg: "Post unsuccessful, database error." });
    } else {
      return res.json({ msg: "Your post has been saved." });
    }
  });
});

module.exports = router;
