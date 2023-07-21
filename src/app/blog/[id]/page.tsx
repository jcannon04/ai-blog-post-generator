import ReactMarkdown from 'react-markdown'
import Link from 'next/link'


const getPost = async (id: any) => {
  const response = await fetch(`./api/posts/${id}`, {
    next: {
      revalidate: 60,
    },
  });
  const post = await response.json();
  return post;
};

const BlogPost = async ({ params }: { params: any }) => {
  const { id } = params;
  const post = await getPost(id);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <div className="mb-4">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <Link href="/blog">
        <button className="bg-gray-900 text-white px-4 py-2 rounded-md mt-4">
          Back to Blog
        </button>
      </Link>
    </div>
  );
};

export default BlogPost;
