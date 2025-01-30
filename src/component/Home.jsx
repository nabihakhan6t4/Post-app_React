import React, { useState, useEffect } from "react";
import { Button, Card, Input, Space } from "antd";
import { collection, getDocs, addDoc } from "firebase/firestore";
import {  onAuthStateChanged } from "firebase/auth";  // Corrected import for Firebase Auth
import { auth} from "../config/firebase"; // Use the exported auth and db directly
import { db } from "../config/firebase"; // ✅ Ab db import ho sakta hai

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [user, setUser] = useState(null);

  // Fetching posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setPosts(postList);
    };
    fetchPosts();
  }, []);

  // Authentication state listener
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

  // Add a new post
  const handlePostSubmit = async () => {
    if (newPost.trim()) {
      const postRef = collection(db, "posts");
      await addDoc(postRef, {
        text: newPost,
        likes: 0,
        userId: user.uid,
      });
      setNewPost(""); // Reset the input field
    }
  };

  return (
    <div>
      <h2>Welcome to the Post App</h2>
      {user ? (
        <div>
          <h3>Logged in as {user.email}</h3>
          <Input.TextArea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows={4}
            placeholder="Write your post"
          />
          <Button onClick={handlePostSubmit} type="primary" style={{ marginTop: "10px" }}>
            Post
          </Button>
        </div>
      ) : (
        <p>Please log in to create a post</p>
      )}

      <div style={{ marginTop: "30px" }}>
        {posts.map((post) => (
          <Card key={post.id} style={{ marginBottom: "15px" }}>
            <p>{post.text}</p>
            <Space>
              <Button>Like {post.likes}</Button>
              <Button>Comment</Button>
            </Space>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
