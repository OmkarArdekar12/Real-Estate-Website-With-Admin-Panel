import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import ButtonLoader from "../common/ButtonLoader";

export default function HeroForm() {
  const [hero, setHero] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      setFetching(true);
      try {
        const res = await API.get("/hero");

        if (res.data) {
          setHero({
            title: res.data.title || "",
            subtitle: res.data.subtitle || "",
            description: res.data.description || "",
            image: null,
          });

          setPreview(res.data.image?.url || "");
        }
      } catch (err) {
        console.log("No hero found, admin can create.");
      } finally {
        setFetching(false);
      }
    };

    fetchHero();
  }, []);

  const handleChange = (e) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHero({ ...hero, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!hero.title.trim()) {
      toast.error("Title is required", { id: "hero-error" });
      return;
    }

    if (!hero.subtitle.trim()) {
      toast.error("Subtitle is required", { id: "hero-error" });
      return;
    }

    if (!hero.description.trim()) {
      toast.error("Description is required", { id: "hero-error" });
      return;
    }

    if (!preview) {
      toast.error("Hero image is required", { id: "hero-error" });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", hero.title);
      formData.append("subtitle", hero.subtitle);
      formData.append("description", hero.description);

      if (hero.image) {
        formData.append("image", hero.image);
      }

      const res = await API.post("/hero", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedHero = res.data.hero;

      setHero({
        title: updatedHero.title,
        subtitle: updatedHero.subtitle,
        description: updatedHero.description,
        image: null,
      });

      setPreview(updatedHero.image?.url || "");

      toast.success(res?.data?.message, { id: "hero-success" });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Something went wrong";

      toast.error(message, { id: "hero-error" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="w-full py-20 text-center">Loading Hero...</div>;
  }

  return (
    <section className="w-full py-10 px-8 md:px-10 lg:px-20 bg-white ">
      <h2 className="text-3xl font-serif font-bold pb-4">Edit Hero Section</h2>
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-[45%]">
          {preview ? (
            <img
              src={preview}
              alt="Hero Preview"
              className="w-full rounded-md object-cover"
            />
          ) : (
            <div className="w-full md:w-[50%] aspect-square bg-gray-200 rounded-md flex items-center justify-center">
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
            value={hero.title}
            onChange={handleChange}
            className="text-4xl md:text-6xl font-bold font-serif tracking-wide outline-none border-b border-gray-300 focus:border-yellow-400"
          />

          <input
            type="text"
            name="subtitle"
            placeholder="Enter Subtitle"
            value={hero.subtitle}
            onChange={handleChange}
            className="text-xl md:text-2xl text-yellow-400 outline-none border-b border-gray-300 focus:border-yellow-400"
          />

          <textarea
            name="description"
            placeholder="Enter Description"
            value={hero.description}
            onChange={handleChange}
            rows={4}
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
            {loading ? "Saving..." : "Save Hero"}
          </button>
        </div>
      </div>
    </section>
  );
}
