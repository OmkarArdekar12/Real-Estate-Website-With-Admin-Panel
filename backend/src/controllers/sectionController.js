import Section from "../models/section.model.js";
import { cloudinary } from "../config/cloudinary.js";

export const getSections = async (req, res) => {
  try {
    const sections = await Section.find();
    return res.json(sections);
  } catch (err) {
    console.log("Error in Get Sections: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const getSectionByType = async (req, res) => {
  try {
    const section = await Section.findOne({ type: req.params.type });
    return res.json(section);
  } catch (err) {
    console.log("Error in Get Section By Type: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const createOrUpdateSection = async (req, res) => {
  try {
    const { type, title, description } = req.body;

    const allowedTypes = ["overview", "connectivity", "about"];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid section type" });
    }

    let section = await Section.findOne({ type });

    if (section) {
      if (req.file) {
        await cloudinary.uploader.destroy(section.image.public_id);
        section.image = {
          url: req.file.path,
          public_id: req.file.filename,
        };
      }

      section.title = title;
      section.description = description;

      await section.save();

      return res.json({ message: "Section Updated", section });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    section = await Section.create({
      type,
      title,
      description,
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });

    return res.status(201).json({ message: "Section Created", section });
  } catch (err) {
    console.log("Error in Create or Delete Section: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};
