import { Annotation } from '@langchain/langgraph';
import {
  ResearchSubQuestion,
  FactualFinding,
  MarketStatistic,
  XmlTechnicalSpec,
  PainPointSolution,
  AuthorityQuote,
  ResearchDossier
} from '../../../types/research.js';

export interface ResearchIteration {
  iterationIndex: number;
  gapIdentified: string;
  additionalQuery: string;
  resolution: string;
}

export const ResearchStateAnnotation = Annotation.Root({
  seedTopic: Annotation<string>(),
  targetKeyword: Annotation<string>(),
  subQuestions: Annotation<ResearchSubQuestion[]>({
    reducer: (curr, next) => next || curr,
    default: () => [],
  }),
  findings: Annotation<FactualFinding[]>({
    reducer: (curr, next) => [...curr, ...(next || [])],
    default: () => [],
  }),
  statistics: Annotation<MarketStatistic[]>({
    reducer: (curr, next) => next || curr,
    default: () => [],
  }),
  xmlSpecs: Annotation<XmlTechnicalSpec[]>({
    reducer: (curr, next) => next || curr,
    default: () => [],
  }),
  painPoints: Annotation<PainPointSolution[]>({
    reducer: (curr, next) => next || curr,
    default: () => [],
  }),
  quotes: Annotation<AuthorityQuote[]>({
    reducer: (curr, next) => next || curr,
    default: () => [],
  }),
  iterations: Annotation<ResearchIteration[]>({
    reducer: (curr, next) => [...curr, ...(next || [])],
    default: () => [],
  }),
  iterationCount: Annotation<number>({
    reducer: (curr, next) => (next !== undefined ? next : curr),
    default: () => 0,
  }),
  isComplete: Annotation<boolean>({
    reducer: (curr, next) => (next !== undefined ? next : curr),
    default: () => false,
  }),
  finalDossier: Annotation<ResearchDossier | null>({
    reducer: (curr, next) => next || curr,
    default: () => null,
  }),
});

export type ResearchState = typeof ResearchStateAnnotation.State;
