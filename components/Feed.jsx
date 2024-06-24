"use client";
import { useEffect, useState } from "react";
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
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchFilter = handleFilter(e.target.value, posts);
        console.log("Filtered results:", searchFilter);
        setSearchedResults(searchFilter);
      }, 500)
    );
  };

  const handleFilter = (searchTxt, posts) => {
    const regExp = new RegExp(searchTxt, "i");
    return posts.filter(
      (item) =>
        regExp.test(item.creator.username) ||
        regExp.test(item.prompt) ||
        regExp.test(item.tag)
    );
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
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      </form>
    </section>
  );
};

export default Feed;
