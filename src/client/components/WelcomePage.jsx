import React from "react";
import { Link} from "react-router-dom";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./galleryAnimation.css"



const images = [
    {
      original: "https://news.artnet.com/app/news-upload/2014/07/Johannes_Vermeer_1632-1675_-_The_Girl_With_The_Pearl_Earring_1665-e1435072137333.jpg", // Replace with the path to your image
      thumbnail: "https://news.artnet.com/app/news-upload/2014/07/Johannes_Vermeer_1632-1675_-_The_Girl_With_The_Pearl_Earring_1665-e1435072137333.jpg", // Replace with the path to your thumbnail
      description: "",
    },
    {
      original: "https://news.artnet.com/app/news-upload/2014/07/American-Gothic.jpg",
      thumbnail: "https://news.artnet.com/app/news-upload/2014/07/American-Gothic.jpg",
      description: "",
    },
    {
      original: "https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-1.jpg?t=1678352599&",
      thumbnail: "https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-1.jpg?t=1678352599&",
      description: "",
    },
    {
      original: "https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-16.jpg?t=1678352599&",
      thumbnail: "https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-16.jpg?t=1678352599&",
      description: "",
    },
    {
      original: "https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-3.jpg?t=1678352599&",
      thumbnail: "https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-3.jpg?t=1678352599&",
      description: "",
    },
    {
      original: "https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-17.jpg?t=1678352599&",
      thumbnail: "https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-17.jpg?t=1678352599&",
      description: "",
    },
    
  ];



  


  export default function WelcomePage() {
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col sm:flex-row">
        <div className="transition-opacity duration-500 ease-in-out w-full sm:w-1/2">
          <div className="fade-in-out">
            <Gallery
              items={images}
              autoPlay={true}
              showPlayButton={false}
              showFullscreenButton={false}
              showThumbnails={false}
              slideInterval={6000}
              showNav={false}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-4 sm:w-1/2">
          <h1 className="text-white text-4xl font-bold mb-6 text-center">
            Welcome to Online Gallery - Where Art Comes to Life
          </h1>
          <div className="sm:max-w-md"> {/* Limit the maximum width on smaller screens */}
            <p className="text-white text-lg leading-relaxed mb-8">
              At Online Gallery, we believe that art has the power to inspire, captivate, and transform. Our passion lies in bringing the beauty and brilliance of famous paintings to life through meticulously crafted reproductions. We are thrilled to invite you on a journey through the world of art, where each canvas tells a story, and every stroke of the brush conveys the essence of the artist's vision.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/register"
              className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/products"
              className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }