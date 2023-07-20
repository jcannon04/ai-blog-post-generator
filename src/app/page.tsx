import Link from "next/link";

export default function Home() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>Welcome to the Blogging App!</h1>
      <p className='mb-4'>
        This application allows you to write and publish blog posts using
        Markdown. You can also generate blog post ideas using our OpenAI
        integration.
      </p>
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <h2 className='text-xl font-bold mb-2'>Write Blog Posts</h2>
          <p className='mb-4'>
            Write your blog posts using Markdown syntax for easy formatting and
            organization.
          </p>
          <Link href='/blog/add'>
            <button className='bg-gray-900 text-white px-4 py-2 rounded-md'>
              Write a Blog Post
            </button>
          </Link>
        </div>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <h2 className='text-xl font-bold mb-2'>Generate Blog Post Ideas</h2>
          <p className='mb-4'>
            Use our OpenAI integration to generate blog post ideas by filling
            out a form with your preferred topic, keywords, word length, tone,
            and more.
          </p>
          <Link href='/blog/generate'>
            <button className='bg-gray-900 text-white px-4 py-2 rounded-md'>
              Generate a Blog Post
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 bg-gray-100 p-4 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Browse Your Existing Posts</h2>
          <p className="mb-4">
            Visit the blog page to see the posts you have already created.
          </p>
          <Link href="/blog">
            <button className="bg-gray-900 text-white px-4 py-2 rounded-md">
              View Blog Posts
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
