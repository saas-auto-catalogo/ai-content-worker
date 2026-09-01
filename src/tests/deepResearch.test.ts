import { describe, it, expect } from 'vitest';
import { TopicDecomposer } from '../services/research/TopicDecomposer.js';
import { DeepResearchEngine } from '../services/research/DeepResearchEngine.js';
import { ResearchDossierBuilder } from '../services/research/ResearchDossierBuilder.js';
import { createDeepResearchGraph } from '../services/research/langgraph/graph.js';
import { ResearchDossierSchema } from '../types/research.js';

describe('Open Deep Research Agent (LangGraph & LangChain) - Test Suite', () => {
  const sampleTopic = 'Como Anunciar Carros no Instagram com Feed XML e Meta Automotive Ads';

  it('deve decompor o tema semente em sub-perguntas investigativas categorizadas', () => {
    const subQuestions = TopicDecomposer.decompose(sampleTopic);

    expect(subQuestions).toBeDefined();
    expect(subQuestions.length).toBeGreaterThanOrEqual(4);

    const categories = subQuestions.map((q) => q.category);
    expect(categories).toContain('META_API');
    expect(categories).toContain('DMS_TAGS');
    expect(categories).toContain('MARKET_BENCHMARK');
    expect(categories).toContain('LEAD_CONVERSION');
  });

  it('deve executar o StateGraph do LangGraph e extrair evidências factuais', async () => {
    const engine = new DeepResearchEngine();
    const subQuestions = TopicDecomposer.decompose(sampleTopic);
    const result = await engine.executeInvestigation(sampleTopic, subQuestions);

    expect(result.findings.length).toBeGreaterThanOrEqual(4);
    expect(result.statistics.length).toBeGreaterThanOrEqual(3);
    expect(result.xmlSpecs.length).toBeGreaterThanOrEqual(5);
    expect(result.painPoints.length).toBeGreaterThanOrEqual(2);
    expect(result.quotes.length).toBeGreaterThanOrEqual(1);

    // Valida tags canônicas
    const metaFields = result.xmlSpecs.map((s) => s.metaField);
    expect(metaFields).toContain('g:vehicle_id');
    expect(metaFields).toContain('g:price');
    expect(metaFields).toContain('g:image_link');
  });

  it('deve compilar e executar o grafo LangGraph diretamente gerando dossiê final', async () => {
    const graph = createDeepResearchGraph();
    const result = await graph.invoke({
      seedTopic: sampleTopic,
      targetKeyword: 'feed-xml-instagram-carros',
      subQuestions: [],
      findings: [],
      statistics: [],
      xmlSpecs: [],
      painPoints: [],
      quotes: [],
      iterations: [],
      iterationCount: 0,
      isComplete: false,
      finalDossier: null,
    });

    expect(result.finalDossier).toBeDefined();
    expect(result.finalDossier?.id).toContain('dossier-langgraph');
    expect(result.isComplete).toBe(true);
  });

  it('deve construir um ResearchDossier válido de acordo com o Schema Zod', async () => {
    const builder = new ResearchDossierBuilder();
    const dossier = await builder.buildDossier(sampleTopic);

    expect(dossier).toBeDefined();
    expect(dossier.seedTopic).toBe(sampleTopic);

    // Validação de Schema com Zod
    const validation = ResearchDossierSchema.safeParse(dossier);
    expect(validation.success).toBe(true);

    const hasCplStatistic = dossier.verifiedStatistics.some((s) => s.value === '38%');
    expect(hasCplStatistic).toBe(true);
  });

  it('deve formatar o dossiê em Markdown estruturado para o redator', async () => {
    const builder = new ResearchDossierBuilder();
    const dossier = await builder.buildDossier(sampleTopic);
    const markdown = ResearchDossierBuilder.formatDossierMarkdown(dossier);

    expect(markdown).toContain('# 🔬 Dossiê de Pesquisa Profunda');
    expect(markdown).toContain('## 🎯 Tese Central');
    expect(markdown).toContain('## 📊 Estatísticas e Benchmarks Comprovados');
    expect(markdown).toContain('## 🏷️ Especificações Técnicas de Tags XML');
    expect(markdown).toContain('## 📝 Estrutura Editorial Recomendada');
  });
});
