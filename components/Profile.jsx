"use client";

import PromptCart from "./PromptCart";
import { useRouter } from "next/navigation";
const Profile = ({ name, desc, data }) => {
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    try {
      const response = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete prompt: ${response.status} - ${errorText}`
        );
      }
    } catch (error) {
      console.error("Error deleting prompt:", error);
    }
  };

  return (
    <section className="pt-24">
      <h3>{name} Profile</h3>
      <p>{desc}</p>
      <div>
        {data.map((post) => {
          return (
            <div>
              {" "}
              <PromptCart key={post._id} post={post} />{" "}
              {
                <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                  <p
                    className="font-inter text-sm green_gradient cursor-pointer"
                    onClick={() => {
                      handleEdit(post);
                    }}
                  >
                    Edit
                  </p>
                  <button
                    className="font-inter text-sm orange_gradient cursor-pointer"
                    onClick={() => handleDelete(post)}
                  >
                    Delete
                  </button>
                </div>
              }
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Profile;
