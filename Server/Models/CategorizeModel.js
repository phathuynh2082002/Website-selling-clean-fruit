import mongoose from "mongoose";

const categorizeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    }
});

const Categorize = mongoose.model('Categorize', categorizeSchema);

export default Categorize;