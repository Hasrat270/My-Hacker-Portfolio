import { Router } from "express";
import protect from "../middleware/protect.js";

export default function crudRoutes(controller) {
  const router = Router();

  // Public — portfolio dekhne ke liye
  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);

  // Protected — sirf admin CRUD kar sake
  router.post("/", protect, controller.create);
  router.put("/:id", protect, controller.update);
  router.delete("/:id", protect, controller.remove);

  return router;
}
