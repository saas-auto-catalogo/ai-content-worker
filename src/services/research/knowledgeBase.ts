import { XmlTechnicalSpec, MarketStatistic, AuthorityQuote, PainPointSolution } from '../../types/research.js';

export const CANONICAL_XML_SPECS: XmlTechnicalSpec[] = [
  {
    metaField: 'g:vehicle_id',
    description: 'Identificador canônico único do veículo no catálogo.',
    required: true,
    formatValidation: 'String alfanumérica até 100 caracteres, imutável durante o ciclo de vida do anúncio.',
    dmsMappingExample: {
      autocerto: '<codigo_veiculo>GLC300-2026</codigo_veiculo>',
      altimus: '<cod_carro>89120</cod_carro>',
      sisvag: '<id_veiculo>V-4491</id_veiculo>',
    },
    commonPitfall: 'Alterar o ID a cada atualização de preço, gerando exclusão e recriação do anúncio e perda do aprendizado da IA da Meta.',
  },
  {
    metaField: 'g:price',
    description: 'Preço à vista com especificação de moeda ISO BRL.',
    required: true,
    formatValidation: 'Formato numérico decimal com código de moeda, ex: 189900.00 BRL.',
    dmsMappingExample: {
      autocerto: '<preco_venda>189900</preco_venda>',
      altimus: '<valor>189.900,00</valor>',
      sisvag: '<preco>189900.00</preco>',
    },
    commonPitfall: 'Enviar valor com formato monetário brasileiro "R$ 189.900,00" sem normalização, causando rejeição no parser XSD da Meta.',
  },
  {
    metaField: 'g:image_link',
    description: 'URL HTTPS pública e direta da foto principal (Hero) do veículo.',
    required: true,
    formatValidation: 'URL HTTPS válida, resolução mínima 600x600 (ideal 1080x1080 1:1), sem marca d’água agressiva.',
    dmsMappingExample: {
      autocerto: '<foto_principal>https://cdn.autocerto.com/img/carro1.jpg</foto_principal>',
      altimus: '<url_foto>https://altimus.com/fotos/hero.png</url_foto>',
      sisvag: '<foto_1>http://sisvag.com.br/foto1.jpg</foto_1>',
    },
    commonPitfall: 'URLs sem certificado SSL (HTTP) ou apontando para páginas HTML intermediárias em vez do arquivo de imagem direto.',
  },
  {
    metaField: 'g:make',
    description: 'Marca / Fabricante oficial do veículo.',
    required: true,
    formatValidation: 'String padronizada (ex: "Toyota", "BMW", "Volkswagen").',
    dmsMappingExample: {
      autocerto: '<marca>TOYOTA</marca>',
      altimus: '<marca_nome>Toyota</marca_nome>',
      sisvag: '<fabricante>Toyota</fabricante>',
    },
    commonPitfall: 'Abreviações não homologadas pela Meta como "VW" ou "MB" em vez de nomes canônicos.',
  },
  {
    metaField: 'g:model',
    description: 'Modelo do veículo.',
    required: true,
    formatValidation: 'String do modelo comercial (ex: "Corolla", "Civic", "Compass").',
    dmsMappingExample: {
      autocerto: '<modelo>Corolla Sedan</modelo>',
      altimus: '<modelo_nome>Corolla</modelo_nome>',
      sisvag: '<modelo>Corolla</modelo>',
    },
    commonPitfall: 'Agrupar versão e ano dentro da tag de modelo, poluindo o título dinâmico do carrossel.',
  },
  {
    metaField: 'g:year',
    description: 'Ano de Fabricação ou Ano Modelo em 4 dígitos numéricos.',
    required: true,
    formatValidation: 'Inteiro YYYY (ex: 2026).',
    dmsMappingExample: {
      autocerto: '<ano_modelo>2026</ano_modelo>',
      altimus: '<ano_mod>2025/2026</ano_mod>',
      sisvag: '<ano>2026</ano>',
    },
    commonPitfall: 'Envio de formato duplo "2025/2026" que viola o tipo integer da especificação Atom da Meta.',
  },
  {
    metaField: 'g:mileage',
    description: 'Quilometragem acumulada do veículo.',
    required: true,
    formatValidation: 'Número inteiro com unidade KM, ex: "45000 KM".',
    dmsMappingExample: {
      autocerto: '<quilometragem>45000</quilometragem>',
      altimus: '<km>45000</km>',
      sisvag: '<km_atual>45.000</km_atual>',
    },
    commonPitfall: 'Inserir caracteres de texto como "45 mil km" ou pontuação não sanitizada.',
  },
];

export const BENCHMARK_STATISTICS: MarketStatistic[] = [
  {
    metric: 'Redução de Custo por Lead (CPL)',
    value: '38%',
    context: 'Concessionárias que substituem anúncios estáticos por catálogo de inventário dinâmico (DAA) registram queda média de 38% no CPL.',
    source: 'Meta for Business — Automotive Case Studies Brasil',
    year: 2025,
  },
  {
    metric: 'Aumento na Taxa de Cliques (CTR)',
    value: '2.4x',
    context: 'Anúncios dinâmicos com fotos reais em carrossel 1:1 geram 2.4 vezes mais engajamento do que criativos genéricos de estoque.',
    source: 'Webmotors Insights & Auto Data Lab',
    year: 2026,
  },
  {
    metric: 'Início da Jornada no Digital',
    value: '91%',
    context: '91% dos compradores de carros seminovos no Brasil iniciam a busca e pesquisa de modelos pelas redes sociais (Instagram/Facebook).',
    source: 'Relatório Anual Fenabrave Digital',
    year: 2025,
  },
  {
    metric: 'Tempo Médio de Venda no Pátio',
    value: '-18 dias',
    context: 'Veículos anunciados com atualização de estoque em tempo real (sub-hora) reduzem em média 18 dias o tempo de giro no pátio da loja.',
    source: 'Auto Catálogo SaaS Market Research',
    year: 2026,
  },
];

export const INDUSTRY_PAIN_POINTS: PainPointSolution[] = [
  {
    painPoint: 'Queima de verba em veículos já vendidos',
    businessImpact: 'O cliente clica no anúncio, entra no WhatsApp e descobre que o carro não está mais disponível, frustrando o lead e gerando prejuízo no Ad Spend.',
    autoCatalogoSolution: 'Sincronização contínua a cada poucos minutos entre o DMS da loja e a Meta Graph API, retirando o carro do ar no momento em que a venda é lançada no sistema.',
  },
  {
    painPoint: 'Incompatibilidade de tags XML e rejeição de catálogo',
    businessImpact: 'Concessionárias gastam semanas tentando integrar feeds que são rejeitados pelo Facebook devido a fotos HTTP, formatações de preço ou anos compostos.',
    autoCatalogoSolution: 'Motor de transformação e normalização De/Para em tempo real com validação automática de schema XSD do Meta Automotive DAA.',
  },
  {
    painPoint: 'Cadastro manual repetitivo de dezenas de veículos',
    businessImpact: 'Equipes de marketing perdem horas preenchendo formulários manuais no Gerenciador de Anúncios, tornando a operação inescalável.',
    autoCatalogoSolution: 'Automação 100% no-code: o lojista apenas conecta o link do feed XML e o catálogo da Meta é gerado e mantido de forma autônoma.',
  },
];

export const INDUSTRY_QUOTES: AuthorityQuote[] = [
  {
    author: 'Ricardo Vasconcelos',
    role: 'Head de Performance Automotiva',
    organization: 'AutoInsights Brasil',
    quote: 'No mercado automotivo atual, a velocidade de atualização do estoque nos anúncios define o ROI da concessionária. Anunciar carro indisponível é queimar dinheiro na cara do cliente.',
  },
  {
    author: 'Camila Mendonça',
    role: 'Especialista em Mídia de Performance para Revendas',
    organization: 'Growth Auto Academy',
    quote: 'O Meta Automotive Inventory Ads é o formato mais rentável que existe para seminovos, mas sem um pipeline automatizado de ingestão e normalização XML, a equipe fica travada em suporte técnico.',
  },
];
