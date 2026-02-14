import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import ButtonLoader from "../common/ButtonLoader";
import SectionLoader from "../common/SectionLoader";

export default function NearbyConnectivityForm() {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchConnectivity = async () => {
      setFetching(true);
      try {
        const res = await API.get("/sections/connectivity");

        if (res.data) {
          setData({
            title: res.data.title || "",
            description: res.data.description || "",
            image: null,
          });

          setPreview(res.data.image?.url || "");
        }
      } catch (err) {
        setData({
          title: "",
          description: "",
          image: null,
        });
        setPreview("");
        toast.error(
          err.response?.data?.message || "Failed to fetch connectivity section",
          { id: "connectivity-fetch-error" },
        );
      } finally {
        setFetching(false);
      }
    };

    fetchConnectivity();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({ ...data, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!data.title.trim()) {
      return toast.error("Title is required", {
        id: "connectivity-error",
      });
    }

    if (!data.description.trim()) {
      return toast.error("Description is required", {
        id: "connectivity-error",
      });
    }

    if (!preview) {
      return toast.error("Image is required", {
        id: "connectivity-error",
      });
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("type", "connectivity");
      formData.append("title", data.title);
      formData.append("description", data.description);

      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await API.post("/sections", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedSection = res.data.section;

      setData({
        title: updatedSection.title,
        description: updatedSection.description,
        image: null,
      });

      setPreview(updatedSection.image?.url || "");

      toast.success(res?.data?.message, {
        id: "connectivity-success",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to save connectivity section",
        { id: "connectivity-error" },
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <SectionLoader text="Loading Nearby Connectivity..." />;
  }

  return (
    <section className="w-full py-10 px-8 md:px-10 lg:px-20 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-serif font-bold pb-4">
        Edit Nearby Connectivity
      </h2>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-[45%]">
          {preview ? (
            <img
              src={preview}
              alt="Connectivity Preview"
              className="w-full h-auto object-cover rounded-md"
            />
          ) : (
            <div className="w-full aspect-square bg-gray-200 rounded-md flex items-center justify-center">
              No Image Selected
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-4 border border-yellow-400 px-4 py-2 rounded-xl w-full cursor-pointer"
          />
        </div>

        <div className="w-full md:w-[45%] flex flex-col gap-6">
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={data.title}
            onChange={handleChange}
            className="text-4xl md:text-6xl font-bold font-serif tracking-wide outline-none border-b border-gray-300 focus:border-yellow-400"
          />

          <textarea
            name="description"
            placeholder="Enter Description"
            value={data.description}
            onChange={handleChange}
            rows={5}
            className="text-md md:text-lg outline-none border border-gray-300 rounded-md p-3 focus:border-yellow-400"
          />

          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold transition ${
              loading
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
            }`}
          >
            {loading && <ButtonLoader />}
            {loading ? "Saving..." : "Save Connectivity"}
          </button>
        </div>
      </div>
    </section>
  );
}
