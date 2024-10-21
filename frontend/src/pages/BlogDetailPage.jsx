import { useParams } from 'react-router-dom';
import useStore from '../store/store';
import { useEffect } from 'react';

const BlogDetailPage = () => {
  const { blogId } = useParams(); // Get the blog ID from the URL
  const blogs = useStore((state) => state.blogs);
  const blog = blogs.find((b) => b.id == blogId); // Find the blog by ID

  useEffect(()=>{
    console.log("blog id: ", blogId, " blogs: ", blogs, " blog: ", blog)
  })

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="container px-4 mx-auto">
      <img src={blog.image} alt={blog.title} className="object-cover w-full mb-4 rounded-md h-96" />
      <h1 className="mb-4 text-3xl font-bold">{blog.title}</h1>
      <p className="mb-2 text-sm text-gray-600">{blog.date}</p>
      <p className="mb-4">Posted By: {blog.author} | {blog.hits} Hits | {blog.comments} Comments</p>
      <div className="prose">
        <p className='text-slate-800'>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetailPage;
