import { NextResponse } from "next/server";
import Blog from "../../../db/models/blog";
import mongoose from "mongoose";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const uri = process.env.MONGO_URI || '';
    try {
        await mongoose.connect(uri);
        const post = await Blog.findById(id);
        await mongoose.disconnect();
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.error();
    }
}

// delete a post
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const uri = process.env.MONGO_URI || '';
    try {
        await mongoose.connect(uri);
        await Blog.findByIdAndDelete(id);
        await mongoose.disconnect();
        return NextResponse.redirect('/api/posts');
    } catch (error) {
        return NextResponse.error();
    }
}
