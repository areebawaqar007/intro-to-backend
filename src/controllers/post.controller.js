import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({
        message: "all fiels are req",
      });
    }

    const post = await Post.create({
      name,
      description,
      age,
    });
    res.status(201).json({
      message: "post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: "NO dtaa provided for updtae",
      });
    }
   
    const post = await Post.findById(req.params.id);
    Object.assign(post, req.body);
    await post.save();
      
    if (!post)
      return res.status(404).json({
        message: "post not found",
      });

    res.status(200).json({
      message: "post updated successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({
        message: "post not found",
      });

    res.status(200).json({
      message: "post successfully deleeted",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};
export { createPost, getPosts, updatePost, deletePost };
