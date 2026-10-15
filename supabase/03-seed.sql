-- ==========================================================================
-- MHR — dados iniciais (seed)
-- Gerado por: node tools/export-content.mjs
-- Rode DEPOIS de 01-schema.sql e 02-storage.sql.
-- ==========================================================================

-- site
insert into public.content (site_slug, key, payload)
values ('mhrengenharia', 'site', $json${
  "name": "MHR Manutenção Industrial e Engenharia",
  "shortName": "MHR",
  "tagline": "Manutenção Industrial e Engenharia",
  "legalName": "MHR Manutenção Industrial Ltda",
  "cnpj": "69.188.438/0001-41",
  "description": "Engenharia industrial, montagem eletromecânica, manutenção industrial, caldeiraria pesada e fabricação, com sede em Varginha/MG e atuação em todo o território nacional.",
  "address": {
    "street": "Av. Dom Othon Motta, 530, Sala 01",
    "district": "Jardim Sion",
    "city": "Varginha",
    "state": "MG",
    "zip": "37.048-570",
    "country": "Brasil"
  },
  "area": {
    "region": "Todo o território nacional",
    "note": "Atuação em todo o Brasil, com mobilização conforme o projeto."
  },
  "technical": {
    "crea": "CREA/ART quando aplicável",
    "safety": "Requisitos de segurança/HSE aplicáveis ao escopo contratado."
  },
  "contact": {
    "phone": {
      "label": "(35) 3677-1560",
      "href": "tel:+553536771560"
    },
    "whatsapp": {
      "label": "(35) 3677-1560",
      "href": "https://wa.me/553536771560"
    },
    "email": {
      "label": "comercial@mhrengenharia.com",
      "href": "mailto:comercial@mhrengenharia.com"
    },
    "instagram": {
      "label": "@mhrengenharias",
      "href": "https://www.instagram.com/mhrengenharias"
    },
    "linkedin": {
      "label": "mhrengenharia",
      "href": "https://www.linkedin.com/company/mhrengenharia"
    }
  },
  "mapQuery": "Av. Dom Othon Motta, 530, Jardim Sion, Varginha - MG, 37048-570",
  "carousel": {
    "letterDelay": 55,
    "postTypingDelay": 1700,
    "respectReducedMotion": false
  },
  "nav": [
    {
      "label": "Início",
      "href": "index.html"
    },
    {
      "label": "A Empresa",
      "href": "a-empresa.html"
    },
    {
      "label": "Serviços",
      "href": "servicos.html"
    },
    {
      "label": "Segmentos",
      "href": "segmentos.html"
    },
    {
      "label": "Engenharia",
      "href": "engenharia.html"
    },
    {
      "label": "Segurança e Qualidade",
      "href": "seguranca-qualidade.html"
    },
    {
      "label": "Contato",
      "href": "contato.html"
    }
  ],
  "cta": {
    "label": "Solicitar Orçamento",
    "href": "contato.html"
  },
  "socials": [
    {
      "key": "whatsapp",
      "label": "WhatsApp",
      "icon": "whatsapp"
    },
    {
      "key": "instagram",
      "label": "Instagram",
      "icon": "instagram"
    },
    {
      "key": "linkedin",
      "label": "LinkedIn",
      "icon": "linkedin"
    },
    {
      "key": "email",
      "label": "E-mail",
      "icon": "mail"
    }
  ]
}$json$::jsonb)
on conflict (site_slug, key) do nothing;

-- banners
insert into public.content (site_slug, key, payload)
values ('mhrengenharia', 'banners', $json$[
  {
    "image": "assets/img/banners/banner-01.jpg",
    "alt": "Equipe de manutenção trabalhando em equipamento industrial de grande porte, sobre plataforma de acesso.",
    "eyebrow": "Engenharia Industrial",
    "title": "Montagem e Manutenção Eletromecânica para Mineração e Agroindústria",
    "text": "A MHR Engenharia executa montagem eletromecânica, manutenção industrial, paradas programadas, caldeiraria, fabricação e serviços de engenharia para mineração, beneficiamento mineral, armazenagem e processamento de grãos, com atuação em todo o Brasil.",
    "cta": {
      "label": "Solicitar orçamento",
      "href": "contato.html"
    },
    "ctaAlt": {
      "label": "Conhecer serviços",
      "href": "servicos.html"
    }
  },
  {
    "image": "assets/img/banners/banner-02.jpg",
    "alt": "Dois profissionais de manutenção industrial com capacete e óculos de proteção, em ambiente fabril.",
    "eyebrow": "Montagem e Fabricação",
    "title": "Montagem, fabricação e manutenção industrial",
    "text": "Montagem eletromecânica, elétrica e instrumentação, caldeiraria pesada e soldagem com equipe própria e multidisciplinar.",
    "cta": {
      "label": "Ver serviços",
      "href": "servicos.html"
    }
  },
  {
    "image": "assets/img/banners/banner-03.jpg",
    "alt": "Capacete de segurança sobre plantas e desenhos técnicos, com obra ao fundo.",
    "eyebrow": "Projetos de Alta Exigência",
    "title": "Experiência técnica para projetos de alta exigência",
    "text": "Planejamento, execução, controle e entrega com responsabilidade técnica e CREA/ART quando aplicável.",
    "cta": {
      "label": "Falar com a MHR",
      "href": "contato.html"
    },
    "ctaAlt": {
      "label": "Engenharia e planejamento",
      "href": "engenharia.html"
    }
  }
]$json$::jsonb)
on conflict (site_slug, key) do nothing;

-- services
insert into public.content (site_slug, key, payload)
values ('mhrengenharia', 'services', $json$[
  {
    "slug": "montagem-eletromecanica",
    "title": "Montagem Eletromecânica Industrial",
    "icon": "layers",
    "image": "assets/img/services/servico-01.jpg",
    "imageAlt": "Montagem de transportador de correia com estrutura metálica em campo.",
    "short": "Montagem e integração de equipamentos e sistemas industriais, incluindo montagem mecânica, interfaces entre equipamentos e integração de sistemas conforme o escopo do projeto.",
    "applications": "plantas de mineração, beneficiamento, infraestrutura industrial e instalações agroindustriais.",
    "scope": "Montagem e integração de equipamentos e sistemas industriais, com equipe multidisciplinar atuando de forma integrada com o planejamento da obra e com as demais disciplinas do projeto.",
    "bullets": [
      "Montagem de equipamentos e conjuntos mecânicos",
      "Alinhamento, nivelação e integração de sistemas",
      "Interfaces com montagem elétrica e instrumentação",
      "Acompanhamento de testes e partida assistida"
    ],
    "featured": true
  },
  {
    "slug": "montagem-eletrica-instrumentacao",
    "title": "Montagem Elétrica e Instrumentação Industrial",
    "icon": "bolt",
    "image": "assets/img/services/servico-02.jpg",
    "imageAlt": "Técnico testando os contatos de um painel elétrico com multímetro.",
    "short": "Execução de instalações elétricas, montagem de painéis e comandos, lançamento e organização de cabos, instrumentação e serviços de campo conforme projeto e escopo contratado.",
    "scope": "Execução de instalações elétricas e sistemas de instrumentação industrial, com organização de circuitos, identificação e rastreabilidade dos pontos executados.",
    "bullets": [
      "Lançamento de cabos e infraestrutura elétrica",
      "Instalação de painéis, quadros e comandos",
      "Instrumentação e interligação de campo",
      "Identificação, testes e organização de circuitos"
    ],
    "featured": true
  },
  {
    "slug": "manutencao-industrial",
    "title": "Manutenção Industrial",
    "icon": "wrench",
    "image": "assets/img/services/servico-03.jpg",
    "imageAlt": "Planta industrial com guindaste, estruturas metálicas e tubulações durante serviços de manutenção e montagem.",
    "short": "Manutenção preventiva e corretiva para equipamentos e instalações industriais.",
    "scope": "Manutenção preventiva e corretiva para equipamentos e instalações industriais, com foco em disponibilidade, confiabilidade e continuidade operacional.",
    "bullets": [
      "Manutenção preventiva programada",
      "Manutenção corretiva e atendimento a falhas",
      "Diagnóstico e recuperação de conjuntos mecânicos",
      "Registros e histórico de intervenções"
    ],
    "featured": true
  },
  {
    "slug": "paradas-de-manutencao",
    "title": "Paradas de Manutenção",
    "icon": "clock",
    "image": "assets/img/services/servico-04.jpg",
    "imageAlt": "Equipamento rotativo de grande porte com flanges parafusados e plataformas de acesso durante parada de manutenção.",
    "page": {
      "label": "Ver página do serviço",
      "href": "servicos/paradas-de-manutencao-industrial/"
    },
    "short": "Planejamento e execução de serviços durante paradas industriais.",
    "scope": "Planejamento e execução de serviços durante paradas industriais, mobilizando equipes e recursos para cumprir a janela de parada com segurança e controle.",
    "bullets": [
      "Programação e sequenciamento de atividades",
      "Mobilização de equipes e recursos",
      "Controle de produtividade durante a janela",
      "Registro de intervenções e liberação de Áreas"
    ],
    "featured": true
  },
  {
    "slug": "caldeiraria-pesada-fabricacao",
    "title": "Caldeiraria Industrial e Fabricação",
    "icon": "tank",
    "image": "assets/img/services/servico-05.jpg",
    "imageAlt": "Tubulações industriais com flanges e válvulas durante montagem em campo, ao lado de painel elétrico.",
    "short": "Fabricação, recuperação e montagem de componentes, estruturas e conjuntos metálicos para manutenção e montagem industrial, conforme projeto, especificação e escopo contratado.",
    "applications": "mineração, plantas de beneficiamento, infraestrutura industrial e agroindústria.",
    "scope": "Fabricação de chutes, silos, tremonhas, tanques, dutos e estruturas metálicas, com controle dimensional e rastreabilidade dos materiais empregados.",
    "bullets": [
      "Chutes, moegas, tremonhas e silos",
      "Tanques, dutos e espiras de transporte",
      "Estruturas metálicas e bases de equipamentos",
      "Controle dimensional e acabamento"
    ],
    "featured": true
  },
  {
    "slug": "soldagem-industrial",
    "title": "Soldagem Industrial",
    "icon": "flame",
    "image": "assets/img/services/servico-06.jpg",
    "imageAlt": "Soldador com máscara de proteção executando solda em peça metálica, com faíscas de solda.",
    "short": "Serviços de soldagem aplicados a estruturas e equipamentos industriais.",
    "scope": "Serviços de soldagem aplicados a estruturas e equipamentos industriais, executados por soldadores e caldeireiros conforme a necessidade técnica de cada intervenção.",
    "bullets": [
      "Soldagem estrutural e de equipamentos",
      "Recuperação e revestimento de peças",
      "Reparos em campo e em oficina",
      "Preparação, ajuste e acabamento"
    ]
  },
  {
    "slug": "vulcanizacao-de-correias",
    "title": "Vulcanização de Correias",
    "icon": "belt",
    "image": "assets/img/services/servico-07.jpg",
    "imageAlt": "Dois técnicos com capacete executando vulcanização em correia transportadora, com prensa de vulcanização ao fundo.",
    "short": "Vulcanização a frio e a quente de correias transportadoras.",
    "scope": "Vulcanização a frio e a quente de correias transportadoras, apoiando a operação de sistemas de transporte de minério, grãos e materiais a granel.",
    "bullets": [
      "Vulcanização a frio e a quente",
      "Emendas e reparos em correias transportadoras",
      "Apoio a sistemas de transporte de granéis",
      "Intervenções programadas e emergenciais"
    ]
  },
  {
    "slug": "andaimes",
    "title": "Andaimes",
    "icon": "scaffold",
    "image": "assets/img/services/servico-08.jpg",
    "imageAlt": "Estrutura de andaimes tubulares vista de cima, montada em ambiente industrial.",
    "short": "Montagem e desmontagem de andaimes para operações e obras industriais.",
    "scope": "Montagem e desmontagem de andaimes para operações e obras industriais, com dimensionamento de estrutura e organização das frentes de trabalho.",
    "bullets": [
      "Andaimes tubulares e multidirecionais",
      "Apoio a serviços de manutenção e obras",
      "Dimensionamento conforme a frente de serviço",
      "Montagem, inspeção e desmontagem"
    ]
  },
  {
    "slug": "planejamento-controle-obras",
    "title": "Planejamento e Controle de Obras",
    "icon": "chart",
    "image": "assets/img/services/servico-09.jpg",
    "imageAlt": "Notebook com cronogramas e painéis de controle, capacete, trena e plantas sobre a mesa, em frente a uma planta industrial.",
    "short": "Cronogramas, medições, RDO, databook e as-built.",
    "scope": "Cronogramas, medições, RDO, databook e as-built — a estrutura de engenharia que acompanha a execução e dá visibilidade ao cliente sobre prazos, custos e escopo realizado.",
    "bullets": [
      "Cronogramas físicos e físico-financeiros",
      "Medições e controle de avanço",
      "RDO — relatórios diários de obra",
      "Databook e as-built"
    ]
  }
]$json$::jsonb)
on conflict (site_slug, key) do nothing;

-- segments
insert into public.content (site_slug, key, payload)
values ('mhrengenharia', 'segments', $json$[
  {
    "slug": "mineracao",
    "title": "Mineração",
    "icon": "factory",
    "image": "assets/img/segments/segmento-01.jpg",
    "imageAlt": "Moinho de grande porte com plataforma de acesso e equipe em campo, em planta de mineração.",
    "short": "Montagem e manutenção eletromecânica para operações de mineração, beneficiamento mineral e infraestrutura industrial.",
    "cta": {
      "label": "Conheça nossa atuação em mineração",
      "href": "segmentos/montagem-manutencao-industrial-mineracao/"
    },
    "page": {
      "label": "Ver página do segmento",
      "href": "segmentos/montagem-manutencao-industrial-mineracao/"
    },
    "bullets": [
      "Sistemas de transporte de minério",
      "Equipamentos de beneficiamento",
      "Paradas de manutenção programadas",
      "Caldeiraria e soldagem em campo"
    ]
  },
  {
    "slug": "agroindustria",
    "title": "Agroindústria",
    "icon": "tank",
    "image": "assets/img/segments/segmento-02.jpg",
    "imageAlt": "Vista aérea de planta agroindustrial com silos, secadores, transportadores e tanques de armazenagem de grãos.",
    "short": "Montagem e manutenção industrial para silos, secadores, elevadores, transportadores, armazenagem e processamento de grãos.",
    "page": {
      "label": "Ver página do segmento",
      "href": "segmentos/montagem-manutencao-industrial-agroindustria/"
    },
    "bullets": [
      "Transportadores e elevadores",
      "Estruturas metálicas e silos",
      "Vulcanização de correias",
      "Manutenção de máquinas e equipamentos"
    ]
  },
  {
    "slug": "fertilizantes",
    "title": "Fertilizantes",
    "icon": "layers",
    "image": "assets/img/segments/segmento-03.jpg",
    "imageAlt": "Equipamento rotativo de grande porte com proteção metálica e passarelas, em planta de processamento.",
    "short": "Montagem e manutenção industrial para plantas de mineração e processamento de fertilizantes, conforme escopo contratado.",
    "bullets": [
      "Mineração e processamento de fertilizantes",
      "Transportadores, dutos e sistemas de movimentação",
      "Fabricação e recuperação de componentes",
      "Manutenção preventiva e corretiva"
    ]
  },
  {
    "slug": "cimenteira",
    "title": "Cimenteira",
    "icon": "gear",
    "image": "assets/img/segments/segmento-04.jpg",
    "imageAlt": "Forno rotativo de grande porte com chama e estruturas de acesso, em planta industrial.",
    "short": "Atendimento a operações industriais e processos produtivos, conforme escopo, capacidade técnica e requisitos do projeto.",
    "bullets": [
      "Montagem eletromecânica e elétrica",
      "Manutenção industrial",
      "Fabricação e caldeiraria",
      "Planejamento e controle de obras"
    ]
  }
]$json$::jsonb)
on conflict (site_slug, key) do nothing;

-- engineering
insert into public.content (site_slug, key, payload)
values ('mhrengenharia', 'engineering', $json${
  "flow": [
    {
      "title": "Planejamento",
      "icon": "calendar",
      "text": "Levantamento de escopo, cronograma físico e definição de recursos, frentes de trabalho e interfaces do projeto."
    },
    {
      "title": "Execução",
      "icon": "layers",
      "text": "Mobilização de equipes multidisciplinares e execução dos serviços conforme o plano e as normas de segurança aplicáveis."
    },
    {
      "title": "Controle",
      "icon": "chart",
      "text": "Acompanhamento de avanço físico, medições, RDO e tratamento de desvios ao longo de toda a obra."
    },
    {
      "title": "Entrega",
      "icon": "check-circle",
      "text": "Consolidação da documentação técnica, databook, as-built e liberação final dos serviços executados."
    }
  ],
  "deliverables": [
    {
      "title": "Cronogramas de execução",
      "icon": "calendar",
      "text": "Programação de atividades físicas e físico-financeiras, com marcos e caminho crítico."
    },
    {
      "title": "Medições e acompanhamento físico",
      "icon": "ruler",
      "text": "Apuração de avanço e medição dos serviços executados para acompanhamento contratual."
    },
    {
      "title": "RDO — Registro Diário de Obra",
      "icon": "clipboard",
      "text": "Relatórios diários de obra com efetivo, equipamentos, atividades e ocorrências."
    },
    {
      "title": "Relatórios de execução",
      "icon": "file",
      "text": "Consolidação periódica do andamento da execução, com avanço, recursos e ocorrências registradas."
    },
    {
      "title": "Documentação técnica",
      "icon": "file",
      "text": "Organização da documentação técnica produzida ao longo da execução dos serviços."
    },
    {
      "title": "As-built e databook, quando aplicáveis",
      "icon": "blueprint",
      "text": "Registro do que foi efetivamente executado em campo, com as alterações em relação ao projeto."
    }
  ],
  "responsibility": [
    "Responsabilidade técnica com CREA/ART quando aplicável",
    "Requisitos de segurança/HSE aplicáveis ao escopo contratado",
    "Registros e documentação de obra organizados",
    "Interface técnica direta com a equipe do cliente"
  ]
}$json$::jsonb)
on conflict (site_slug, key) do nothing;

-- pillars
insert into public.content (site_slug, key, payload)
values ('mhrengenharia', 'pillars', $json$[
  {
    "icon": "layers",
    "title": "Engenharia Industrial",
    "text": "Soluções completas para operações industriais."
  },
  {
    "icon": "users",
    "title": "Equipe Técnica",
    "text": "Profissionais especializados em diferentes disciplinas."
  },
  {
    "icon": "badge",
    "title": "Responsabilidade Técnica",
    "text": "Atuação com responsabilidade técnica e CREA/ART quando aplicável."
  },
  {
    "icon": "shield",
    "title": "Segurança",
    "text": "Compromisso com normas e boas práticas de segurança."
  }
]$json$::jsonb)
on conflict (site_slug, key) do nothing;

-- footer
insert into public.content (site_slug, key, payload)
values ('mhrengenharia', 'footer', $json${
  "about": "A MHR Engenharia atua em montagem e manutenção industrial, com foco em mineração e agroindústria, mobilizando equipes conforme o escopo e os requisitos de cada projeto em todo o território nacional.",
  "columns": {
    "mhr": [
      {
        "label": "A Empresa",
        "href": "a-empresa.html"
      },
      {
        "label": "Serviços",
        "href": "servicos.html"
      },
      {
        "label": "Engenharia e HSE",
        "href": "engenharia.html"
      },
      {
        "label": "Atuação Nacional",
        "href": "atuacao-nacional/"
      }
    ],
    "segments": [
      {
        "label": "Mineração",
        "href": "segmentos/montagem-manutencao-industrial-mineracao/"
      },
      {
        "label": "Agroindústria",
        "href": "segmentos/montagem-manutencao-industrial-agroindustria/"
      }
    ],
    "services": [
      {
        "label": "Montagem Eletromecânica",
        "href": "servicos.html#montagem-eletromecanica"
      },
      {
        "label": "Manutenção Industrial",
        "href": "servicos.html#manutencao-industrial"
      },
      {
        "label": "Paradas de Manutenção",
        "href": "servicos/paradas-de-manutencao-industrial/"
      },
      {
        "label": "Caldeiraria Industrial",
        "href": "servicos.html#caldeiraria-pesada-fabricacao"
      },
      {
        "label": "Soldagem Industrial",
        "href": "servicos.html#soldagem-industrial"
      },
      {
        "label": "Vulcanização de Correias",
        "href": "servicos.html#vulcanizacao-de-correias"
      }
    ],
    "institutional": [
      {
        "label": "Segurança e Qualidade",
        "href": "seguranca-qualidade.html"
      },
      {
        "label": "Contato",
        "href": "contato.html"
      }
    ]
  }
}$json$::jsonb)
on conflict (site_slug, key) do nothing;

-- logo
insert into public.content (site_slug, key, payload)
values ('mhrengenharia', 'logo', $json${
  "light": "assets/img/media/logo.svg",
  "dark": "assets/img/media/logo-dark.svg"
}$json$::jsonb)
on conflict (site_slug, key) do nothing;

-- Fim do seed. Total de coleções: 8
