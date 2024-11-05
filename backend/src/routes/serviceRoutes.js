import express from "express";

import {
  addNewService,
  fetchServicesByCategory,
  deleteService,
  updateService,
  addFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/serviceController.js";

const serviceRouter = express.Router();
// Add new service
serviceRouter.post("/addNew", addNewService);
// Fetch all services
serviceRouter.get("/fetchByCategory", fetchServicesByCategory);
// Fetch services by category
serviceRouter.get("/fetchByCategory/:id", fetchServicesByCategory);
// Delete a service
serviceRouter.delete("/delete/:id", deleteService);
// Update service
serviceRouter.put("/update", updateService);

// FAQ routes
serviceRouter.post("/:serviceId/faqs", addFaq); // Add FAQ
serviceRouter.put("/:serviceId/faqs/:faqId", updateFaq); // Update FAQ
serviceRouter.delete("/:serviceId/faqs/:faqId", deleteFaq); // Delete FAQ

export { serviceRouter };
