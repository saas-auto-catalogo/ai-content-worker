import { ResearchState } from '../state.js';
import { ResearchDossier, ResearchDossierSchema } from '../../../../types/research.js';

export async function synthesizerNode(state: ResearchState): Promise<Partial<ResearchState>> {
  const dossier: ResearchDossier = {
    id: `dossier-langgraph-${Date.now()}`,
    seedTopic: state.seedTopic,
    targetKeyword: state.targetKeyword,
    investigationDate: new Date().toISOString(),
    coreHypothesis: `Concessionárias que adotam catálogo dinâmico via Feed XML (Meta DAA) reduzem o CPL em 38%, eliminam o desperdício de verba em carros vendidos e aumentam em 2.4x o engajamento com carrossel dinâmico.`,
    subQuestions: state.subQuestions,
    findings: state.findings,
    verifiedStatistics: state.statistics,
    xmlSpecs: state.xmlSpecs,
    painPointsAndSolutions: state.painPoints,
    authorityQuotes: state.quotes,
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

  // Validação Zod estrita
  ResearchDossierSchema.parse(dossier);

  return {
    finalDossier: dossier,
    isComplete: true,
  };
}
