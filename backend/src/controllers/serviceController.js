import { Service } from "../models/service.model.js";
import { Category } from "../models/category.model.js";
import mongoose from "mongoose";

// Add new service
const addNewService = async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      categoryId,
      minPrice,
      maxPrice,
      imageUrl,
      description,
      tags,
    } = req.body;

    // Check if required fields are provided
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
      return res.status(400).json({
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
    // Create new service with tags
    const newService = await Service.create({
      name,
      category: categoryId,
      minPrice,
      maxPrice,
      imageUrl,
      description,
      tags, // Store tags in the service document
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
  const { id, name, minPrice, maxPrice, imageUrl, description, tags } =
    req.body;
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
        tags, // Update tags in the service document
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
// Add a new FAQ to a service
const addFaq = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { question, answer } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    service.faqs.push({ question, answer });
    await service.save();

    res.status(201).json({
      success: true,
      message: "FAQ added successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update an existing FAQ in a service
const updateFaq = async (req, res) => {
  try {
    const { serviceId, faqId } = req.params;
    const { question, answer } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    const faq = service.faqs.id(faqId);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }

    faq.question = question;
    faq.answer = answer;
    await service.save();

    res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      service: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete an FAQ from a service
const deleteFaq = async (req, res) => {
  try {
    const { serviceId, faqId } = req.params;

    // Validate MongoDB ObjectId format
    if (
      !mongoose.Types.ObjectId.isValid(serviceId) ||
      !mongoose.Types.ObjectId.isValid(faqId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID or FAQ ID format",
      });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Check if FAQ exists
    const faq = service.faqs.id(faqId);
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found in this service",
      });
    }

    // Pull the FAQ from the array using the pull operator
    service.faqs.pull({ _id: faqId });
    await service.save();

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
      service,
    });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export {
  addNewService,
  fetchServicesByCategory,
  deleteService,
  updateService,
  addFaq,
  updateFaq,
  deleteFaq,
};
