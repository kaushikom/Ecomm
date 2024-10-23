import { Service } from "../models/service.model.js";
import { Category } from "../models/category.model.js";

// Add new service
const addNewService = async (req, res) => {
  try {
    const { name, categoryId, minPrice, maxPrice, imageUrl, description } =
      req.body;

    // Check if any field is empty
    if (!name || !categoryId || !minPrice || !maxPrice || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    // Validate price range
    if (minPrice < 0 || maxPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Prices cannot be negative",
      });
    }
    if (minPrice > maxPrice) {
      return res.status(400).json({
        success: false,
        message: "Minimum price cannot be greater than maximum price!",
      });
    }
    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }
    // Check if service name already exists in the same category
    const existingService = await Service.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") }, // Case-insensitive search
      category: categoryId,
    });
    if (existingService) {
      return res.status(400).json({
        success: false,
        message: "Service with this name already exists in the category",
      });
    }
    // Create new service
    const newService = await Service.create({
      name,
      category: categoryId,
      minPrice,
      maxPrice,
      imageUrl,
      description,
    });
    // Populate category details in response
    const populatedService = await Service.findById(newService._id).populate(
      "category"
    );

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: populatedService,
    });
  } catch (error) {
    console.error("Error in addNewService:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Fetch all services or by category
const fetchServicesByCategory = async (req, res) => {
  try {
    let query = {};

    // If id is provided in params, add it to query
    if (req.params.id) {
      query.category = req.params.id;
    }
    const services = await Service.find(query);
    res.status(200).json({
      success: true,
      message: services.length
        ? "Services fetched successfully"
        : "No services found",
      services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a service
// TODO : Don't delete a service with active tasks
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Service Deleted Successfully",
      data: deletedService,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update Service
const updateService = async (req, res) => {
  const { id, name, minPrice, maxPrice, imageUrl, description } = req.body;
  if (!name || !minPrice || !maxPrice || !imageUrl || !description) {
    return res
      .status(400)
      .json({ success: false, error: "Please fill the required fields" });
  }
  try {
    const service = await Service.findByIdAndUpdate(
      id,
      {
        name,
        minPrice,
        maxPrice,
        imageUrl,
        description,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Updated Successfully", service });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { addNewService, fetchServicesByCategory, deleteService, updateService };
