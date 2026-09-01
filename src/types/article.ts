import { z } from 'zod';

export interface ArticleFaqItem {
  question: string;
  answer: string;
}

export interface SeoSchemaArticle {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  image: string;
  author: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

export interface SeoSchemaFaq {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface SeoMetadata {
  titleH1: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  canonicalSlug: string;
  seoScore: number; // 0 - 100
  readingTimeMinutes: number;
  wordCount: number;
  featuredImageUrl: string;
  ogType: string;
  articleJsonLd: SeoSchemaArticle;
  faqJsonLd: SeoSchemaFaq;
}

export interface GeneratedArticle {
  id: string;
  dossierId: string;
  title: string;
  slug: string;
  category: string;
  contentMarkdown: string;
  excerpt: string;
  faqList: ArticleFaqItem[];
  seo: SeoMetadata;
  aiModelUsed: string;
  createdAt: string;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'PUBLISHED';
}

export const GeneratedArticleSchema = z.object({
  id: z.string(),
  dossierId: z.string(),
  title: z.string(),
  slug: z.string(),
  category: z.string(),
  contentMarkdown: z.string(),
  excerpt: z.string(),
  faqList: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
  seo: z.object({
    titleH1: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    focusKeyword: z.string(),
    secondaryKeywords: z.array(z.string()),
    canonicalSlug: z.string(),
    seoScore: z.number().min(0).max(100),
    readingTimeMinutes: z.number(),
    wordCount: z.number(),
    featuredImageUrl: z.string(),
    ogType: z.string(),
    articleJsonLd: z.any(),
    faqJsonLd: z.any(),
  }),
  aiModelUsed: z.string(),
  createdAt: z.string(),
  status: z.enum(['DRAFT', 'PENDING_APPROVAL', 'PUBLISHED']),
});
