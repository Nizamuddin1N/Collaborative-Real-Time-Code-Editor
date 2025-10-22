import express from "express"
import { createDocument, getDocument, updateDocument, getVersions } from "../controllers/documentController.js"

const router = express.Router()

router.post("/", createDocument)
router.get("/:id", getDocument)
router.put("/:id", updateDocument)
router.get("/:id/versions", getVersions)

export default router