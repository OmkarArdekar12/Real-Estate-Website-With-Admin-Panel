import Hero from "../models/hero.model.js";
import { cloudinary } from "../config/cloudinary.js";

export const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    return res.json(hero);
  } catch (err) {
    console.log("Error in Get Hero: ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const createOrUpdateHero = async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;

    let hero = await Hero.findOne();

    if (hero) {
      if (req.file) {
        await cloudinary.uploader.destroy(hero.image.public_id);
        hero.image = {
          url: req.file.path,
          public_id: req.file.filename,
        };
      }

      hero.title = title;
      hero.subtitle = subtitle;
      hero.description = description;

      await hero.save();

      return res.json({ message: "Hero Updated Successfully", hero });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Hero image required" });
    }

    hero = await Hero.create({
      title,
      subtitle,
      description,
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });

    return res.status(201).json({ message: "Hero Created Successfully", hero });
  } catch (error) {
    console.log("Error in Get Hero: ", err.message);
    return res.status(500).json({ message: error.message });
  }
};
