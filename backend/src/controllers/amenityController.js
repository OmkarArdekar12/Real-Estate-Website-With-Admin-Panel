import Amenity from "../models/amenity.model.js";
import { cloudinary } from "../config/cloudinary.js";

export const getAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find();
    return res.json(amenities);
  } catch (err) {
    console.log("Error in Get Amenity: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const createAmenity = async (req, res) => {
  try {
    const count = await Amenity.countDocuments();

    if (count >= 10) {
      return res.status(400).json({ message: "Maximum 10 amenities allowed" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const amenity = await Amenity.create({
      title: req.body.title,
      description: req.body.description,
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });

    return res.status(201).json(amenity);
  } catch (err) {
    console.log("Error in Create Amenity: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const updateAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findById(req.params.id);

    if (!amenity) {
      return res.status(404).json({ message: "Amenity not found" });
    }

    if (req.file) {
      await cloudinary.uploader.destroy(amenity.image.public_id);

      amenity.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    amenity.title = req.body.title;
    amenity.description = req.body.description;

    await amenity.save();

    return res.json(amenity);
  } catch (err) {
    console.log("Error in Update Amenity: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findById(req.params.id);

    if (amenity) {
      await cloudinary.uploader.destroy(amenity.image.public_id);
      await amenity.deleteOne();
    }

    return res.json({ message: "Amenity Deleted" });
  } catch (err) {
    console.log("Error in Delete Amenity: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};
