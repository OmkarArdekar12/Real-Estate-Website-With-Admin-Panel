import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import ButtonLoader from "../common/ButtonLoader";
import SectionLoader from "../common/SectionLoader";

export default function AmenityForm() {
  const [amenities, setAmenities] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchAmenities = async () => {
    try {
      const res = await API.get("/amenities");
      if (res.data) {
        setAmenities(res.data);
      }
    } catch (err) {
      setAmenities([]);
      toast.error("Failed to fetch amenities", { id: "amenity-fetch-error" });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setForm({ title: "", description: "", image: null });
    setPreview("");
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error("Title required", { id: "amenity-error" });
      return;
    }

    if (!form.description.trim()) {
      toast.error("Description required", { id: "amenity-error" });
      return;
    }

    if (!editingId && !form.image) {
      toast.error("Image required", { id: "amenity-error" });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);

      if (form.image) formData.append("image", form.image);

      if (editingId) {
        await API.put(`/amenities/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Amenity Updated", { id: "amenity-success" });
      } else {
        await API.post("/amenities", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Amenity Created", { id: "amenity-success" });
      }

      resetForm();
      fetchAmenities();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed", {
        id: "amenity-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      image: null,
    });
    setPreview(item.image.url);
  };

  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      await API.delete(`/amenities/${id}`);
      toast.success("Amenity Deleted", { id: "amenity-delete" });
      if (id === editingId) {
        setEditingId(null);
        resetForm();
      }
      fetchAmenities();
    } catch {
      toast.error("Delete failed", { id: "amenity-error" });
    } finally {
      setDeleteLoading(false);
    }
  };

  if (fetching) {
    return <SectionLoader text="Loading Amenities..." />;
  }

  return (
    <section className="w-full py-10 px-8 md:px-10 lg:px-20 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-serif font-bold pb-4">
        Manage Amenities ({amenities.length}/10)
      </h2>

      <div className="flex flex-col gap-6 mb-10">
        <input
          type="text"
          name="title"
          placeholder="Amenity Title"
          value={form.title}
          onChange={handleChange}
          className="border px-4 py-2 rounded-md"
        />

        <textarea
          name="description"
          placeholder="Amenity Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="border px-4 py-2 rounded-md"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-md"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-yellow-400 px-4 py-2 rounded-xl cursor-pointer"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || deleteLoading}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold transition ${
            loading
              ? "bg-yellow-300 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
          }`}
        >
          {loading && <ButtonLoader />}
          {editingId
            ? loading
              ? "Updating Amenity..."
              : "Update Amenity"
            : loading
              ? "Adding Amenity.."
              : "Add Amenity"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenities.map((item) => (
          <div
            key={item._id}
            className="border-1 border-yellow-400 p-4 rounded-md shadow-sm"
          >
            <img
              src={item.image.url}
              alt={item.title}
              className="w-full max-h-40 object-cover rounded-md mb-3"
            />
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{item.description}</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(item)}
                className="bg-transparent text-blue-600 rounded-md cursor-pointer px-4 py-1 border-1 border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Edit
              </button>

              <button
                disabled={deleteLoading || loading}
                onClick={() => handleDelete(item._id)}
                className={`bg-transparent text-red-600 rounded-md px-4 py-1 border-1 border-red-600 hover:bg-red-600 hover:text-white ${deleteLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
