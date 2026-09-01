import {
  ResearchSubQuestion,
  FactualFinding,
  MarketStatistic,
  XmlTechnicalSpec,
  PainPointSolution,
  AuthorityQuote
} from '../../types/research.js';
import { createDeepResearchGraph } from './langgraph/graph.js';

export interface DeepResearchResult {
  findings: FactualFinding[];
  statistics: MarketStatistic[];
  xmlSpecs: XmlTechnicalSpec[];
  painPoints: PainPointSolution[];
  quotes: AuthorityQuote[];
}

export class DeepResearchEngine {
  public async executeInvestigation(
    seedTopic: string,
    subQuestions: ResearchSubQuestion[]
  ): Promise<DeepResearchResult> {
    const graph = createDeepResearchGraph();

    const initialState = {
      seedTopic,
      targetKeyword: seedTopic.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim(),
      subQuestions,
      findings: [],
      statistics: [],
      xmlSpecs: [],
      painPoints: [],
      quotes: [],
      iterations: [],
      iterationCount: 0,
      isComplete: false,
      finalDossier: null,
    };

    const finalState = await graph.invoke(initialState);

    return {
      findings: finalState.findings || [],
      statistics: finalState.statistics || [],
      xmlSpecs: finalState.xmlSpecs || [],
      painPoints: finalState.painPoints || [],
      quotes: finalState.quotes || [],
    };
  }
}
