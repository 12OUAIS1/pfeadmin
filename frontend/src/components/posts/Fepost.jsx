// Fepost.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './feposter.scss';

function Post({ post, onDelete, onEdit }) {
  return (
    <div className="post-card">
      <img src={post.image} alt={post.title} className="post-img" />
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-description">{post.content}</p>
        <div className="post-comments">
          {post.comments.map(comment => (
            <div key={comment.id} className="comment">
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}
        </div>
        <div className="post-actions">
          <button onClick={() => onEdit(post.id)} className="action-buttond">Edit</button>
          <button onClick={() => onDelete(post.id)} className="action-button">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function Fepost() {
  const initialPosts = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Post ${index + 1}`,
    content: `This is the content of post ${index + 1}.`,
    image: 'https://via.placeholder.com/600x400',
    comments: [{ id: 1, text: `Comment for post ${index + 1}` }]
  }));

  const [posts, setPosts] = useState(initialPosts);

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    toast.success('Post deleted successfully');
  };

  const handleEditPost = (postId) => {
    const post = posts.find(post => post.id === postId);
    const newTitle = prompt("Enter new title:", post.title);
    const newContent = prompt("Enter new content:", post.content);
    const newImage = prompt("Enter new image URL:", post.image);
    if (newTitle.trim() === '' || newContent.trim() === '' || newImage.trim() === '') return;
    const updatedPosts = posts.map(post => post.id === postId ? { ...post, title: newTitle, content: newContent, image: newImage } : post);
    setPosts(updatedPosts);
    toast.success('Post updated successfully');
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <Link to="/newadmin" className="new-post-button bg-blue-500 text-white px-4 py-2 rounded">New Post</Link>
      <div className="post-container">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <Post
              post={post}
              onDelete={handleDeletePost}
              onEdit={handleEditPost}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
