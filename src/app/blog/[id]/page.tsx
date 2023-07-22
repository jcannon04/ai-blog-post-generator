"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import LoadingPage from "@/app/loading";
import Link from "next/link";
interface Post {
  _id: string;
  title: string;
  content: string;
}

const getPost = async (id: string): Promise<Post> => {
  const response = await fetch(`/api/posts/${id}`);
  const post = await response.json();
  return post;
};

const BlogPost = async ({ params }: { params: any }) => {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = params;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(id);
        setPost(fetchedPost);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <LoadingPage />;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-2'>{post.title}</h1>
      <div className='mb-4'>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <Link href={`/blog`}>
        <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Back to Blog
        </button>
      </Link>
    </div>
  );
};

export default BlogPost;
