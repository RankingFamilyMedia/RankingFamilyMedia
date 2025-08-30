
'use server';

/**
 * @fileOverview An AI flow for analyzing the SEO of a given piece of content.
 *
 * - analyzeSeo - A function that handles the SEO analysis.
 * - SeoAnalysisInput - The input type for the analyzeSeo function.
 * - SeoAnalysis - The return type for the analyzeSeo function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SeoAnalysisInputSchema = z.object({
  content: z.string().describe('The content to be analyzed (e.g., a blog post title, a product name).'),
  keyword: z.string().describe('The target SEO keyword for the content.'),
});
export type SeoAnalysisInput = z.infer<typeof SeoAnalysisInputSchema>;

const SeoAnalysisSchema = z.object({
  score: z.number().describe('An SEO score from 0 to 100, where 100 is a perfect score.'),
  good: z.string().describe('A brief, one-sentence summary of what is good about the content\'s SEO.'),
  improvements: z.string().describe('A brief, one-sentence summary of what could be improved.'),
  suggestion: z.string().describe('A rewritten version of the content that is better optimized for the target keyword.'),
});
export type SeoAnalysis = z.infer<typeof SeoAnalysisSchema>;


export async function analyzeSeo(input: SeoAnalysisInput): Promise<SeoAnalysis> {
    return seoFlow(input);
}


const prompt = ai.definePrompt({
    name: 'seoPrompt',
    input: { schema: SeoAnalysisInputSchema },
    output: { schema: SeoAnalysisSchema },
    prompt: `You are an SEO expert specializing in the music industry.
    Analyze the following content for its effectiveness for the given SEO keyword.

    Content to analyze: {{{content}}}
    Target SEO Keyword: {{{keyword}}}

    Provide an overall score from 0-100.
    Briefly explain what is good and what could be improved.
    Provide a better, SEO-optimized version of the content as a suggestion.
    Keep your feedback concise and to the point.
    If the keyword is present, the score should be at least 75.
    If the content is catchy and includes the keyword, the score should be higher.
    `,
});


const seoFlow = ai.defineFlow(
    {
        name: 'seoFlow',
        inputSchema: SeoAnalysisInputSchema,
        outputSchema: SeoAnalysisSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);

    