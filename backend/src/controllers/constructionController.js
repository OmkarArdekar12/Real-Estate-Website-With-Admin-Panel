import ConstructionUpdate from "../models/constructionUpdate.model.js";
import { cloudinary } from "../config/cloudinary.js";

export const getConstructionUpdates = async (req, res) => {
  try {
    const updates = await ConstructionUpdate.find().sort({ createdAt: -1 });
    return res.json(updates);
  } catch (err) {
    console.log("Error in Get ConstuctionUpdates: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const createConstructionUpdate = async (req, res) => {
  try {
    const count = await ConstructionUpdate.countDocuments();

    if (count >= 10) {
      return res.status(400).json({ message: "Maximum 10 updates allowed" });
    }

    const update = await ConstructionUpdate.create({
      label: req.body.label,
      description: req.body.description,
      progress: req.body.progress,
      image: req.file
        ? {
            url: req.file.path,
            public_id: req.file.filename,
          }
        : undefined,
    });

    return res.status(201).json(update);
  } catch (err) {
    console.log("Error in Create ConstuctionUpdates: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const updateConstructionUpdate = async (req, res) => {
  try {
    const update = await ConstructionUpdate.findById(req.params.id);

    if (!update) {
      return res.status(404).json({ message: "Update not found" });
    }

    if (req.file) {
      if (update.image?.public_id) {
        await cloudinary.uploader.destroy(update.image.public_id);
      }

      update.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    update.label = req.body.label;
    update.description = req.body.description;
    update.progress = req.body.progress;

    await update.save();

    return res.json(update);
  } catch (err) {
    console.log("Error in Update ConstuctionUpdates: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteConstructionUpdate = async (req, res) => {
  try {
    const update = await ConstructionUpdate.findById(req.params.id);

    if (update) {
      if (update.image?.public_id) {
        await cloudinary.uploader.destroy(update.image.public_id);
      }

      await update.deleteOne();
    }

    return res.json({ message: "Construction update deleted" });
  } catch (err) {
    console.log("Error in Delete ConstuctionUpdates: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};
