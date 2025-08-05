import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Get current date in YYYY-MM-DD format
const today = new Date().toISOString().slice(0, 10);

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: today, // Always use current date
    useCdn: true, 
    token: process.env.REACT_APP_SANITY_API_TOKEN,
});



const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);