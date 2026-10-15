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

-- pages
insert into public.content (site_slug, key, payload)
values ('mhrengenharia', 'pages', $json${
  "home": {
    "hero": {
      "eyebrow": "Engenharia Industrial",
      "title": "Montagem e Manutenção Eletromecânica para Mineração e Agroindústria",
      "text": "A MHR Engenharia executa montagem eletromecânica, manutenção industrial, paradas programadas, caldeiraria, fabricação e serviços de engenharia para mineração, beneficiamento mineral, armazenagem e processamento de grãos, com atuação em todo o Brasil."
    },
    "about": {
      "eyebrow": "Institucional",
      "title": "Engenharia, manutenção e fabricação industrial",
      "lead": "A MHR atua na execução de serviços de montagem e manutenção eletromecânica para operações industriais, com foco em mineração, beneficiamento mineral e agroindústria. Com sede em Varginha/MG, mobilizamos equipes em todo o território nacional conforme o escopo de cada contrato.",
      "items": [
        "Equipe técnica multidisciplinar com atuação em campo",
        "Planejamento, medições e controle de obras",
        "Responsabilidade técnica, com CREA/ART quando aplicável"
      ]
    },
    "team": {
      "eyebrow": "Quem executa",
      "title": "Equipe técnica multidisciplinar",
      "lead": "A composição da equipe é definida conforme o escopo de cada serviço, com profissionais atuando de forma integrada nas frentes de montagem, manutenção e fabricação.",
      "chips": [
        "Soldadores",
        "Caldeireiros",
        "Mecânicos",
        "Eletricistas",
        "Montadores"
      ]
    },
    "services": {
      "eyebrow": "Nossos serviços",
      "title": "Soluções completas para operações industriais",
      "lead": "A MHR atua em montagem eletromecânica, montagem elétrica e instrumentação, manutenção, fabricação e engenharia industrial — com planejamento e controle aplicados a cada execução."
    },
    "segments": {
      "eyebrow": "Mercados atendidos",
      "title": "Onde a MHR atua",
      "lead": "Atendemos operações industriais que exigem disponibilidade de equipamentos, organização de frente de serviço e segurança na execução."
    },
    "capacity": {
      "eyebrow": "Engenharia, HSE e responsabilidade",
      "title": "Segurança, responsabilidade e controle da execução",
      "text": "A MHR executa seus serviços conforme os requisitos de segurança/HSE aplicáveis ao escopo contratado e atua com responsabilidade técnica, com CREA/ART quando aplicável. Cada frente é planejada e acompanhada com cronogramas, medições, RDO e documentação consolidada na entrega.",
      "hseLabel": "Conforme aplicável",
      "hseText": "APR, PT, DDS, inspeções, gestão de riscos, registros de campo, controle de ferramentas e equipamentos e documentação de execução."
    },
    "contact": {
      "eyebrow": "Atendimento",
      "title": "Fale com a engenharia da MHR",
      "lead": "Centralizamos o atendimento em Varginha/MG, com atuação em todo o território nacional. Telefone e WhatsApp: (35) 3677-1560.",
      "chips": [
        "Montagem",
        "Manutenção",
        "Fabricação",
        "Paradas",
        "Engenharia"
      ]
    }
  },
  "empresa": {
    "hero": {
      "eyebrow": "Institucional",
      "title": "Estrutura técnica para operações industriais",
      "lead": "A MHR Manutenção Industrial Ltda reúne engenharia, montagem e manutenção industrial em uma mesma estrutura de execução, com sede em Varginha/MG e atendimento em todo o território nacional."
    },
    "about": {
      "eyebrow": "A MHR",
      "title": "Engenharia, manutenção e fabricação industrial",
      "lead": "Somos uma empresa de engenharia e manutenção industrial dedicada à execução de serviços em plantas que operam em regime contínuo ou com janelas de parada programada.",
      "p1": "Atuamos em montagem eletromecânica, montagem elétrica e instrumentação, manutenção preventiva e corretiva, paradas de manutenção, caldeiraria pesada e fabricação, soldagem industrial, vulcanização de correias transportadoras e montagem e desmontagem de andaimes.",
      "p2": "Além da execução em campo, a MHR aplica planejamento e controle de obras em suas intervenções: cronogramas, medições, RDO, databook e as-built. É essa organização que permite atender demandas de médio e grande porte mantendo previsibilidade de prazo e registro técnico do que foi executado."
    },
    "data": {
      "eyebrow": "Identificação",
      "title": "Informações da empresa"
    },
    "team": {
      "eyebrow": "Disciplinas",
      "title": "Profissionais de diferentes disciplinas",
      "lead": "A composição da equipe é definida conforme o escopo de cada serviço, com profissionais atuando de forma integrada nas frentes de montagem, manutenção e fabricação.",
      "execTitle": "Equipe de execução",
      "execText": "A mobilização de equipes é dimensionada por frente de serviço, considerando especialidade, produtividade e as exigências de segurança de cada planta.",
      "discTitle": "Disciplinas atendidas",
      "discText": "A integração entre disciplinas permite concentrar diferentes escopos em uma única mobilização, reduzindo interfaces e prazos durante paradas e obras."
    },
    "method": {
      "eyebrow": "Método",
      "title": "Organização aplicada à execução"
    },
    "area": {
      "eyebrow": "Abrangência",
      "title": "Atuação em todo o território nacional",
      "lead": "A base operacional está em Varginha/MG, de onde mobilizamos equipes para atender plantas industriais em todo o Brasil, conforme o escopo e o prazo de cada projeto.",
      "panelTitle": "Sede operacional",
      "panelText": "Av. Dom Othon Motta, 530, Sala 01 — Jardim Sion — Varginha/MG — CEP 37.048-570",
      "items": [
        "Atendimento presencial com equipe técnica própria",
        "Mobilização dimensionada por escopo e prazo",
        "Disponibilidade para paradas programadas",
        "Avaliação de projetos em todo o território nacional"
      ]
    },
    "cta": {
      "eyebrow": "Próximo projeto",
      "title": "Precisa de uma equipe especializada para seu próximo projeto industrial?",
      "text": "A MHR está disponível para avaliar demandas de montagem, manutenção, fabricação e engenharia."
    }
  },
  "servicos": {
    "hero": {
      "eyebrow": "Escopo técnico",
      "title": "Serviços industriais de montagem, manutenção e fabricação",
      "lead": "Nove frentes de atuação que cobrem da montagem eletromecânica à fabricação, passando por manutenção, paradas, soldagem, vulcanização e andaimes — com planejamento e controle de obras aplicados a cada execução."
    },
    "integration": {
      "eyebrow": "Execução integrada",
      "title": "Diferentes disciplinas em uma única mobilização",
      "lead": "Em paradas e obras industriais, concentrar escopos reduz interfaces, tempo de mobilização e exposição ao risco. A MHR organiza as frentes de trabalho para que as disciplinas avancem de forma coordenada."
    },
    "cta": {
      "eyebrow": "Escopo sob medida",
      "title": "Descreva sua demanda e receba uma análise técnica",
      "text": "Informe a disciplina envolvida, o porte do serviço e a janela disponível. A MHR avalia a melhor composição de equipe para o seu projeto."
    }
  },
  "segmentos": {
    "hero": {
      "eyebrow": "Mercados atendidos",
      "title": "Segmentos industriais atendidos pela MHR",
      "lead": "Executamos serviços industriais em plantas que operam com material a granel, movimentação contínua e equipamentos de grande porte — de mineração à agroindústria (armazenagem e processamento de grãos) e à mineração e processamento de fertilizantes."
    },
    "list": {
      "eyebrow": "Aplicação técnica",
      "title": "Onde nossa equipe atua",
      "lead": "Cada segmento tem particularidades de processo, acesso e regime de operação. A MHR adapta o planejamento e as frentes de serviço a essas condições."
    },
    "capacity": {
      "eyebrow": "Recursos mobilizáveis",
      "title": "Serviços aplicáveis a qualquer um dos segmentos",
      "lead": "O mesmo conjunto de disciplinas técnicas atende diferentes plantas, com escopo ajustado ao processo e à criticidade de cada operação."
    },
    "cta": {
      "eyebrow": "Sua operação",
      "title": "Atendemos a sua planta",
      "text": "Se a sua operação envolve equipamentos industriais, movimentação de materiais ou paradas programadas, a MHR pode avaliar o escopo."
    }
  },
  "engenharia": {
    "hero": {
      "eyebrow": "Capacidade técnica",
      "title": "Engenharia e planejamento de obras industriais",
      "lead": "Executar bem é consequência de planejar bem. A MHR estrutura cada obra com planejamento, execução, controle e entrega documentada — com responsabilidade técnica e CREA/ART quando aplicável."
    },
    "flow": {
      "eyebrow": "Do escopo à entrega",
      "title": "Planejamento, execução, controle e entrega",
      "lead": "O fluxo é aplicado de forma proporcional ao porte do serviço, garantindo rastreabilidade desde o levantamento inicial até a documentação final."
    },
    "deliverables": {
      "eyebrow": "Documentação técnica",
      "title": "Entregáveis de engenharia e controle",
      "lead": "Os itens abaixo podem ser aplicados ao projeto conforme o escopo contratado e as exigências do cliente."
    },
    "control": {
      "eyebrow": "Visibilidade de obra",
      "title": "Controle que acompanha a execução",
      "p1": "O controle de obras permite identificar desvios de prazo e produtividade enquanto ainda há tempo de agir. Medições e relatórios diários alimentam o cronograma e sustentam a tomada de decisão durante a execução.",
      "p2": "A documentação de obra também protege o cliente: registra o que foi executado, as alterações de escopo e as condições em que os serviços foram realizados."
    },
    "responsibility": {
      "eyebrow": "CREA / ART",
      "title": "Execução com responsabilidade técnica registrada",
      "text": "Serviços industriais exigem responsabilidade formal sobre o que é executado. A MHR atua com responsabilidade técnica e CREA/ART quando aplicável, garantindo acompanhamento profissional e registro adequado das intervenções."
    },
    "cta": {
      "eyebrow": "Obra planejada",
      "title": "Sua obra com planejamento e documentação",
      "text": "Apresente o escopo e conheça a estrutura de planejamento e controle que a MHR aplica aos serviços industriais."
    }
  },
  "seguranca": {
    "hero": {
      "eyebrow": "Compromisso",
      "title": "Segurança, responsabilidade e qualidade",
      "lead": "Serviço industrial bem executado é serviço executado com segurança. A MHR organiza suas frentes de trabalho conforme os requisitos de segurança aplicáveis e mantém responsabilidade técnica sobre o que executa."
    },
    "principles": {
      "eyebrow": "Execução segura",
      "title": "Segurança como requisito de execução",
      "p1": "Antes da mobilização, cada frente de serviço é avaliada quanto aos riscos envolvidos, aos requisitos de acesso e às normas aplicáveis à planta. A execução só avança com as condições de segurança atendidas.",
      "p2": "Essa disciplina protege as equipes da MHR, as equipes do cliente e a continuidade da operação industrial."
    },
    "technical": {
      "eyebrow": "CREA / ART",
      "title": "Responsabilidade técnica e CREA/ART quando aplicável",
      "lead": "A responsabilidade técnica é o que diferencia execução industrial de trabalho improvisado. Ela garante acompanhamento profissional, critérios definidos e registro formal das intervenções."
    },
    "quality": {
      "eyebrow": "Execução verificada",
      "title": "Qualidade aplicada ao serviço executado",
      "lead": "Qualidade, na prática, é executar conforme o especificado, verificar o resultado e registrar o que foi feito. É esse ciclo que sustenta a confiabilidade dos equipamentos após a intervenção."
    },
    "cta": {
      "eyebrow": "Execução responsável",
      "title": "Serviço executado com segurança e registro técnico",
      "text": "Apresente a sua demanda e conheça como a MHR aplica segurança, responsabilidade técnica e qualidade em campo."
    }
  },
  "contato": {
    "hero": {
      "eyebrow": "Atendimento",
      "title": "Fale com a engenharia da MHR",
      "lead": "Envie sua demanda de montagem, manutenção, fabricação ou engenharia industrial. Descreva o escopo e a janela disponível para que a equipe técnica avalie a melhor composição de execução."
    },
    "channels": {
      "eyebrow": "Dados de contato",
      "title": "Onde nos encontrar",
      "lead": "Fale com a MHR por telefone ou WhatsApp, acompanhe os trabalhos nas redes sociais ou envie sua demanda diretamente pelo formulário abaixo."
    },
    "form": {
      "eyebrow": "Solicitar orçamento",
      "title": "Descreva a sua demanda",
      "lead": "Quanto mais detalhes sobre o escopo, o local e o prazo, mais precisa será a análise técnica da MHR."
    },
    "cta": {
      "eyebrow": "Análise técnica",
      "title": "Sua demanda avaliada pela equipe de engenharia",
      "text": "Cada solicitação é analisada considerando escopo, disciplina envolvida, prazo e condições de execução em planta."
    }
  },
  "atuacao": {
    "hero": {
      "eyebrow": "Abrangência",
      "title": "Atuação Nacional — MHR Engenharia",
      "lead": "Mobilizamos equipes técnicas em todo o território nacional conforme o escopo, o prazo, a localização e os requisitos de cada projeto."
    },
    "mobilization": {
      "eyebrow": "Como definimos a mobilização",
      "title": "Atendimento conforme escopo e localização",
      "lead": "A composição das equipes e dos recursos é dimensionada caso a caso, considerando o escopo, o prazo e a localização do serviço.",
      "p1": "Atuamos em operações industriais de mineração, beneficiamento mineral, agroindústria e infraestrutura industrial, com mobilização de equipes técnicas conforme as necessidades de cada contrato.",
      "p2": "A base operacional fica em Varginha/MG e o planejamento de mobilização é definido junto com o cliente, considerando a janela de execução e as condições da planta."
    },
    "services": {
      "eyebrow": "Serviços mobilizáveis",
      "title": "Serviços que atendemos em campo"
    },
    "cta": {
      "eyebrow": "Em todo o Brasil",
      "title": "Sua operação fica onde?",
      "text": "Informe a localização, o escopo e o prazo para avaliarmos a mobilização da equipe."
    }
  },
  "paradas": {
    "hero": {
      "eyebrow": "Serviço",
      "title": "Paradas de Manutenção Industrial",
      "lead": "A MHR Engenharia executa serviços durante paradas programadas de manutenção industrial, com mobilização de equipes e recursos conforme o escopo e a janela operacional definida pelo cliente."
    },
    "scope": {
      "eyebrow": "Frentes executadas",
      "title": "Serviços executados na janela de parada",
      "text": "Atuamos em manutenção mecânica, montagem e desmontagem de equipamentos, caldeiraria, soldagem, estruturas, adequações e serviços elétricos/instrumentação quando aplicáveis."
    },
    "control": {
      "eyebrow": "Integração ao planejamento",
      "title": "Execução integrada ao planejamento",
      "text": "A execução pode ser integrada ao planejamento do cliente, com acompanhamento de cronograma, registros de campo, medições e documentação de execução."
    },
    "cta": {
      "eyebrow": "Parada programada",
      "title": "Planeje sua parada com a MHR",
      "text": "Envie o escopo e a janela disponível para avaliarmos a composição de equipes e a sequência de execução."
    }
  },
  "mineracao": {
    "hero": {
      "eyebrow": "Segmento",
      "title": "Montagem e Manutenção Eletromecânica para Mineração",
      "lead": "A MHR Engenharia atua na execução de serviços de montagem e manutenção eletromecânica para operações de mineração, beneficiamento mineral e infraestrutura de plantas industriais."
    },
    "applications": {
      "eyebrow": "Onde atuamos",
      "title": "Aplicações em plantas de mineração",
      "text": "Entre as aplicações estão plantas de beneficiamento, britagem, moagem, peneiramento, correias e transportadores, estruturas e sistemas auxiliares."
    },
    "services": {
      "eyebrow": "Frentes aplicadas",
      "title": "Serviços aplicados a este segmento",
      "lead": "Serviços executados conforme o escopo contratado e as necessidades da operação."
    },
    "national": {
      "eyebrow": "Atuação nacional",
      "title": "Equipes mobilizadas em todo o Brasil",
      "lead": "A MHR mobiliza equipes técnicas para projetos em diferentes regiões do Brasil, de acordo com o escopo, prazo e requisitos do cliente."
    },
    "cta": {
      "eyebrow": "Mineração",
      "title": "Precisa de apoio na sua planta?",
      "text": "Apresente o escopo e as condições da operação para avaliarmos a melhor composição de execução."
    }
  },
  "agroindustria": {
    "hero": {
      "eyebrow": "Segmento",
      "title": "Montagem e Manutenção Industrial para Agroindústria",
      "lead": "A MHR Engenharia executa serviços de montagem e manutenção industrial para operações agroindustriais, incluindo instalações de armazenagem, movimentação e processamento de grãos."
    },
    "applications": {
      "eyebrow": "Onde atuamos",
      "title": "Aplicações em unidades agroindustriais",
      "text": "Atuamos em instalações de armazenagem, movimentação e processamento de grãos, conforme o escopo contratado e as condições da unidade."
    },
    "services": {
      "eyebrow": "Frentes aplicadas",
      "title": "Serviços aplicados a este segmento",
      "lead": "Serviços executados conforme o escopo contratado e as necessidades da operação."
    },
    "cta": {
      "eyebrow": "Agroindústria",
      "title": "Precisa de apoio na sua unidade?",
      "text": "Apresente o escopo e as condições da operação para avaliarmos a melhor composição de execução."
    }
  },
  "erro404": {
    "main": {
      "eyebrow": "Página não encontrada",
      "title": "Este endereço não corresponde a uma página da MHR",
      "text": "O link pode estar incorreto ou o conteúdo pode ter sido movido. Utilize a navegação para acessar as áreas institucionais da empresa."
    }
  }
}$json$::jsonb)
on conflict (site_slug, key) do nothing;

-- Fim do seed. Total de coleções: 9
