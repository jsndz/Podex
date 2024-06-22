"use client";

import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section>
      <span>{type} Post</span>
      <form onSubmit={handleSubmit} className="glassmorphism">
        <label>
          <span>Enter your Prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            className="form_textarea"
            required
          ></textarea>
        </label>
        <label>
          <span>Tag </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className="form_input"
            required
          ></input>
        </label>
        <div>
          <Link href="/">Cancel</Link>
          <button type="submit" disabled={submitting}>
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
