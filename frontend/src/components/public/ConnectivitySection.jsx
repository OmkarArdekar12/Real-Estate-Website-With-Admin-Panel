import { useEffect, useState } from "react";

export default function ConnectivitySection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // const fetchConnectivity = async () => {
    //   const res = await API.get("/sections/connectivity");
    //   setData(res.data);
    // };
    // fetchConnectivity();

    setData({
      title: "Nearby Connectivity",
      description:
        "Located at the heart of the city, Infinity ensures seamless connectivity to schools, hospitals, shopping centers, and major transportation hubs, making daily life effortless and convenient.",
      image: {
        url: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1",
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
