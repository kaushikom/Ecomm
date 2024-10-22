import express from "express";

import {
  addNew,
  fetchAll,
  deleteCat,
  updateCat,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/add", addNew);
categoryRouter.get("/fetchAll", fetchAll);
categoryRouter.post("/delete", deleteCat);
categoryRouter.put("/update", updateCat);

export { categoryRouter };
