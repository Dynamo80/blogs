import React, { useEffect, useState } from 'react';
import './App.css';

function Post({ post, onDelete }) {
  return(
  <div className='post'>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
    <button onClick ={ () => {onDelete(post.id)}}>Delete</button>
  </div>
)}

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect (() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, [])
  
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts])

  const addPost = () => {
    if (title.trim() && content.trim()) {
      const newPost = { id: Date.now(), title, content};
      setPosts([...posts, newPost]);
      setTitle('');
      setContent('');
    }
  }
  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id))
  }
  return (
    <div className='App'>
      <h1>Mini Blog</h1>
      <input type='text' value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} placeholder='Content of blog' onChange={(e) => setContent(e.target.value)} />
      <button onClick={addPost}>Add Post</button>
      <div className='posts'>
        {posts.map((post) => (
          <Post key={post.id} post={post} onDelete={deletePost}/>
        ))}
      </div>
    </div>
  )
}

export default App;