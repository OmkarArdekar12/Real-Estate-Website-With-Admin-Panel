import { useEffect, useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";

export default function OverviewSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await API.get("/sections/overview");

        if (res.data) {
          setData(res.data);
        }
      } catch (err) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) {
    return <div className="w-full py-20 text-center">Loading Overview...</div>;
  }

  if (!data) {
    return;
  }

  return (
    <section
      id="overview"
      className="w-full flex flex-col md:flex-row items-center justify-between py-4"
    >
      <div className="w-full md:max-w-[45%]">
        <img
          className="w-full aspect-square object-cover rounded-full"
          src={data?.image?.url}
          alt={data?.title}
        />
      </div>

      <div className="w-full flex flex-col items-center md:max-w-[45%] gap-3">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-wide mb-4">
          {data.title}
        </h1>

        <p className="text-md md:text-lg mb-4 text-gray-200 text-center md:text-left">
          {data.description}
        </p>
      </div>
    </section>
  );
}
