"use client";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [userPosts, setUserPosts] = useState([]);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      if (id) {
        try {
          console.log("Fetching posts for ID:", id); // Log ID
          const response = await fetch(`/api/profile/${id}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          console.log("Fetched posts data:", data); // Log data
          setUserPosts(data);
        } catch (err) {
          console.error("Failed to fetch posts:", err);
        }
      }
    };
    fetchPosts();
  }, [id]);

  const handleCopy = (prompt) => {
    navigator.clipboard.writeText(prompt);
    setCopied(prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <div className="pt-24">
      <h3>Profile</h3>
      <div>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post._id} className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                <div>{post.creator?.username}</div>
                <div>{post.creator?._id}</div>
                <div
                  onClick={() => handleCopy(post.prompt)}
                  className="h-6 w-6 text-gray-500 cursor-pointer"
                >
                  <DocumentDuplicateIcon />
                </div>
              </h3>
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.prompt}
              </h3>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
