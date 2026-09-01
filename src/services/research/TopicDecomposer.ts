import { ResearchSubQuestion } from '../../types/research.js';

export class TopicDecomposer {
  public static decompose(seedTopic: string): ResearchSubQuestion[] {
    const cleanTopic = seedTopic.trim().toLowerCase();

    const baseQuestions: ResearchSubQuestion[] = [
      {
        id: 'q-meta-specs',
        category: 'META_API',
        question: `Quais são os requisitos técnicos obrigatórios de schema (Atom/XML) para publicação no Meta Automotive Inventory Ads (DAA)?`,
        targetSources: ['Meta Business Graph API Docs', 'Meta Automotive Schema Reference'],
      },
      {
        id: 'q-dms-formats',
        category: 'DMS_TAGS',
        question: `Como os integradores DMS brasileiros (AutoCerto, Altimus, Sisvag, BomControle) estruturam suas tags de preço, fotos e especificações de veículos?`,
        targetSources: ['AutoCerto XML Spec', 'Altimus Hub API Guide', 'Sisvag Manual de Integração'],
      },
      {
        id: 'q-market-metrics',
        category: 'MARKET_BENCHMARK',
        question: `Quais são as métricas reais de redução de CPL (Custo por Lead) e aumento de CTR com catálogo dinâmico em relação a anúncios estáticos?`,
        targetSources: ['Fenabrave Digital', 'Webmotors Insights', 'Meta Case Studies Brasil'],
      },
      {
        id: 'q-dealership-pains',
        category: 'LEAD_CONVERSION',
        question: `Quais os impactos financeiros e operacionais de anunciar veículos já vendidos ou com fotos de baixa resolução nas redes sociais?`,
        targetSources: ['Pesquisas de Satisfação de Lojistas', 'Benchmarks de Conversão de WhatsApp'],
      },
      {
        id: 'q-seo-intent',
        category: 'SEO_INTENT',
        question: `Quais palavras-chave de busca orgânica e intenções de busca transacionais donos de concessionárias e analistas de tráfego pesquisam sobre "${cleanTopic}"?`,
        targetSources: ['Google Search Trends Automotivo', 'Semrush / Ahrefs Automotive Keywords'],
      },
    ];

    return baseQuestions;
  }
}
