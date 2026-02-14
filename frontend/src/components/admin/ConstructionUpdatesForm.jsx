import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import ButtonLoader from "../common/ButtonLoader";

export default function ConstructionUpdatesForm() {
  const [updates, setUpdates] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    label: "",
    description: "",
    progress: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchUpdates = async () => {
    try {
      const res = await API.get("/construction");
      if (res.data) {
        setUpdates(res.data);
      }
    } catch (err) {
      toast.error("Failed to fetch construction updates", {
        id: "construction-fetch-error",
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
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
    setForm({
      label: "",
      description: "",
      progress: "",
      image: null,
    });
    setPreview("");
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!form.label.trim()) {
      return toast.error("Label required", { id: "construction-error" });
    }

    if (form.progress < 0 || form.progress > 100) {
      return toast.error("Progress must be between 0 and 100", {
        id: "construction-error",
      });
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("label", form.label);
      formData.append("description", form.description);
      formData.append("progress", form.progress);

      if (form.image) formData.append("image", form.image);

      if (editingId) {
        await API.put(`/construction/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Update Modified", { id: "construction-success" });
      } else {
        await API.post("/construction", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Update Created", { id: "construction-success" });
      }

      resetForm();
      fetchUpdates();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed", {
        id: "construction-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      label: item.label,
      description: item.description || "",
      progress: item.progress || "",
      image: null,
    });
    setPreview(item.image?.url || "");
  };

  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      await API.delete(`/construction/${id}`);
      toast.success("Update Deleted", { id: "construction-delete" });

      if (id === editingId) resetForm();

      fetchUpdates();
    } catch {
      toast.error("Delete failed", { id: "construction-error" });
    } finally {
      setDeleteLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="w-full py-20 text-center">
        Loading Construction Updates...
      </div>
    );
  }

  return (
    <section className="w-full py-10 px-8 md:px-10 lg:px-20 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-serif font-bold mb-10">
        Manage Construction Updates ({updates.length}/10)
      </h2>

      <div className="flex flex-col gap-6 mb-10">
        <input
          type="text"
          name="label"
          placeholder="Phase Label (e.g., Phase 1 Completed)"
          value={form.label}
          onChange={handleChange}
          className="border px-4 py-2 rounded-md"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="border px-4 py-2 rounded-md"
        />

        <input
          type="number"
          name="progress"
          placeholder="Progress %"
          value={form.progress}
          onChange={handleChange}
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
              ? "Updating..."
              : "Update Construction"
            : loading
              ? "Adding..."
              : "Add Construction"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {updates.map((item) => (
          <div
            key={item._id}
            className="border-1 border-yellow-400 p-4 rounded-md shadow-sm"
          >
            {item.image?.url && (
              <img
                src={item.image.url}
                alt={item.label}
                className="w-full max-h-40 object-cover rounded-md mb-3"
              />
            )}

            <h3 className="font-semibold">{item.label}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>

            <p className="text-sm font-medium mb-3">
              Progress: {item.progress || 0}%
            </p>

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
                className={`bg-transparent text-red-600 rounded-md px-4 py-1 border-1 border-red-600 hover:bg-red-600 hover:text-white ${
                  deleteLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
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
