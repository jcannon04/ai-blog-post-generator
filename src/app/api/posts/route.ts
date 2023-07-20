import { NextResponse } from "next/server";
import Blog from "../../db/models/blog";
import mongoose from "mongoose";

export async function GET(request: any) {
    const uri = process.env.MONGO_URI || '';
    try {
        await mongoose.connect(uri);
        let posts = await Blog.find({});
        await mongoose.disconnect();

        return NextResponse.json(posts);
    } catch (error : any) {
        console.log(error.message)
        return NextResponse.error();
    }

}

export async function POST(request: Request) {
    const uri = process.env.MONGO_URI || '';
    try {
        const { title, content, excerpt } = await request.json();
        await mongoose.connect(uri);
        let post = await Blog.create({ title, content, excerpt });
        await mongoose.disconnect();

        return NextResponse.json(post);

    } catch (error) {
        return NextResponse.error();
    }

}