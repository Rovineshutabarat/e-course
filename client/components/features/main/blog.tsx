const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Study Hacks for Online Learners",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RSUtGdQTfbl53Pwtl3iqLqMpYKBM6WONQQ&s",
      readTime: 8,
      writer: "Emily Harper",
    },
    {
      id: 2,
      title: "Top 10 Study Hacks for Online Learners",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RSUtGdQTfbl53Pwtl3iqLqMpYKBM6WONQQ&s",
      readTime: 8,
      writer: "Emily Harper",
    },
    {
      id: 3,
      title: "Top 10 Study Hacks for Online Learners",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RSUtGdQTfbl53Pwtl3iqLqMpYKBM6WONQQ&s",
      readTime: 8,
      writer: "Emily Harper",
    },
    {
      id: 4,
      title: "Top 10 Study Hacks for Online Learners",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RSUtGdQTfbl53Pwtl3iqLqMpYKBM6WONQQ&s",
      readTime: 8,
      writer: "Emily Harper",
    },
  ];

  return (
    <section className="py-10 md:py-14 lg:py-28">
      <div className="container px-4 md:px-8 lg:px-20 mx-auto">
        <div className="max-w-2xl mb-8 md:mb-10">
          <h2 className="mb-2 text-lg font-bold md:text-2xl">
            Stories & Study Tips
          </h2>
          <p className="text-muted-foreground">
            Study tips, learning strategies, and platform updates from our team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog) => {
            return (
              <div className="group" key={blog.id}>
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="mb-2 text-base font-semibold group-hover:text-blue-500 transition-colors">
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
