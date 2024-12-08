import mongoose, { Schema } from "mongoose";
const channelSchema = new Schema({
    channel_id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    logo_image: String,
    description: String,
    members_count: {
        type: Number,
        default: 0,
    },
    language: {
        type: String,
        default: "en",
    },
    user_id: {
        type: String,
        required: true,
    },
});
export default mongoose.model("Channel", channelSchema);
