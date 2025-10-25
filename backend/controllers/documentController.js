import Document from "../models/Document.js"

export const createDocument = async(req, res) => {
    try {
        const doc = new Document({ title: req.body.title || "Untitled Document" })
        await doc.save()
        res.status(201).json(doc)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getDocument = async(req, res) => {
    try {
        const doc = await Document.findById(req.params.id)
        if (!doc) return res.status(404).json({ error: "Document not found" })
        res.json(doc)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateDocument = async(req, res) => {
    try {
        const doc = await Document.findById(req.params.id)
        if (!doc) return res.status(404).json({ error: "Document not found" })

        if (doc.content !== req.body.content) {
            doc.versions.push({ content: doc.content })
        }

        doc.content = req.body.content
        await doc.save()

        res.json({ message: "Document updated", doc })
    } catch (error) {
        console.error("Update error:", error)
        res.status(500).json({ error: error.message })
    }
}


export const getVersions = async(req, res) => {
    try {
        const doc = await Document.findById(req.params.id)
        if (!doc) return res.status(404).json({ error: "Document not found" })
        res.json(doc.versions)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}