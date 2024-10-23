import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  navDisplay: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
});
// static method to insert new categories
categorySchema.statics.addNew = async function (
  name,
  imageUrl,
  navDisplay,
  description
) {
  if (!name || !imageUrl || !description) {
    throw Error("Please fill required fields");
  }
  const match = await this.findOne({ name });
  if (match) throw Error("Another Category with same name exists");
  const category = await this.create({
    name,
    imageUrl,
    navDisplay,
    description,
  });
  return category;
};

export const Category = mongoose.model("Category", categorySchema);
