import { useEffect, useState } from "react";
// import API from "../../api/axios";

export default function ConstructionSection() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // const fetchUpdates = async () => {
    //   const res = await API.get("/construction");
    //   setUpdates(res.data);
    // };
    // fetchUpdates();

    setUpdates([
      {
        _id: "1",
        label: "January 2025",
        description: "Foundation work completed successfully.",
        progress: 30,
        image: {
          url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
        },
      },
      {
        _id: "2",
        label: "March 2025",
        description: "Structural framework nearing completion.",
        progress: 60,
        image: {
          url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
        },
      },
      {
        _id: "3",
        label: "June 2025",
        description: "Exterior finishing and interior plumbing in progress.",
        progress: 85,
        image: {
          url: "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
        },
      },
    ]);
  }, []);

  return (
    <section id="construction" className="w-full flex flex-col gap-3 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">
          Construction Updates
        </h1>
        <p className="text-gray-600 mt-4">
          Track the progress of your future home.
        </p>
      </div>

      <div className="relative border-l-2 flex flex-col gap-2 border-yellow-400 pl-4 space-y-16">
        {updates.map((item) => (
          <div key={item._id} className="flex flex-col gap-1 relative">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              <h2 className="text-2xl font-semibold mb-3">{item.label}</h2>
            </div>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
              <div
                className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            {item.image?.url && (
              <img
                src={item.image.url}
                alt={item.label}
                className="w-full md:w-[60%] rounded-md shadow-md object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
