import { Router } from "express";
import crudController from "../utils/crudController.js";
import crudRoutes from "../utils/crudRoutes.js";
import Skill from "../models/skill.model.js";
import Machine from "../models/machine.model.js";
import Lab from "../models/lab.model.js";
import Certification from "../models/certification.model.js";
import Social from "../models/social.model.js";
import Contact from "../models/contact.model.js";
import Writeup from "../models/writeup.model.js";

const router = Router();

router.use("/skills", crudRoutes(crudController(Skill)));
router.use("/machines", crudRoutes(crudController(Machine)));
router.use("/labs", crudRoutes(crudController(Lab)));
router.use("/certifications", crudRoutes(crudController(Certification)));
router.use("/socials", crudRoutes(crudController(Social)));
router.use("/contact", crudRoutes(crudController(Contact)));
router.use("/writeups", crudRoutes(crudController(Writeup)));

export default router;
