
"use server"
import IFormData from "@/types/IFormData";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generatePostImage = async (formData: IFormData) => {

    try {

      let prompt = generateDallePrompt(formData);

      const response = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
      });
      const image_url = response.data.data[0].url;

      return image_url || '';
    
      } catch (error : any) {
        console.error(error);
        return `Error fetching img: ${error.message}`;
      }
};

function generateDallePrompt(formData : IFormData) {
    const {
      topic,
      keywords,
      tone,
      minwordcount,
      maxwordcount,
      structure,
      audience,
      related,
    } = formData;
  
    // Create a detailed description of the image you want DALL-E to generate
    let imageDescription = `An image for the blog post on "${topic}".\n`;
  
    if (keywords) {
      imageDescription += `Keywords: ${keywords}\n`;
    }
  
    if (tone) {
      imageDescription += `Tone or Writing Style: ${tone}\n`;
    }
  
    if (minwordcount || maxwordcount) {
      imageDescription += `Word Count: ${minwordcount || 0} to ${maxwordcount || 1500}\n`;
    }
  
    if (structure) {
      imageDescription += `Structure or Subheadings:\n${structure}\n`;
    }
  
    if (audience) {
      imageDescription += `Target Audience: ${audience}\n`;
    }
  
    if (related) {
      imageDescription += `Related Topics or Subtopics:\n${related}\n`;
    }
  
    // Additional details or instructions for DALL-E can be added here if needed.
  
    return imageDescription;
  }
