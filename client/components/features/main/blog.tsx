const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Study Hacks for Online Learners",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RSUtGdQTfbl53Pwtl3iqLqMpYKBM6WONQQ&s",
      categories: "Education Tips",
      readTime: 8,
      writer: "Emily Harper",
    },
    {
      id: 2,
      title: "Top 10 Study Hacks for Online Learners",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RSUtGdQTfbl53Pwtl3iqLqMpYKBM6WONQQ&s",
      categories: "Education Tips",
      readTime: 8,
      writer: "Emily Harper",
    },
    {
      id: 3,
      title: "Top 10 Study Hacks for Online Learners",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RSUtGdQTfbl53Pwtl3iqLqMpYKBM6WONQQ&s",
      categories: "Education Tips",
      readTime: 8,
      writer: "Emily Harper",
    },
    {
      id: 4,
      title: "Top 10 Study Hacks for Online Learners",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RSUtGdQTfbl53Pwtl3iqLqMpYKBM6WONQQ&s",
      categories: "Education Tips",
      readTime: 8,
      writer: "Emily Harper",
    },
  ];

  return (
    <section className="py-20">
      <div className="container px-16 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            Our <span className="text-blue-500">Blogs</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Stay in touch with daily newsletter
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog) => {
            return (
              <div className="group" key={blog.id}>
                <div className="overflow-hidden rounded-xl mb-4">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="inline-flex items-center px-3 py-1 mb-3 text-sm font-medium rounded-full bg-blue-100 text-blue-700">
                  {blog.categories}
                </div>

                <h3 className="mb-2 text-xl font-semibold group-hover:text-blue-500 transition-colors">
                  <a href="#">{blog.title}</a>
                </h3>

                <div className="flex items-center text-sm text-muted-foreground">
                  <span>By {blog.writer}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.readTime} min read</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
