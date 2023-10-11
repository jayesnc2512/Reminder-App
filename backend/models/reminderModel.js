import mongoose from "mongoose";
const reminderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    time: {
        type: String,
        required: true
    },
    Phone2: {
        type: String,

    },
    Phone1: {
        type: String,
    },
    isEmail: {
        type: Boolean,
        default:true
    },
    isWhatsapp: {
        type: Boolean,
        default: true

    },
    isSMS: {
        type: Boolean,
        default: true

    },
    isCall: {
        type: Boolean,
        default: true
    }
})
export default mongoose.model('reminders', reminderSchema);