import { useEffect, useState } from "react";
// import API from "../../api/axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function AmenitiesSection() {
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    // const fetchAmenities = async () => {
    //   const res = await API.get("/amenities");
    //   setAmenities(res.data);
    // };
    // fetchAmenities();

    setAmenities([
      {
        _id: "1",
        title: "Swimming Pool",
        description: "Olympic size temperature-controlled pool.",
        image: {
          url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        },
      },
      {
        _id: "2",
        title: "Modern Gym",
        description: "Fully equipped state-of-the-art fitness center.",
        image: {
          url: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
        },
      },
      {
        _id: "3",
        title: "Club House",
        description: "Elegant community space for gatherings.",
        image: {
          url: "https://images.unsplash.com/photo-1598300053634-3c9f8edb62f0",
        },
      },
      {
        _id: "4",
        title: "Children Play Area",
        description: "Safe and fun environment for kids.",
        image: {
          url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
        },
      },
      {
        _id: "5",
        title: "Landscape Garden",
        description: "Beautifully designed green open spaces.",
        image: {
          url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        },
      },
    ]);
  }, []);

  return (
    <section id="amenities" className="w-full py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">Amenities</h1>
        <p className="text-gray-600 mt-4">
          Experience world-class facilities crafted for your comfort.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {amenities.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <img
                src={item.image.url}
                alt={item.title}
                className="w-full aspect-square object-cover"
              />

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3">{item.title}</h2>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
