import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export async function generateIdea(interests, skills) {
  const prompt = `Generate a unique and innovative hackathon project idea based on these interests: ${interests}
    and these skills/technologies: ${skills}.
    
    Please provide:
    1. A detailed project idea
    2. Step-by-step implementation instructions
    
    Format the response as a JSON object with 'idea' and 'steps' fields.`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  try {
    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('Failed to parse OpenAI response:', error);
    throw error;
  }
} 