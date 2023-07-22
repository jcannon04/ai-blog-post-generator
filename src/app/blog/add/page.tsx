"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import Link from "next/link";

const AddPost = () => {
  const [title, setTitle] = useState("Blog Post Title");
  const [content, setContent] = useState(
    "Start writing your blog post here..."
  );

  const [id, setId] = useState("");

  const handleSave = async () => {
    // Save the post to the database
    const excerpt = content.slice(0, 100) + "...";
    try {
      let response = await fetch(`/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, excerpt }),
      });
      const post = await response.json();
      const { _id } = post;
      setId(_id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  return (
      <div className='m-4'>
        <div className='flex flex-col items-center'>
          <input
            type='text'
            id='title'
            className='w-3/4 border border-gray-300 p-2 mb-4'
            value={title}
            onChange={handleTitleChange}
          />
          <div className='w-full'>
            <MarkdownEditor
              value={content}
              style={{ height: "500px" }}
              onChange={handleChange}
              renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            />
          </div>
          <div className='flex justify-center'>
            <button
              className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleSave}
            >
              Submit
            </button>
            <Link href='/blog/generate'>
              <button className='mt-4 ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
                Generate
              </button>
            </Link>
            {id && (
              <Link href={`/blog/${id}`}>
                <button className='mt-4 ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
                  View
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
  );
};

export default AddPost;
