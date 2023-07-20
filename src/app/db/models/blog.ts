import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    excerpt: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema)
