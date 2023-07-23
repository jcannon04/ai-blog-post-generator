
"use server"

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

interface FormData {
  topic: string;
  keywords: string;
  tone: string;
  minwordcount: string;
  maxwordcount: string;
  structure: string;
  audience: string;
  related: string;
}

export const generatePost = async (formData: FormData) => {

    try {
        let prompt = generatePromptFromData(formData);
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo-16k-0613",
          messages: [
            { role: "system", content: "You are a blogger and technical writer." },
            { role: "user", content: `${prompt}` },
          ],
        });
    
        let content = completion.data.choices[0].message?.content;
        return content || '';
    
      } catch (error : any) {
        return `Error fetching data: ${error.message}`;
      }
};

function generatePromptFromData(formData: FormData) {
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
  
    let prompt = `**Blog Post Topic:** ${topic}\n`;
  
    if (keywords) {
      prompt += `**Keywords:** ${keywords}\n`;
    }
  
    if (tone) {
      prompt += `**Tone or Writing Style:** ${tone}\n`;
    }
  
    if (minwordcount || maxwordcount) {
      prompt += `**Word Count:** ${minwordcount || 0} to ${maxwordcount || 1500}\n`;
    }
  
    if (structure) {
      prompt += `**Structure or Subheadings:**\n${structure}\n`;
    }
  
    if (audience) {
      prompt += `**Target Audience:** ${audience}\n`;
    }
  
    if (related) {
      prompt += `**Related Topics or Subtopics:**\n${related}\n`;
    }
  
    // Add additional instructions or specific requirements as needed
    prompt += `\n**Instructions:** Generate a blog post or article between ${minwordcount} and ${maxwordcount} words in length on the above topic. Provide engaging content with a ${tone || 'formal'} tone. The article should be well-structured with the following subheadings: ${structure || 'Introduction, Body, Conclusion'}. Aim for original and creative content that will captivate the following potential audience: ${audience || 'blog readers'}. You may explore the related topics mentioned above to provide a comprehensive view of the subject.\n`;
  
    return prompt;
  }
