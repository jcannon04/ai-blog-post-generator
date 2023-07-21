import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    excerpt: {
        type: String,
    },
    content: {
        type: String,

    },
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema)
