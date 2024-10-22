import { Category } from "../models/category.model.js";

// Add new category
const addNew = async (req, res) => {
  const { name, imageUrl, navDisplay, description } = req.body;
  try {
    const category = await Category.addNew(
      name,
      imageUrl,
      navDisplay,
      description
    );
    res.status(200).json({ message: "Category added", category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Fetch all categories
const fetchAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ message: "Categories fetched", categories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete a category
const deleteCat = async (req, res) => {
  const { id } = req.body;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted Successfully", category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Update a category
const updateCat = async (req, res) => {
  const { id, name, imageUrl, navDisplay, description } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        imageUrl,
        navDisplay,
        description,
      },
      { new: true }
    );
    res.status(200).json({ message: "Updated Successfully", category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { addNew, fetchAll, deleteCat, updateCat };
