const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Blogs } = require('../models/blogs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', auth, async (req, res) => {
  try {
    let blogs
    if (req.user.role === "admin") {
      blogs = await Blogs.find().sort('name');
    } else {
      blogs = await Blogs.find({ user_id: req?.user?._id || "" }).sort('name');
    }
    res.send(blogs);
  } catch (err) {
    console.log("error while fetching blogs ", err);
    return res.end({ err: "error while fetching blogs" });
  }
});

router.post('/', [auth], async (req, res) => {
  try {
    const created_by = req?.user?._id || "";
    let data = _.pick(req.body, ["title", "desc", "img", "cat", "date"]);
    data = {
      ...data,
      user_id: created_by
    }
    let blog = new Blogs(data);
    blog = await blog.save();
    res.send(blog);
  } catch (err) {
    console.log("error while creating blog", err);
    return res.end({ err: "Creating blog" });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const existing = await Blogs.findOne({ _id: req.params.id });
    if (!existing) {
      return res.status(404).send('no data found');
    } else {
      if (existing.user_id === req.user._id) {
        const blog = await Blogs.findByIdAndUpdate(req.params.id, _.pick(req.body, ["title", "desc", "img", "cat"]), {
          new: true
        });
        if (!blog) return res.status(404).send('no data found');
        return res.json({ message: "Post has been updated.", success: true });
      } else {
        return res.status(403).send('invalid user');
      }
    }
  } catch (err) {
    console.log("error while updating blog: ", err);
    return res.end({ err: "error while updating blog" });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const existing = await Blogs.findOne({ _id: req.params.id });
    if (!existing) {
      return res.status(404).send('no data found');
    } else {
      if (existing.user_id === req.user._id) {
        //remove
        Blogs.remove({ _id: existing._id }, function (err, result) {
          if (err) {
            return res.status(500).send('Error occurred while deleting');
          } else {
            return res.json({ message: "Post has been deleted.", success: true });
          }
        });
      } else {
        return res.status(403).send('invalid user');
      }
    }
  } catch (err) {
    console.log("error while deleting blog: ", err);
    return res.end({ err: "error while deleting blog" });
  }
});

router.get('/:id', async (req, res) => {
  const blog = await Blogs.findById(req.params.id);

  if (!blog) return res.status(404).send('The blog with the given ID was not found.');

  res.send(blog);
});



module.exports = router;