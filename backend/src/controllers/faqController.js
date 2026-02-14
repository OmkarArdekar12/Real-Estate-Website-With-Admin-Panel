import Faq from "../models/faq.model.js";

export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    return res.json(faqs);
  } catch (err) {
    console.log("Error in Get Faq: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const createFaq = async (req, res) => {
  try {
    const count = await Faq.countDocuments();

    if (count >= 10) {
      return res.status(400).json({ message: "Maximum 10 FAQs allowed" });
    }

    const faq = await Faq.create(req.body);
    return res.status(201).json(faq);
  } catch (err) {
    console.log("Error in Create Faq: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const updateFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json(faq);
  } catch (err) {
    console.log("Error in Update Faq: ", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const deleteFaq = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: "FAQ Deleted" });
  } catch (err) {
    console.log("Error in Delete Faq: ", err.message);
    res.status(500).json({ message: err.message });
  }
};
