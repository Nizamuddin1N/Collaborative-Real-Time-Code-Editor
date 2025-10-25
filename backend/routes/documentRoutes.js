import express from "express"
import Document from "../models/Document.js"
import { createDocument, getDocument, updateDocument, getVersions } from "../controllers/documentController.js"

const router = express.Router()


router.get("/", async(req, res) => {
    try {
        const docs = await Document.find().select("title _id updatedAt")
        res.json(docs)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
router.post("/", createDocument)
router.get("/:id", getDocument)
router.put("/:id", updateDocument)
router.get("/:id/versions", getVersions)

export default router