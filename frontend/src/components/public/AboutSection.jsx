import { useEffect, useState } from "react";

export default function AboutSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // const fetchAbout = async () => {
    //   const res = await API.get("/sections/about");
    //   setData(res.data);
    // };
    // fetchAbout();

    setData({
      title: "About Infinity",
      description:
        "Infinity is developed by industry-leading architects and visionaries committed to delivering excellence. Our mission is to redefine urban living with unmatched quality and thoughtful design.",
      image: {
        url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      },
    });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-between py-4">
      <div className="w-full md:max-w-[45%]">
        <img
          className="w-full h-auto object-cover rounded-md"
          src={data?.image?.url}
          alt=""
        />
      </div>

      <div className="w-full flex flex-col items-center md:max-w-[45%]">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-wide mb-4">
          {data.title}
        </h1>
        <p className="text-md md:text-lg mb-4 text-gray-200">
          {data.description}
        </p>
      </div>
    </section>
  );
}
