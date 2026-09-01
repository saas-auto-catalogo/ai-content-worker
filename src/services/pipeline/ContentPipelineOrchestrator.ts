import fs from 'node:fs';
import path from 'node:path';
import { ResearchDossierBuilder } from '../research/ResearchDossierBuilder.js';
import { GeminiArticleWriter } from '../writer/GeminiArticleWriter.js';
import { GeneratedArticle, GeneratedArticleSchema } from '../../types/article.js';
import { ResearchDossier } from '../../types/research.js';

export interface PipelineExecutionResult {
  dossier: ResearchDossier;
  article: GeneratedArticle;
  jsonPath: string;
  markdownPath: string;
}

export class ContentPipelineOrchestrator {
  private dossierBuilder: ResearchDossierBuilder;
  private articleWriter: GeminiArticleWriter;

  constructor(
    dossierBuilder: ResearchDossierBuilder = new ResearchDossierBuilder(),
    articleWriter: GeminiArticleWriter = new GeminiArticleWriter()
  ) {
    this.dossierBuilder = dossierBuilder;
    this.articleWriter = articleWriter;
  }

  public async runFullPipeline(
    seedTopic: string,
    category: string = 'Meta Automotive Ads'
  ): Promise<PipelineExecutionResult> {
    // 1. Estágio 1: Open Deep Research com LangGraph
    const dossier = await this.dossierBuilder.buildDossier(seedTopic);

    // 2. Estágio 2: Redação e Otimização SEO com Gemini 2.5 Flash
    const article = await this.articleWriter.generateArticle(dossier, category);

    // Validação estrita de schema Zod
    GeneratedArticleSchema.parse(article);

    // 3. Persistência dos artefatos
    const outputDir = path.resolve(process.cwd(), 'articles');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const jsonPath = path.join(outputDir, `${article.slug}.json`);
    const markdownPath = path.join(outputDir, `${article.slug}.md`);

    fs.writeFileSync(jsonPath, JSON.stringify(article, null, 2), 'utf-8');
    fs.writeFileSync(markdownPath, article.contentMarkdown, 'utf-8');

    return {
      dossier,
      article,
      jsonPath,
      markdownPath,
    };
  }
}
