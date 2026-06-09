"use client";

import { useEffect, useState } from "react";
import { getPostsByUser } from "../lib/api";
import styles from "./UserDetail.module.css";

export default function UserDetail({ userId }) {
  const [postsState, setPostsState] = useState({ userId: null, posts: [] });

  useEffect(() => {
    if (userId == null) {
      return;
    }

    let isCurrent = true;

    getPostsByUser(userId).then((data) => {
      if (!isCurrent) {
        return;
      }

      setPostsState({ userId, posts: data });
    });

    return () => {
      isCurrent = false;
    };
  }, [userId]);

  if (userId == null) {
    return <p className={styles.placeholder}>Select a user to see their posts.</p>;
  }

  if (postsState.userId !== userId) {
    return <p className={styles.placeholder}>Loading posts...</p>;
  }

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Posts</h2>
      <ul className={styles.posts}>
        {postsState.posts.map((post) => (
          <li key={post.id} className={styles.post}>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postBody}>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
