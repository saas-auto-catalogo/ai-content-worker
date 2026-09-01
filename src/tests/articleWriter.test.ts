import { describe, it, expect } from 'vitest';
import { ResearchDossierBuilder } from '../services/research/ResearchDossierBuilder.js';
import { GeminiArticleWriter } from '../services/writer/GeminiArticleWriter.js';
import { ContentPipelineOrchestrator } from '../services/pipeline/ContentPipelineOrchestrator.js';
import { GeneratedArticleSchema } from '../types/article.js';

describe('Gemini 2.5 Flash Article Writer & SEO Optimizer - Test Suite', () => {
  const sampleTopic = 'Como Anunciar Carros no Instagram com Feed XML e Meta Automotive Ads';

  it('deve gerar um artigo estruturado a partir de um ResearchDossier', async () => {
    const builder = new ResearchDossierBuilder();
    const dossier = await builder.buildDossier(sampleTopic);

    const writer = new GeminiArticleWriter({ modelName: 'gemini-2.5-flash' });
    const article = await writer.generateArticle(dossier);

    expect(article).toBeDefined();
    expect(article.title).toContain('Como Anunciar Carros no Instagram');
    expect(article.aiModelUsed).toBe('gemini-2.5-flash');
    expect(article.status).toBe('PENDING_APPROVAL');
    expect(article.faqList.length).toBeGreaterThanOrEqual(3);

    // Validação estrita de Schema Zod
    const validation = GeneratedArticleSchema.safeParse(article);
    expect(validation.success).toBe(true);
  });

  it('deve calcular métricas de SEO e gerar payloads Schema.org válidos', async () => {
    const builder = new ResearchDossierBuilder();
    const dossier = await builder.buildDossier(sampleTopic);

    const writer = new GeminiArticleWriter({ modelName: 'gemini-2.5-flash' });
    const article = await writer.generateArticle(dossier);

    expect(article.seo.seoScore).toBeGreaterThanOrEqual(80);
    expect(article.seo.wordCount).toBeGreaterThan(400);
    expect(article.seo.readingTimeMinutes).toBeGreaterThanOrEqual(2);
    expect(article.seo.canonicalSlug).toBe('como-anunciar-carros-no-instagram-com-feed-xml-e-meta-automotive-ads');

    // Validação Schema.org Article
    expect(article.seo.articleJsonLd['@type']).toBe('Article');
    expect(article.seo.articleJsonLd.headline).toBe(article.title);

    // Validação Schema.org FAQPage
    expect(article.seo.faqJsonLd['@type']).toBe('FAQPage');
    expect(article.seo.faqJsonLd.mainEntity.length).toBeGreaterThanOrEqual(3);
  });

  it('deve executar o pipeline autônomo completo através do ContentPipelineOrchestrator', async () => {
    const orchestrator = new ContentPipelineOrchestrator();
    const result = await orchestrator.runFullPipeline(sampleTopic);

    expect(result.dossier).toBeDefined();
    expect(result.article).toBeDefined();
    expect(result.jsonPath).toContain('.json');
    expect(result.markdownPath).toContain('.md');
    expect(result.article.contentMarkdown).toContain('Meta Automotive');
    expect(result.article.contentMarkdown).toContain('| Tag Meta |');
  });
});
