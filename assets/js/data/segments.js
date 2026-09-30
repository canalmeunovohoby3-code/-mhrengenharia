/* ==========================================================================
   MHR — Segmentos atendidos
   --------------------------------------------------------------------------
   Nenhum cliente é citado. As imagens são placeholders institucionais.
   `slug` gera a âncora do bloco na página Segmentos.
   `cta` (opcional) exibe um botão no card da página inicial.
   ========================================================================== */
(function (MHR) {
  'use strict';

  MHR.segments = [
    {
      slug: 'mineracao',
      title: 'Mineração',
      icon: 'factory',
      image: 'assets/img/segments/segmento-01.svg',
      short:
        'Montagem e manutenção eletromecânica para operações de mineração, beneficiamento mineral e infraestrutura industrial.',
      cta: { label: 'Conheça nossa atuação em mineração', href: 'segmentos/montagem-manutencao-industrial-mineracao/' },
      page: { label: 'Ver página do segmento', href: 'segmentos/montagem-manutencao-industrial-mineracao/' },
      bullets: [
        'Sistemas de transporte de minério',
        'Equipamentos de beneficiamento',
        'Paradas de manutenção programadas',
        'Caldeiraria e soldagem em campo',
      ],
    },
    {
      slug: 'agroindustria',
      title: 'Agroindústria',
      icon: 'tank',
      image: 'assets/img/segments/segmento-02.svg',
      short:
        'Montagem e manutenção industrial para silos, secadores, elevadores, transportadores, armazenagem e processamento de grãos.',
      page: { label: 'Ver página do segmento', href: 'segmentos/montagem-manutencao-industrial-agroindustria/' },
      bullets: [
        'Transportadores e elevadores',
        'Estruturas metálicas e silos',
        'Vulcanização de correias',
        'Manutenção de máquinas e equipamentos',
      ],
    },
    {
      slug: 'beneficiamento-processamento-agroindustrial',
      title: 'Beneficiamento e Processamento Agroindustrial',
      icon: 'layers',
      image: 'assets/img/segments/segmento-03.svg',
      short:
        'Serviços de montagem e manutenção para instalações de processamento e beneficiamento, conforme escopo contratado.',
      bullets: [
        'Transportadores e dutos',
        'Equipamentos de beneficiamento',
        'Fabricação e recuperação de componentes',
        'Manutenção preventiva e corretiva',
      ],
    },
    {
      slug: 'industria-em-geral',
      title: 'Indústria em Geral',
      icon: 'gear',
      image: 'assets/img/segments/segmento-04.svg',
      short:
        'Atendimento a operações industriais e processos produtivos, conforme escopo, capacidade técnica e requisitos do projeto.',
      bullets: [
        'Montagem eletromecânica e elétrica',
        'Manutenção industrial',
        'Fabricação e caldeiraria',
        'Planejamento e controle de obras',
      ],
    },
  ];
})((window.MHR = window.MHR || {}));
