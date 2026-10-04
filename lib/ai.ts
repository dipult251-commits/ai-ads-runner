import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GenerateAdCopyRequest {
  productName: string;
  language: 'en' | 'hi';
  platform: 'facebook' | 'instagram' | 'whatsapp';
  brief?: string;
}

export interface GenerateAdCopyResponse {
  headline: string;
  description: string;
  caption: string;
  hashtags: string[];
}

export async function generateAdCopy(
  params: GenerateAdCopyRequest
): Promise<GenerateAdCopyResponse> {
  const { productName, language, platform, brief } = params;

  const languageName = language === 'hi' ? 'Hindi' : 'English';
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

  const prompt = `Generate advertising copy for a product with these specifications:
- Product: ${productName}
- Platform: ${platformName}
- Language: ${languageName}
${brief ? `- Audience Brief: ${brief}` : ''}

Provide a JSON response with these fields:
- headline: Catchy, platform-appropriate headline (max 50 chars)
- description: Product description or value proposition (max 100 chars)
- caption: Social media caption or call-to-action (max 150 chars)
- hashtags: Array of 3-5 relevant hashtags

Respond ONLY with valid JSON, no markdown or extra text.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    // Parse JSON response
    const result = JSON.parse(content);
    return {
      headline: result.headline || '',
      description: result.description || '',
      caption: result.caption || '',
      hashtags: Array.isArray(result.hashtags) ? result.hashtags : [],
    };
  } catch (error) {
    console.error('Error generating ad copy:', error);
    throw new Error('Failed to generate ad copy');
  }
}

export interface GeneratePosterRequest {
  title: string;
  theme: 'Minimal' | 'Luxury' | 'Bold' | 'Festive';
  layout: 'Square' | 'Landscape' | 'Portrait';
}

export interface GeneratePosterResponse {
  prompt: string;
  description: string;
}

export async function generatePosterConcept(
  params: GeneratePosterRequest
): Promise<GeneratePosterResponse> {
  const { title, theme, layout } = params;

  const prompt = `Create a detailed creative direction for a poster design with these specs:
- Title: ${title}
- Theme: ${theme}
- Layout: ${layout} (${layout === 'Square' ? '1:1 ratio' : layout === 'Landscape' ? '16:9 ratio' : '9:16 ratio'})

Provide JSON response with:
- prompt: A detailed image generation prompt for DALL-E or similar (150-200 words)
- description: Brief creative direction summary (50-75 words)

Respond ONLY with valid JSON, no markdown or extra text.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    const result = JSON.parse(content);
    return {
      prompt: result.prompt || '',
      description: result.description || '',
    };
  } catch (error) {
    console.error('Error generating poster concept:', error);
    throw new Error('Failed to generate poster concept');
  }
}
