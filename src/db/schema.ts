import mongoose from "mongoose";

const studentSchema =  new mongoose.Schema({
    RollNo: { type: String, required: true },
    Name: { type: String, required: true },
    Branch: { type: String, required: true },
    Batch: { type: Number, required: true },
    Resume: { type: String, required: true },
    Email: { type: String, required: true },
    LinkedIn: { type: String, required:false },
    lastModified: { type: Date, default: Date.now }
})
const Student = mongoose.model("space", studentSchema);

export { Student }