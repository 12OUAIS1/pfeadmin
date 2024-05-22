const router = require("express").Router();
const Post = require("../models/Post");

// Create a new post
router.post("/post", async (req, res) => {
    try {
        const { title, description, imgUrl } = req.body;
        const newPost = new Post({ title, description, imgUrl });
        await newPost.save();
        res.status(200).json({ post: newPost });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Update a post by ID
router.put("/updatepost/:postId", async (req, res) => {
    try {
        const { title, description, imgUrl } = req.body;
        const postId = req.params.postId;

        // Find the post by ID
        const post = await Post.findById(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Update the post fields
        post.title = title;
        post.description = description;
        post.imgUrl = imgUrl;

        // Save the updated post
        const updatedPost = await post.save();

        // Send response with the updated post
        res.status(200).json({ post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Get all posts
router.get("/allposts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json({ posts });
    } catch (error) {
        console.error('Failed to fetch all posts:', error);
        res.status(500).json({ message: 'Failed to fetch all posts' });
    }
});

// Get post by ID
router.get("/getpost/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Delete a post by ID
router.delete("/deletepost/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;
