// A work in progress for adding photos to blogs and generator random topics
"use client";

import { useState } from "react";
import MarkdownIt from "markdown-it";
import Image from "next/image";

const Test = () => {
  const [blogPostData, setBlogPostData]: any = useState(null);
  const [blogPostContent, setBlogPostContent] = useState("");

  const getBlogPost = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "",
      });

      const data = await response.json();
      console.log(data.content);

      const postData = await JSON.parse(data.content);
      let title = postData.title || "basic blog post hero image";
      
      const imgResponse = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(title),
      });
      const img_url = await imgResponse.json();
      console.log(img_url)
      postData.img_url = img_url;

      const md = new MarkdownIt();
      console.log(postData.content);
      const content = md.render(postData.content);

      setBlogPostContent(content);
      setBlogPostData(postData);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // console.log(blogPostData);
  return (
    <></>
//     <div className='blog-post-container m-2'>
//       <h1>Test</h1>
//       <button onClick={getBlogPost}>Generate</button>
//       <h2 id='title'>{blogPostData ? blogPostData.title : ""}</h2>
//       <h3 id='author' className='mb-4'>
//         {blogPostData ? `by: ${blogPostData.author}` : ""}
//       </h3>
//       {blogPostData?.img_url && (
//         <Image
//           src={blogPostData.img_url || ''}
//           width={500}
//           height={500}
//           alt='blog post hero picture'
//         />
//       )}
//       <div
//         className=''
//         dangerouslySetInnerHTML={{ __html: blogPostContent }}
//       ></div>
//       <style>
//         {`
//     #title {
//       margin-bottom: 0px;
//     }
//     #author {
//       margin-top: .7em;
//     }
//     .blog-post-container {
//       font-family: Arial, sans-serif;
//       font-size: 16px;
//       line-height: 1.6;
//       color: #333;
//     }

//     .blog-post-container h1 {
//       font-size: 28px;
//       font-weight: bold;
//       margin-bottom: 20px;
//     }

//     .blog-post-container h2 {
//       font-size: 24px;
//       font-weight: bold;
//       margin-top: 30px;
//       margin-bottom: 15px;
//     }

//     .blog-post-container h3 {
//       font-size: 20px;
//       font-weight: bold;
//       margin-top: 25px;
//       margin-bottom: 10px;
//     }

//     .blog-post-container p {
//       margin-bottom: 15px;
//     }

//     .blog-post-container a {
//       color: #007bff;
//       text-decoration: none;
//     }

//     .blog-post-container a:hover {
//       text-decoration: underline;
//     }

//     .blog-post-container ul,
//     .blog-post-container ol {
//       margin-bottom: 15px;
//       padding-left: 0px;
//       list-style: square;
//     }

//     .blog-post-container li {
//       margin-bottom: 8px;
//       margin-left: 0px;
      
//     }

//     .blog-post-container blockquote {
//       margin: 0;
//       padding-left: 15px;
//       border-left: 4px solid #ccc;
//       color: #777;
//     }
//   `}
//       </style>
//     </div>
 );
};

export default Test;
