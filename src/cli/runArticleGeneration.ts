import { ContentPipelineOrchestrator } from '../services/pipeline/ContentPipelineOrchestrator.js';

async function main() {
  const args = process.argv.slice(2);
  let topic = 'Como Anunciar Carros no Instagram com Feed XML e Meta Automotive Ads';

  const topicArgIdx = args.findIndex((a) => a === '--topic' || a === '-t');
  if (topicArgIdx !== -1 && args[topicArgIdx + 1]) {
    topic = args[topicArgIdx + 1];
  }

  console.log(`\n🚀 [Auto Catálogo AI Pipeline] Iniciando pipeline autônomo completo...`);
  console.log(`📌 Tema: "${topic}"`);
  console.log(`🤖 Modelo de Redação: Gemini 2.5 Flash\n`);

  const orchestrator = new ContentPipelineOrchestrator();
  const result = await orchestrator.runFullPipeline(topic);

  console.log(`✅ [Fase 1: Deep Research] Dossiê ${result.dossier.id} gerado.`);
  console.log(`✅ [Fase 2: Redação Gemini] Artigo gerado com ${result.article.seo.wordCount} palavras.`);
  console.log(`✅ [Otimização SEO] Score: ${result.article.seo.seoScore}/100 | Slug: /${result.article.slug}`);
  console.log(`✅ [Schema.org JSON-LD] Payloads 'Article' e 'FAQPage' validados.`);

  console.log(`\n📁 Arquivos Salvos em:`);
  console.log(`   - Artigo Markdown: ${result.markdownPath}`);
  console.log(`   - Payload JSON: ${result.jsonPath}`);
  console.log(`\n🎉 Pipeline finalizado com sucesso! Artigo pronto para moderação no Backoffice Super Admin.\n`);
}

main().catch((err) => {
  console.error('❌ Erro no pipeline de conteúdo:', err);
  process.exit(1);
});
