import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import ButtonLoader from "../common/ButtonLoader";
import SectionLoader from "../common/SectionLoader";

export default function AboutForm() {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await API.get("/sections/about");

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
        toast.error("Failed to fetch About section", {
          id: "about-fetch-error",
        });
      } finally {
        setFetching(false);
      }
    };

    fetchAbout();
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
      toast.error("Title required", { id: "about-error" });
      return;
    }

    if (!data.description.trim()) {
      toast.error("Description required", { id: "about-error" });
      return;
    }

    if (!preview) {
      toast.error("Image required", { id: "about-error" });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("type", "about");
      formData.append("title", data.title);
      formData.append("description", data.description);

      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await API.post("/sections", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updated = res.data.section;

      setData({
        title: updated.title,
        description: updated.description,
        image: null,
      });

      setPreview(updated.image?.url || "");

      toast.success(res?.data?.message, { id: "about-success" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed", {
        id: "about-error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <SectionLoader text="Loading About..." />;
  }

  return (
    <section className="w-full py-10 px-8 md:px-10 lg:px-20 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-serif font-bold pb-4">Edit About Section</h2>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-[45%]">
          {preview ? (
            <img
              src={preview}
              alt="About Preview"
              className="w-full rounded-md object-cover"
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
            {loading ? "Saving..." : "Save About"}
          </button>
        </div>
      </div>
    </section>
  );
}
