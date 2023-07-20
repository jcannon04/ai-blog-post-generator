import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
    if (!configuration.apiKey) {
        return NextResponse.error();
      }

      let prompt = await request.json();

      const response = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
      });
      const image_url = response.data.data[0].url;

      return NextResponse.json(image_url)
}