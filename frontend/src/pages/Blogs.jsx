import useStore from '../store/store'; // Import Zustand store
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const blogs = useStore((state) => state.blogs);
  console.log(blogs);

  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-wrap -mx-4">
        {/* Recent Blog Sidebar */}
        <div className="w-full px-4 md:w-1/4">
          <h2 className="mb-4 text-xl font-bold">RECENT BLOG</h2>
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex items-center">
                <img src={blog.image} alt={blog.title} className="object-cover w-16 h-16 mr-4" />
                <div>
                  <p className="text-sm">{blog.date}</p>
                  <p className="text-sm">0 hits</p>
                   <Link to={`/blogs/${blog.id}`} className="text-blue-500">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Blog Content */}
        <div className="w-full px-4 md:w-3/4">
          {blogs.map((blog) => (
            <div key={blog.id} className="mb-8">
              <img src={blog.image} alt={blog.title} className="object-cover w-full mb-4 rounded-md h-80" />
              <h2 className="mb-2 text-2xl font-bold">{blog.title}</h2>
              <p className="mb-2 text-sm text-gray-600">{blog.date}</p>
              <p className="mb-2">Posted By: {blog.author} | {blog.hits} Hits | {blog.comments} Comments</p>
              <p>{blog.snippet}</p>
               <Link to={`/blogs/${blog.id}`} className="text-blue-500">Read More</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;