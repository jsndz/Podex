"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`, {
          method: "GET",
        });
        const data = await response.json();

        setPost({ prompt: data.prompt, tag: data.tag });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to get prompt: ${response.status} - ${errorText}`
          );
        }
      } catch (error) {
        console.error("Error Updating prompt:", error);
      }
    };
    fetchPrompt();
  }, []);
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const errorText = await response.text();
        throw new Error(
          `Failed to Update prompt: ${response.status} - ${errorText}`
        );
      }
    } catch (error) {
      console.error("Error Updating prompt:", error);
    }
  };
  return (
    <Form
      handleSubmit={updatePrompt}
      post={post}
      type="update"
      setPost={setPost}
      submitting={submitting}
    ></Form>
  );
};

export default page;
