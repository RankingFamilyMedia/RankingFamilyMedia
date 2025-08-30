
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Note: The API key is defined in an environment variable.
// For Google AI (Gemini), this is GOOGLE_API_KEY
// For other providers, this will be different.
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
});

    