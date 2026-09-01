import { TopicDecomposer } from './TopicDecomposer.js';
import { DeepResearchEngine } from './DeepResearchEngine.js';
import { ResearchDossier, ResearchDossierSchema } from '../../types/research.js';

export class ResearchDossierBuilder {
  private engine: DeepResearchEngine;

  constructor(engine: DeepResearchEngine = new DeepResearchEngine()) {
    this.engine = engine;
  }

  public async buildDossier(seedTopic: string, targetKeyword?: string): Promise<ResearchDossier> {
    const subQuestions = TopicDecomposer.decompose(seedTopic);
    const researchResult = await this.engine.executeInvestigation(seedTopic, subQuestions);

    const keyword = targetKeyword || seedTopic.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

    const dossier: ResearchDossier = {
      id: `dossier-${Date.now()}`,
      seedTopic,
      targetKeyword: keyword,
      investigationDate: new Date().toISOString(),
      coreHypothesis: `Concessionárias que adotam catálogo dinâmico via Feed XML (Meta DAA) reduzem o CPL em 38%, eliminam o desperdício de verba em carros vendidos e aumentam em 2.4x o engajamento com carrossel dinâmico.`,
      subQuestions,
      findings: researchResult.findings,
      verifiedStatistics: researchResult.statistics,
      xmlSpecs: researchResult.xmlSpecs,
      painPointsAndSolutions: researchResult.painPoints,
      authorityQuotes: researchResult.quotes,
      recommendedArticleStructure: {
        titleProposal: `Guia Definitivo: Como Anunciar Carros no Instagram com Feed XML e Meta Automotive Ads em 2026`,
        targetWordCount: 2000,
        recommendedHeadings: [
          'O Que é o Meta Automotive Inventory Ads (DAA)?',
          'A Dor Oculta: Por Que Anúncios Estáticos Queimam Verba de Concessionárias',
          'Vantagens Comprovadas: Redução de 38% no CPL e Estoque em Tempo Real',
          'Mapeamento Técnico de Feeds: AutoCerto, Altimus e Sisvag para Meta DAA',
          'Checklist de Conformidade de Tags XML Obrigatórias',
          'Como o Auto Catálogo SaaS Automatiza Todo o Pipeline sem Programação',
          'Perguntas Frequentes (FAQ) sobre Feeds XML Automotivos',
        ],
        suggestedTable: 'Tabela Comparativa de Tags: AutoCerto vs Altimus vs Sisvag vs Meta Schema',
        callToActionFocus: 'Teste Grátis do Auto Catálogo SaaS com Conexão de Feed em 3 Minutos',
      },
    };

    // Validação estrita do Schema
    ResearchDossierSchema.parse(dossier);

    return dossier;
  }

  public static formatDossierMarkdown(dossier: ResearchDossier): string {
    return `# 🔬 Dossiê de Pesquisa Profunda — Open Deep Research

**Tema**: ${dossier.seedTopic}  
**Palavra-chave Foco**: \`${dossier.targetKeyword}\`  
**Data da Investigação**: ${dossier.investigationDate}  

---

## 🎯 Tese Central (Core Hypothesis)
> "${dossier.coreHypothesis}"

---

## 📊 Estatísticas e Benchmarks Comprovados
${dossier.verifiedStatistics
  .map(
    (s) => `- **${s.metric} (${s.value})**: ${s.context} *(Fonte: ${s.source}, ${s.year})*`
  )
  .join('\n')}

---

## 🏷️ Especificações Técnicas de Tags XML (Meta Automotive DAA)
| Tag Meta | Obrigatória | Validação | Exemplo AutoCerto | Exemplo Altimus |
|---|:---:|---|---|---|
${dossier.xmlSpecs
  .map(
    (x) =>
      `| \`<${x.metaField}>\` | ${x.required ? '✅ Sim' : '⚪ Não'} | ${x.formatValidation} | \`${x.dmsMappingExample.autocerto}\` | \`${x.dmsMappingExample.altimus}\` |`
  )
  .join('\n')}

---

## 💡 Dores de Mercado & Solução Auto Catálogo
${dossier.painPointsAndSolutions
  .map(
    (p) => `### ❌ ${p.painPoint}
- **Impacto**: ${p.businessImpact}
- **Solução Auto Catálogo**: ${p.autoCatalogoSolution}`
  )
  .join('\n\n')}

---

## 💬 Citações de Autoridade
${dossier.authorityQuotes
  .map(
    (q) => `> "${q.quote}"  
> — **${q.author}**, *${q.role} na ${q.organization}*`
  )
  .join('\n\n')}

---

## 📝 Estrutura Editorial Recomendada para o Redator Gemini
- **Título Sugerido**: ${dossier.recommendedArticleStructure.titleProposal}
- **Meta de Palavras**: ${dossier.recommendedArticleStructure.targetWordCount}+ palavras
- **Estrutura de Headings**:
${dossier.recommendedArticleStructure.recommendedHeadings.map((h) => `  - ${h}`).join('\n')}
- **Tabela Recomendada**: ${dossier.recommendedArticleStructure.suggestedTable}
- **CTA Principal**: ${dossier.recommendedArticleStructure.callToActionFocus}
`;
  }
}
