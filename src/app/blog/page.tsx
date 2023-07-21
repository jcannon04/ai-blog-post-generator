

import Link from "next/link";
import ReactMarkdown from 'react-markdown'
import {server} from '../config/server';
// get posts from database
async function getPosts() {
  try {
    const posts = await fetch(`${server}/api/posts`, {
      next: {
        revalidate: 60
      }
    });
    return posts.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function deletePost(id: any) {
  try {
    const posts = await fetch(`${server}/api/posts/${id}`, {
      method: "DELETE"
    });

  } catch (error) {
    console.error(error);
  }
}

const BlogPage = async () => {
  const posts = await getPosts();

  return (
    <div>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {posts.map((post: any) => (
          <li
            key={post.title}
            className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          >
            <Link href={`/blog/${post._id}`}>
              <h2 className='text-2xl font-bold mb-2'>{post.title}</h2>
            </Link>
            <ReactMarkdown>{post.excerpt}</ReactMarkdown>
          </li>
        ))}
        <li className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex items-center justify-center'>
          <Link href='/blog/add'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-12 w-12 text-gray-500'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V6a1 1 0 012 0v3h3a1 1 0 010 2h-3v3a1 1 0 01-2 0v-3H6a1 1 0 010-2h3z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BlogPage;
