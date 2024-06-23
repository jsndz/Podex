"use client";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import PromptCart from "./PromptCart";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div>
      {data.map((post) => (
        <PromptCart
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = () => {};

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section>
      <form>
        <input
          type="text"
          placeholder="Enter a tag or a prompt"
          value={searchText}
          onChange={handleSearchChange}
        />
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
        <div>hell</div>
      </form>
    </section>
  );
};

export default Feed;
