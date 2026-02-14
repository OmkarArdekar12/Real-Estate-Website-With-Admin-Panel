import mongoose from "mongoose";

const constructionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    image: {
      url: String,
      public_id: String,
    },

    progress: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true },
);

const ConstructionUpdate = mongoose.model(
  "ConstructionUpdate",
  constructionSchema,
);

export default ConstructionUpdate;
