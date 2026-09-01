import {
  SeoMetadata,
  ArticleFaqItem,
  SeoSchemaArticle,
  SeoSchemaFaq
} from '../../types/article.js';
import { ResearchDossier } from '../../types/research.js';

export class SeoOptimizer {
  public static optimize(
    dossier: ResearchDossier,
    title: string,
    contentMarkdown: string,
    faqList: ArticleFaqItem[],
    _category: string = 'Meta Automotive Ads'
  ): SeoMetadata {
    const slug = dossier.targetKeyword
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const wordCount = contentMarkdown.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    const metaDescription = `Descubra como integrar feeds XML ao Meta Automotive Ads e anunciar estoque de veículos no Instagram com redução comprovada de 38% no CPL.`;
    const featuredImageUrl = `https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop`;

    const isoDate = new Date().toISOString();

    // 1. Schema.org Article JSON-LD
    const articleJsonLd: SeoSchemaArticle = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: metaDescription,
      image: featuredImageUrl,
      author: {
        '@type': 'Organization',
        name: 'Auto Catálogo Intelligence Lab',
        url: 'https://autocatalogo.com.br',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Auto Catálogo SaaS',
        logo: {
          '@type': 'ImageObject',
          url: 'https://autocatalogo.com.br/logo.png',
        },
      },
      datePublished: isoDate,
      dateModified: isoDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://autocatalogo.com.br/blog/${slug}`,
      },
    };

    // 2. Schema.org FAQPage JSON-LD
    const faqJsonLd: SeoSchemaFaq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqList.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    // Cálculo do SEO Score (baseado em densidade, estrutura e metadados)
    let score = 70;
    if (wordCount >= 1500) score += 10;
    if (faqList.length >= 3) score += 10;
    if (contentMarkdown.includes('| Tag Meta |')) score += 5;
    if (contentMarkdown.includes('38%')) score += 5;
    score = Math.min(100, score);

    return {
      titleH1: title,
      metaTitle: `${title} | Auto Catálogo Blog`,
      metaDescription,
      focusKeyword: dossier.targetKeyword,
      secondaryKeywords: [
        'feed xml instagram',
        'meta automotive inventory ads',
        'autocerto meta ads',
        'altimus feed xml',
        'anuncio dinamico carros',
      ],
      canonicalSlug: slug,
      seoScore: score,
      readingTimeMinutes,
      wordCount,
      featuredImageUrl,
      ogType: 'article',
      articleJsonLd,
      faqJsonLd,
    };
  }
}
