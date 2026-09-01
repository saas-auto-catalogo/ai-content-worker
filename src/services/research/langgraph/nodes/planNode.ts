import { ResearchState } from '../state.js';
import { TopicDecomposer } from '../../TopicDecomposer.js';

export async function planNode(state: ResearchState): Promise<Partial<ResearchState>> {
  const subQuestions = TopicDecomposer.decompose(state.seedTopic);
  const targetKeyword = state.targetKeyword || state.seedTopic.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

  return {
    subQuestions,
    targetKeyword,
    iterationCount: 0,
    isComplete: false,
  };
}
