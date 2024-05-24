import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './feposter.scss';

function Post({ post, onDelete, onEdit }) {
  return (
    <div className="post-card">
      <img src={post.imgUrl} alt={post.title} className="post-img" />
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-description">{post.description}</p>
        <div className="post-actions">
          <button onClick={() => onEdit(post._id, post.title, post.description)} className="action-button">Edit</button>
          <button onClick={() => onDelete(post._id)} className="action-button">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function Fepost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPostId, setEditPostId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/v7/allposts');
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setError('Failed to fetch posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:2000/api/v7/deletepost/${postId}`);
      if (response.status === 200) {
        toast.success('Post deleted successfully');
        setPosts(posts.filter(post => post._id !== postId));
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
      toast.error('Failed to delete post. Please try again later.');
    }
  };

  const handleEditPost = async (postId, title, description) => {
    setEditPostId(postId);
    setEditTitle(title);
    setEditDescription(description);
    setShowEditModal(true);
  };

  const updatePost = async () => {
    try {
      const response = await axios.put(`http://localhost:2000/api/v7/updatepost/${editPostId}`, {
        title: editTitle,
        description: editDescription
      });
      if (response.status === 200) {
        toast.success('Post updated successfully');
        const updatedPosts = posts.map(post =>
          post._id === editPostId ? { ...post, title: editTitle, description: editDescription } : post
        );
        setPosts(updatedPosts);
        setShowEditModal(false);
      } else {
        toast.error('Failed to update post');
      }
    } catch (error) {
      console.error('Failed to edit post:', error);
      toast.error('Failed to edit post. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <Link to="/np" className="new-post-button bg-blue-500 text-white px-4 py-2 rounded">New Post</Link>
      <div className="post-container">
        {posts.map(post => (
          <div key={post._id} className="post-card">
            <Post
              post={post}
              onDelete={handleDeletePost}
              onEdit={handleEditPost}
            />
          </div>
        ))}
      </div>
      {showEditModal && (
        <div className="edit-modal">
          <h2>Edit Post</h2>
          <input 
            type="text" 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
            placeholder="Enter new title" 
            className="edit-input"
          />
          <textarea 
            value={editDescription} 
            onChange={(e) => setEditDescription(e.target.value)} 
            placeholder="Enter new description" 
            className="edit-textarea"
          ></textarea>
          <button onClick={updatePost} className="edit-button">Update</button>
          <button onClick={() => setShowEditModal(false)} className="edit-button cancel">Cancel</button>
        </div>
      )}
    </div>
  );
}
