import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const thoughtsDirectory = path.join(process.cwd(), 'public/thoughts-content');

export type ThoughtMeta = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
  featured: boolean;
  image: string;
  author: string;
  lang: string;
};

export type Thought = ThoughtMeta & {
  content: string;
};

// Helper function to convert title to slug if not explicitly provided
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
    .trim();
}

// Helper function to get sorted thoughts data
export function getSortedThoughtsData(language: string = 'en'): ThoughtMeta[] {
  // Get file names under /thoughts-content
  const fileNames = fs.readdirSync(thoughtsDirectory);
  
  const allThoughtsData = fileNames
    .filter(fileName => {
      // Only process files for the specified language (en.md or ar.md)
      if (language === 'en') {
        return fileName.endsWith('.md') && !fileName.endsWith('.ar.md');
      } else if (language === 'ar') {
        return fileName.endsWith('.ar.md');
      }
      return false;
    })
    .map(fileName => {
      // Read markdown file as string
      const fullPath = path.join(thoughtsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the thought metadata section
      const matterResult = matter(fileContents);

      // Use title to create slug if not provided
      const slug = matterResult.data.slug || createSlug(matterResult.data.title);

      // Combine the data with the id
      return {
        id: matterResult.data.id,
        slug,
        title: matterResult.data.title,
        excerpt: matterResult.data.excerpt,
        date: matterResult.data.date,
        category: matterResult.data.category,
        readTime: matterResult.data.readTime,
        featured: matterResult.data.featured,
        image: matterResult.data.image,
        author: matterResult.data.author,
        lang: matterResult.data.lang || language,
      } as ThoughtMeta;
    });

  // Sort thoughts by date
  return allThoughtsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get all thought categories
export function getAllThoughtCategories(language: string = 'en'): string[] {
  const thoughts = getSortedThoughtsData(language);
  const categories = new Set(thoughts.map(thought => thought.category));
  return Array.from(categories);
}

// Get featured thoughts
export function getFeaturedThoughts(language: string = 'en'): ThoughtMeta[] {
  const thoughts = getSortedThoughtsData(language);
  return thoughts.filter(thought => thought.featured);
}

// Get thoughts by category
export function getThoughtsByCategory(category: string, language: string = 'en'): ThoughtMeta[] {
  const thoughts = getSortedThoughtsData(language);
  return thoughts.filter(thought => thought.category === category);
}

// Get thought by slug
export async function getThoughtBySlug(slug: string, language: string = 'en'): Promise<Thought | null> {
  // Get all thoughts
  const thoughts = getSortedThoughtsData(language);
  
  // Find thought with matching slug
  const thought = thoughts.find(t => t.slug === slug);
  
  if (!thought) {
    return null;
  }
  
  // Find the correct file for this thought
  const fileNames = fs.readdirSync(thoughtsDirectory);
  let fileName: string | undefined;
  
  if (language === 'en') {
    fileName = fileNames.find(
      fn => !fn.endsWith('.ar.md') && fn.endsWith('.md') && matter(fs.readFileSync(path.join(thoughtsDirectory, fn), 'utf8')).data.id === thought.id
    );
  } else if (language === 'ar') {
    fileName = fileNames.find(
      fn => fn.endsWith('.ar.md') && matter(fs.readFileSync(path.join(thoughtsDirectory, fn), 'utf8')).data.id === thought.id
    );
  }
  
  if (!fileName) {
    return null;
  }
  
  // Read the file content
  const fullPath = path.join(thoughtsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the thought metadata section
  const matterResult = matter(fileContents);
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();
  
  // Combine the data with the id and contentHtml
  return {
    ...thought,
    content: matterResult.content, // Return raw markdown content instead of HTML
  };
}

// Get thought by ID (keeping for backwards compatibility)
export async function getThoughtData(id: string, language: string = 'en'): Promise<Thought | null> {
  // Find the correct file
  const fileNames = fs.readdirSync(thoughtsDirectory);
  let fileName: string | undefined;
  
  if (language === 'en') {
    fileName = fileNames.find(
      fn => !fn.endsWith('.ar.md') && fn.endsWith('.md') && matter(fs.readFileSync(path.join(thoughtsDirectory, fn), 'utf8')).data.id === id
    );
  } else if (language === 'ar') {
    fileName = fileNames.find(
      fn => fn.endsWith('.ar.md') && matter(fs.readFileSync(path.join(thoughtsDirectory, fn), 'utf8')).data.id === id
    );
  }
  
  if (!fileName) {
    return null;
  }
  
  const fullPath = path.join(thoughtsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the thought metadata section
  const matterResult = matter(fileContents);
  
  // Get slug or create from title
  const slug = matterResult.data.slug || createSlug(matterResult.data.title);
  
  // Return raw markdown content
  return {
    id: matterResult.data.id,
    slug,
    title: matterResult.data.title,
    excerpt: matterResult.data.excerpt,
    date: matterResult.data.date,
    category: matterResult.data.category,
    readTime: matterResult.data.readTime,
    featured: matterResult.data.featured,
    image: matterResult.data.image,
    author: matterResult.data.author,
    lang: matterResult.data.lang || language,
    content: matterResult.content, // Return raw markdown content
  };
}

// Get related thoughts
export function getRelatedThoughts(slug: string, category: string, language: string = 'en', limit: number = 3): ThoughtMeta[] {
  const thoughts = getSortedThoughtsData(language);
  
  // Get thoughts from the same category, excluding the current one
  return thoughts
    .filter(thought => thought.category === category && thought.slug !== slug)
    .slice(0, limit);
}

// Get next and previous thoughts
export function getAdjacentThoughts(slug: string, language: string = 'en'): { 
  previous: ThoughtMeta | null; 
  next: ThoughtMeta | null; 
} {
  const thoughts = getSortedThoughtsData(language);
  const currentIndex = thoughts.findIndex(thought => thought.slug === slug);
  
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }
  
  // Previous is the one after in the array (since we sort by date descending)
  const previous = currentIndex < thoughts.length - 1 ? thoughts[currentIndex + 1] : null;
  
  // Next is the one before in the array
  const next = currentIndex > 0 ? thoughts[currentIndex - 1] : null;
  
  return { previous, next };
} 