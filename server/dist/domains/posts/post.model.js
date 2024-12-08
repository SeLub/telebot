import mongoose, { Schema } from "mongoose";
const mediaSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["image", "video", "document", "audio"],
    },
    url: {
        type: String,
        required: true,
    },
});
const postSchema = new Schema({
    post_id: {
        type: String,
        required: true,
        unique: true,
    },
    postline_id: {
        type: String,
        required: true,
    },
    text: String,
    media: [mediaSchema],
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});
// Update timestamp on save
postSchema.pre("save", function (next) {
    this.updated_at = new Date();
    next();
});
export default mongoose.model("Post", postSchema);
