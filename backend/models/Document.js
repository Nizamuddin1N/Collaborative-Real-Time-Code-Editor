import mongoose from "mongoose"

const versionSchema = new mongoose.Schema({
    content: { type: String },
    timestamp: { type: Date, default: Date.now }
})

const documentSchema = new mongoose.Schema({
    title: { type: String, default: "Untitled Document" },
    content: { type: String, default: "" },
    versions: [versionSchema]
})

const Document = mongoose.model("Document", documentSchema)
export default Document