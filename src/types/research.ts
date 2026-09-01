import { z } from 'zod';

export interface ResearchSubQuestion {
  id: string;
  category: 'META_API' | 'DMS_TAGS' | 'MARKET_BENCHMARK' | 'LEAD_CONVERSION' | 'SEO_INTENT';
  question: string;
  targetSources: string[];
}

export interface FactualFinding {
  topic: string;
  fact: string;
  evidence: string;
  source: string;
  technicalConfidence: number; // 0 - 100
}

export interface MarketStatistic {
  metric: string;
  value: string;
  context: string;
  source: string;
  year: number;
}

export interface XmlTechnicalSpec {
  metaField: string;
  description: string;
  required: boolean;
  formatValidation: string;
  dmsMappingExample: {
    autocerto: string;
    altimus: string;
    sisvag: string;
  };
  commonPitfall: string;
}

export interface PainPointSolution {
  painPoint: string;
  businessImpact: string;
  autoCatalogoSolution: string;
}

export interface AuthorityQuote {
  author: string;
  role: string;
  organization: string;
  quote: string;
}

export interface ResearchDossier {
  id: string;
  seedTopic: string;
  targetKeyword: string;
  investigationDate: string;
  coreHypothesis: string;
  subQuestions: ResearchSubQuestion[];
  findings: FactualFinding[];
  verifiedStatistics: MarketStatistic[];
  xmlSpecs: XmlTechnicalSpec[];
  painPointsAndSolutions: PainPointSolution[];
  authorityQuotes: AuthorityQuote[];
  recommendedArticleStructure: {
    titleProposal: string;
    targetWordCount: number;
    recommendedHeadings: string[];
    suggestedTable: string;
    callToActionFocus: string;
  };
}

export const ResearchDossierSchema = z.object({
  id: z.string(),
  seedTopic: z.string(),
  targetKeyword: z.string(),
  investigationDate: z.string(),
  coreHypothesis: z.string(),
  subQuestions: z.array(
    z.object({
      id: z.string(),
      category: z.enum(['META_API', 'DMS_TAGS', 'MARKET_BENCHMARK', 'LEAD_CONVERSION', 'SEO_INTENT']),
      question: z.string(),
      targetSources: z.array(z.string()),
    })
  ),
  findings: z.array(
    z.object({
      topic: z.string(),
      fact: z.string(),
      evidence: z.string(),
      source: z.string(),
      technicalConfidence: z.number().min(0).max(100),
    })
  ),
  verifiedStatistics: z.array(
    z.object({
      metric: z.string(),
      value: z.string(),
      context: z.string(),
      source: z.string(),
      year: z.number(),
    })
  ),
  xmlSpecs: z.array(
    z.object({
      metaField: z.string(),
      description: z.string(),
      required: z.boolean(),
      formatValidation: z.string(),
      dmsMappingExample: z.object({
        autocerto: z.string(),
        altimus: z.string(),
        sisvag: z.string(),
      }),
      commonPitfall: z.string(),
    })
  ),
  painPointsAndSolutions: z.array(
    z.object({
      painPoint: z.string(),
      businessImpact: z.string(),
      autoCatalogoSolution: z.string(),
    })
  ),
  authorityQuotes: z.array(
    z.object({
      author: z.string(),
      role: z.string(),
      organization: z.string(),
      quote: z.string(),
    })
  ),
  recommendedArticleStructure: z.object({
    titleProposal: z.string(),
    targetWordCount: z.number(),
    recommendedHeadings: z.array(z.string()),
    suggestedTable: z.string(),
    callToActionFocus: z.string(),
  }),
});
