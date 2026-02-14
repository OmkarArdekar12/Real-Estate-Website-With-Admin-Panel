import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import ButtonLoader from "../common/ButtonLoader";
import SectionLoader from "../common/SectionLoader";

export default function FaqForm() {
  const [faqs, setFaqs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchFaqs = async () => {
    setFetching(true);
    try {
      const res = await API.get("/faqs");
      if (res.data) {
        setFaqs(res.data);
      }
    } catch {
      setFaqs([]);
      toast.error("Failed to fetch FAQs", { id: "faq-fetch-error" });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ question: "", answer: "" });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!form.question.trim()) {
      toast.error("Question required", { id: "faq-error" });
      return;
    }

    if (!form.answer.trim()) {
      toast.error("Answer required", { id: "faq-error" });
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await API.put(`/faqs/${editingId}`, form);
        toast.success("FAQ Updated", { id: "faq-success" });
      } else {
        await API.post("/faqs", form);
        toast.success("FAQ Created", { id: "faq-success" });
      }

      resetForm();
      fetchFaqs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed", {
        id: "faq-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingId(faq._id);
    setForm({
      question: faq.question,
      answer: faq.answer,
    });
  };

  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      await API.delete(`/faqs/${id}`);
      toast.success("FAQ Deleted", { id: "faq-delete" });

      if (id === editingId) {
        setEditingId(null);
        resetForm();
      }

      fetchFaqs();
    } catch {
      toast.error("Delete failed", { id: "faq-error" });
    } finally {
      setDeleteLoading(false);
    }
  };

  if (fetching) {
    return <SectionLoader text="Loading FAQs..." />;
  }

  return (
    <section className="w-full py-10 px-8 md:px-10 lg:px-20 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-serif font-bold pb-4">
        Manage FAQs ({faqs.length}/10)
      </h2>

      <div className="flex flex-col gap-6 mb-10">
        <input
          type="text"
          name="question"
          placeholder="Enter Question"
          value={form.question}
          onChange={handleChange}
          className="border px-4 py-2 rounded-md"
        />

        <textarea
          name="answer"
          placeholder="Enter Answer"
          value={form.answer}
          onChange={handleChange}
          rows={4}
          className="border px-4 py-2 rounded-md"
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
              ? "Updating FAQ..."
              : "Update FAQ"
            : loading
              ? "Adding FAQ..."
              : "Add FAQ"}
        </button>
      </div>

      <div className="space-y-6">
        {faqs.map((faq) => (
          <div
            key={faq._id}
            className="border-1 border-yellow-400 p-4 rounded-md shadow-sm"
          >
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="text-sm text-gray-600 mb-3">{faq.answer}</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(faq)}
                className="bg-transparent text-blue-600 rounded-md cursor-pointer px-4 py-1 border-1 border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Edit
              </button>

              <button
                disabled={deleteLoading || loading}
                onClick={() => handleDelete(faq._id)}
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
