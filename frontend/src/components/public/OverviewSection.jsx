import { useEffect, useState } from "react";

export default function OverviewSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // const fetchOverview = async () => {
    //   const res = await API.get("/sections/overview");
    //   setData(res.data);
    // };
    // fetchOverview();

    setData({
      title: "Project Overview",
      description:
        "Infinity offers thoughtfully designed residences that combine contemporary architecture with sustainable living. Spacious layouts, premium materials, and scenic surroundings create a truly elevated lifestyle.",
      image: {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
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
          className="w-full aspect-square object-cover rounded-full"
          src={data?.image?.url}
          alt=""
        />
      </div>

      <div className="w-full flex flex-col items-center md:max-w-[45%] gap-3">
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
