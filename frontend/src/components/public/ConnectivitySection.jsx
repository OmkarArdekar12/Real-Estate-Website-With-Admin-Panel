import { useEffect, useState } from "react";
import API from "../../api/axios";
import SectionLoader from "../common/SectionLoader";

export default function ConnectivitySection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnectivity = async () => {
      setLoading(true);
      try {
        const res = await API.get("/sections/connectivity");

        if (res.data) {
          setData(res.data);
        }
      } catch (err) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchConnectivity();
  }, []);

  if (loading) {
    return <SectionLoader text="Loading Nearby Connectivity" />;
  }

  if (!data) {
    return;
  }

  return (
    <section
      id="connectivity"
      className="w-full flex flex-col md:flex-row items-center justify-between py-4"
    >
      <div className="w-full md:max-w-[45%]">
        <img
          className="w-full h-auto object-cover rounded-md"
          src={data?.image?.url}
          alt={data?.title}
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
