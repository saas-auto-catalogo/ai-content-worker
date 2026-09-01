import fs from 'node:fs';
import path from 'node:path';
import { ResearchDossierBuilder } from '../services/research/ResearchDossierBuilder.js';

async function main() {
  const args = process.argv.slice(2);
  let topic = 'Como Anunciar Carros no Instagram com Feed XML e Meta Automotive Ads';

  const topicArgIdx = args.findIndex((a) => a === '--topic' || a === '-t');
  if (topicArgIdx !== -1 && args[topicArgIdx + 1]) {
    topic = args[topicArgIdx + 1];
  }

  console.log(`\n🚀 [Open Deep Research Agent] Iniciando investigação profunda multi-etapa...`);
  console.log(`📌 Tema: "${topic}"\n`);

  const builder = new ResearchDossierBuilder();
  const dossier = await builder.buildDossier(topic);

  console.log(`✅ [Decomposição] 5 sub-perguntas investigadas com sucesso.`);
  console.log(`✅ [Coleta Factual] ${dossier.findings.length} evidências técnicas extraídas.`);
  console.log(`✅ [Benchmarks] ${dossier.verifiedStatistics.length} estatísticas de mercado validadas.`);
  console.log(`✅ [Schema XML] ${dossier.xmlSpecs.length} especificações canônicas mapeadas.`);
  console.log(`✅ [Dossiê Consolidado] ID: ${dossier.id}`);

  // Cria pasta dossiers se não existir
  const outputDir = path.resolve(process.cwd(), 'dossiers');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const jsonPath = path.join(outputDir, `${dossier.id}.json`);
  const mdPath = path.join(outputDir, `${dossier.id}.md`);

  fs.writeFileSync(jsonPath, JSON.stringify(dossier, null, 2), 'utf-8');
  fs.writeFileSync(mdPath, ResearchDossierBuilder.formatDossierMarkdown(dossier), 'utf-8');

  console.log(`\n📁 Arquivos do Dossiê gerados:`);
  console.log(`   - JSON: ${jsonPath}`);
  console.log(`   - Markdown: ${mdPath}`);
  console.log(`\n🎉 Investigação profunda concluída! Dossiê pronto para consumo pelo Agente Redator Gemini.\n`);
}

main().catch((err) => {
  console.error('❌ Erro durante a pesquisa profunda:', err);
  process.exit(1);
});
