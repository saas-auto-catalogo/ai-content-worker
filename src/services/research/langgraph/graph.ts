import { StateGraph, END, START } from '@langchain/langgraph';
import { ResearchStateAnnotation, ResearchState } from './state.js';
import { planNode } from './nodes/planNode.js';
import { researchWorkerNode } from './nodes/researchWorkerNode.js';
import { reflectionNode } from './nodes/reflectionNode.js';
import { synthesizerNode } from './nodes/synthesizerNode.js';

export function createDeepResearchGraph() {
  const workflow = new StateGraph(ResearchStateAnnotation)
    .addNode('plan', planNode)
    .addNode('researchWorker', researchWorkerNode)
    .addNode('reflection', reflectionNode)
    .addNode('synthesizer', synthesizerNode)
    .addEdge(START, 'plan')
    .addEdge('plan', 'researchWorker')
    .addEdge('researchWorker', 'reflection')
    .addConditionalEdges(
      'reflection',
      (state: ResearchState) => {
        if (state.isComplete || state.iterationCount >= 2) {
          return 'synthesize';
        }
        return 'continue';
      },
      {
        synthesize: 'synthesizer',
        continue: 'researchWorker',
      }
    )
    .addEdge('synthesizer', END);

  return workflow.compile();
}
