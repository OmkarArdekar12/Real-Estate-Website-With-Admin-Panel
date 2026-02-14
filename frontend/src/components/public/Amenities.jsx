import { useEffect, useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function AmenitiesSection() {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await API.get("/amenities");
        if (res.data) {
          setAmenities(res.data);
        }
      } catch (err) {
        setAmenities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  if (loading) {
    return <div className="w-full py-20 text-center">Loading Amenities...</div>;
  }

  if (!amenities.length) {
    return;
  }

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
