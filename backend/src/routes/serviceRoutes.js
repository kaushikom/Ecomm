import express from "express";

import {
  addNewService,
  fetchServicesByCategory,
  deleteService,
  updateService,
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

export { serviceRouter };
