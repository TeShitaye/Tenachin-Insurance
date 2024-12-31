import React from "react";
//import backgroundImage from '../assets/admin.jpg'
import claimIMG from '../assets/claimIMG.jpg'
import telemed from '../assets/telemedicine.jpg'
const BlogAndNews = () => {
  const articles = [
    {
      title: "Top Health Insurance Tips for 2024",
      description:
        "Learn how to maximize your health insurance benefits and make informed decisions this year.",
      date: "Dec 1, 2024",
      image:
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      link: "/blog/health-insurance-tips",
    },
    {
      title: "Understanding Claims: A Complete Guide",
      description:
        "A step-by-step guide to filing and tracking your health insurance claims easily.",
      date: "Nov 25, 2024",
      image:claimIMG,
      link: "/blog/claims-guide",
    },
    {
      title: "The Future of Telemedicine in 2025",
      description:
        "Explore how telemedicine is transforming healthcare and what it means for health insurance.",
      date: "Nov 18, 2024",
      image:telemed,
            link: "/blog/telemedicine-future",
    },
  ];

  return (
    <section className="bg-transparent l pt-8 pb-24 ">
  {/*  style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "110vh",
      width: "100%",
    }} */ }
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
          Blog & News
        </h2>
        <p className="text-center text-lg text-white mb-12">
          Stay updated with the latest health insurance tips, news, and insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 overflow-hidden"
            >
              {/* Article Image */}
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />

              {/* Article Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-900 mb-4">{article.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  <a
                    href={article.link}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogAndNews;
