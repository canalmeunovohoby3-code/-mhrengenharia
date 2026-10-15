/* ==========================================================================
   MHR — Conteúdo de página (textos editáveis pelo painel)
   --------------------------------------------------------------------------
   Este arquivo tem DUAS partes:

   1) `MHR.pageContent`  — os TEXTOS PADRÃO de cada página. Estes valores são
      exatamente o que está escrito no HTML hoje. O componente
      `components/pages.js` copia estes textos para os elementos marcados com
      `data-copy` / `data-copy-list`. Se o painel (Supabase) enviar um valor,
      ele substitui o padrão; se não enviar, o site continua idêntico.

      IMPORTANTE: o HTML guarda o mesmo texto como reserva para quem navega
      com o JavaScript desativado (SEO e acessibilidade). Ao editar pelo
      painel, o texto publicado passa a vir do painel; o texto embutido no
      HTML permanece como reserva.

   2) `MHR.pagesSchema` — a DESCRIÇÃO de quais campos o painel mostra
      (página → grupos → campos). O painel usa isto para montar o formulário.
      Este esquema NÃO é editável pelo cliente (protege a estrutura do site).

   Convenção das chaves: `pagina.grupo.campo`.
   O atributo no HTML é `data-copy="pagina.grupo.campo"`.
   Listas usam `data-copy-list="pagina.grupo.campo"` (array de textos).
   ========================================================================== */
(function (MHR) {
  'use strict';

  MHR.pageContent = {
    /* ===================================================================
       HOME
       =================================================================== */
    home: {
      hero: {
        eyebrow: 'Engenharia Industrial',
        title: 'Montagem e Manutenção Eletromecânica para Mineração e Agroindústria',
        text: 'A MHR Engenharia executa montagem eletromecânica, manutenção industrial, paradas programadas, caldeiraria, fabricação e serviços de engenharia para mineração, beneficiamento mineral, armazenagem e processamento de grãos, com atuação em todo o Brasil.',
      },
      about: {
        eyebrow: 'Institucional',
        title: 'Engenharia, manutenção e fabricação industrial',
        lead: 'A MHR atua na execução de serviços de montagem e manutenção eletromecânica para operações industriais, com foco em mineração, beneficiamento mineral e agroindústria. Com sede em Varginha/MG, mobilizamos equipes em todo o território nacional conforme o escopo de cada contrato.',
        items: [
          'Equipe técnica multidisciplinar com atuação em campo',
          'Planejamento, medições e controle de obras',
          'Responsabilidade técnica, com CREA/ART quando aplicável',
        ],
      },
      team: {
        eyebrow: 'Quem executa',
        title: 'Equipe técnica multidisciplinar',
        lead: 'A composição da equipe é definida conforme o escopo de cada serviço, com profissionais atuando de forma integrada nas frentes de montagem, manutenção e fabricação.',
        chips: ['Soldadores', 'Caldeireiros', 'Mecânicos', 'Eletricistas', 'Montadores'],
      },
      services: {
        eyebrow: 'Nossos serviços',
        title: 'Soluções completas para operações industriais',
        lead: 'A MHR atua em montagem eletromecânica, montagem elétrica e instrumentação, manutenção, fabricação e engenharia industrial — com planejamento e controle aplicados a cada execução.',
      },
      segments: {
        eyebrow: 'Mercados atendidos',
        title: 'Onde a MHR atua',
        lead: 'Atendemos operações industriais que exigem disponibilidade de equipamentos, organização de frente de serviço e segurança na execução.',
      },
      capacity: {
        eyebrow: 'Engenharia, HSE e responsabilidade',
        title: 'Segurança, responsabilidade e controle da execução',
        text: 'A MHR executa seus serviços conforme os requisitos de segurança/HSE aplicáveis ao escopo contratado e atua com responsabilidade técnica, com CREA/ART quando aplicável. Cada frente é planejada e acompanhada com cronogramas, medições, RDO e documentação consolidada na entrega.',
        hseLabel: 'Conforme aplicável',
        hseText: 'APR, PT, DDS, inspeções, gestão de riscos, registros de campo, controle de ferramentas e equipamentos e documentação de execução.',
      },
      contact: {
        eyebrow: 'Atendimento',
        title: 'Fale com a engenharia da MHR',
        lead: 'Centralizamos o atendimento em Varginha/MG, com atuação em todo o território nacional. Telefone e WhatsApp: (35) 3677-1560.',
        chips: ['Montagem', 'Manutenção', 'Fabricação', 'Paradas', 'Engenharia'],
      },
    },

    /* ===================================================================
       A EMPRESA
       =================================================================== */
    empresa: {
      hero: {
        eyebrow: 'Institucional',
        title: 'Estrutura técnica para operações industriais',
        lead: 'A MHR Manutenção Industrial Ltda reúne engenharia, montagem e manutenção industrial em uma mesma estrutura de execução, com sede em Varginha/MG e atendimento em todo o território nacional.',
      },
      about: {
        eyebrow: 'A MHR',
        title: 'Engenharia, manutenção e fabricação industrial',
        lead: 'Somos uma empresa de engenharia e manutenção industrial dedicada à execução de serviços em plantas que operam em regime contínuo ou com janelas de parada programada.',
        p1: 'Atuamos em montagem eletromecânica, montagem elétrica e instrumentação, manutenção preventiva e corretiva, paradas de manutenção, caldeiraria pesada e fabricação, soldagem industrial, vulcanização de correias transportadoras e montagem e desmontagem de andaimes.',
        p2: 'Além da execução em campo, a MHR aplica planejamento e controle de obras em suas intervenções: cronogramas, medições, RDO, databook e as-built. É essa organização que permite atender demandas de médio e grande porte mantendo previsibilidade de prazo e registro técnico do que foi executado.',
      },
      data: { eyebrow: 'Identificação', title: 'Informações da empresa' },
      team: {
        eyebrow: 'Disciplinas',
        title: 'Profissionais de diferentes disciplinas',
        lead: 'A composição da equipe é definida conforme o escopo de cada serviço, com profissionais atuando de forma integrada nas frentes de montagem, manutenção e fabricação.',
        execTitle: 'Equipe de execução',
        execText: 'A mobilização de equipes é dimensionada por frente de serviço, considerando especialidade, produtividade e as exigências de segurança de cada planta.',
        discTitle: 'Disciplinas atendidas',
        discText: 'A integração entre disciplinas permite concentrar diferentes escopos em uma única mobilização, reduzindo interfaces e prazos durante paradas e obras.',
      },
      method: { eyebrow: 'Método', title: 'Organização aplicada à execução' },
      area: {
        eyebrow: 'Abrangência',
        title: 'Atuação em todo o território nacional',
        lead: 'A base operacional está em Varginha/MG, de onde mobilizamos equipes para atender plantas industriais em todo o Brasil, conforme o escopo e o prazo de cada projeto.',
        panelTitle: 'Sede operacional',
        panelText: 'Av. Dom Othon Motta, 530, Sala 01 — Jardim Sion — Varginha/MG — CEP 37.048-570',
        items: [
          'Atendimento presencial com equipe técnica própria',
          'Mobilização dimensionada por escopo e prazo',
          'Disponibilidade para paradas programadas',
          'Avaliação de projetos em todo o território nacional',
        ],
      },
      cta: {
        eyebrow: 'Próximo projeto',
        title: 'Precisa de uma equipe especializada para seu próximo projeto industrial?',
        text: 'A MHR está disponível para avaliar demandas de montagem, manutenção, fabricação e engenharia.',
      },
    },

    /* ===================================================================
       SERVIÇOS
       =================================================================== */
    servicos: {
      hero: {
        eyebrow: 'Escopo técnico',
        title: 'Serviços industriais de montagem, manutenção e fabricação',
        lead: 'Nove frentes de atuação que cobrem da montagem eletromecânica à fabricação, passando por manutenção, paradas, soldagem, vulcanização e andaimes — com planejamento e controle de obras aplicados a cada execução.',
      },
      integration: {
        eyebrow: 'Execução integrada',
        title: 'Diferentes disciplinas em uma única mobilização',
        lead: 'Em paradas e obras industriais, concentrar escopos reduz interfaces, tempo de mobilização e exposição ao risco. A MHR organiza as frentes de trabalho para que as disciplinas avancem de forma coordenada.',
      },
      cta: {
        eyebrow: 'Escopo sob medida',
        title: 'Descreva sua demanda e receba uma análise técnica',
        text: 'Informe a disciplina envolvida, o porte do serviço e a janela disponível. A MHR avalia a melhor composição de equipe para o seu projeto.',
      },
    },

    /* ===================================================================
       SEGMENTOS
       =================================================================== */
    segmentos: {
      hero: {
        eyebrow: 'Mercados atendidos',
        title: 'Segmentos industriais atendidos pela MHR',
        lead: 'Executamos serviços industriais em plantas que operam com material a granel, movimentação contínua e equipamentos de grande porte — de mineração à agroindústria (armazenagem e processamento de grãos) e à mineração e processamento de fertilizantes.',
      },
      list: {
        eyebrow: 'Aplicação técnica',
        title: 'Onde nossa equipe atua',
        lead: 'Cada segmento tem particularidades de processo, acesso e regime de operação. A MHR adapta o planejamento e as frentes de serviço a essas condições.',
      },
      capacity: {
        eyebrow: 'Recursos mobilizáveis',
        title: 'Serviços aplicáveis a qualquer um dos segmentos',
        lead: 'O mesmo conjunto de disciplinas técnicas atende diferentes plantas, com escopo ajustado ao processo e à criticidade de cada operação.',
      },
      cta: {
        eyebrow: 'Sua operação',
        title: 'Atendemos a sua planta',
        text: 'Se a sua operação envolve equipamentos industriais, movimentação de materiais ou paradas programadas, a MHR pode avaliar o escopo.',
      },
    },

    /* ===================================================================
       ENGENHARIA
       =================================================================== */
    engenharia: {
      hero: {
        eyebrow: 'Capacidade técnica',
        title: 'Engenharia e planejamento de obras industriais',
        lead: 'Executar bem é consequência de planejar bem. A MHR estrutura cada obra com planejamento, execução, controle e entrega documentada — com responsabilidade técnica e CREA/ART quando aplicável.',
      },
      flow: {
        eyebrow: 'Do escopo à entrega',
        title: 'Planejamento, execução, controle e entrega',
        lead: 'O fluxo é aplicado de forma proporcional ao porte do serviço, garantindo rastreabilidade desde o levantamento inicial até a documentação final.',
      },
      deliverables: {
        eyebrow: 'Documentação técnica',
        title: 'Entregáveis de engenharia e controle',
        lead: 'Os itens abaixo podem ser aplicados ao projeto conforme o escopo contratado e as exigências do cliente.',
      },
      control: {
        eyebrow: 'Visibilidade de obra',
        title: 'Controle que acompanha a execução',
        p1: 'O controle de obras permite identificar desvios de prazo e produtividade enquanto ainda há tempo de agir. Medições e relatórios diários alimentam o cronograma e sustentam a tomada de decisão durante a execução.',
        p2: 'A documentação de obra também protege o cliente: registra o que foi executado, as alterações de escopo e as condições em que os serviços foram realizados.',
      },
      responsibility: {
        eyebrow: 'CREA / ART',
        title: 'Execução com responsabilidade técnica registrada',
        text: 'Serviços industriais exigem responsabilidade formal sobre o que é executado. A MHR atua com responsabilidade técnica e CREA/ART quando aplicável, garantindo acompanhamento profissional e registro adequado das intervenções.',
      },
      cta: {
        eyebrow: 'Obra planejada',
        title: 'Sua obra com planejamento e documentação',
        text: 'Apresente o escopo e conheça a estrutura de planejamento e controle que a MHR aplica aos serviços industriais.',
      },
    },

    /* ===================================================================
       SEGURANÇA E QUALIDADE
       =================================================================== */
    seguranca: {
      hero: {
        eyebrow: 'Compromisso',
        title: 'Segurança, responsabilidade e qualidade',
        lead: 'Serviço industrial bem executado é serviço executado com segurança. A MHR organiza suas frentes de trabalho conforme os requisitos de segurança aplicáveis e mantém responsabilidade técnica sobre o que executa.',
      },
      principles: {
        eyebrow: 'Execução segura',
        title: 'Segurança como requisito de execução',
        p1: 'Antes da mobilização, cada frente de serviço é avaliada quanto aos riscos envolvidos, aos requisitos de acesso e às normas aplicáveis à planta. A execução só avança com as condições de segurança atendidas.',
        p2: 'Essa disciplina protege as equipes da MHR, as equipes do cliente e a continuidade da operação industrial.',
      },
      technical: {
        eyebrow: 'CREA / ART',
        title: 'Responsabilidade técnica e CREA/ART quando aplicável',
        lead: 'A responsabilidade técnica é o que diferencia execução industrial de trabalho improvisado. Ela garante acompanhamento profissional, critérios definidos e registro formal das intervenções.',
      },
      quality: {
        eyebrow: 'Execução verificada',
        title: 'Qualidade aplicada ao serviço executado',
        lead: 'Qualidade, na prática, é executar conforme o especificado, verificar o resultado e registrar o que foi feito. É esse ciclo que sustenta a confiabilidade dos equipamentos após a intervenção.',
      },
      cta: {
        eyebrow: 'Execução responsável',
        title: 'Serviço executado com segurança e registro técnico',
        text: 'Apresente a sua demanda e conheça como a MHR aplica segurança, responsabilidade técnica e qualidade em campo.',
      },
    },

    /* ===================================================================
       CONTATO
       =================================================================== */
    contato: {
      hero: {
        eyebrow: 'Atendimento',
        title: 'Fale com a engenharia da MHR',
        lead: 'Envie sua demanda de montagem, manutenção, fabricação ou engenharia industrial. Descreva o escopo e a janela disponível para que a equipe técnica avalie a melhor composição de execução.',
      },
      channels: {
        eyebrow: 'Dados de contato',
        title: 'Onde nos encontrar',
        lead: 'Fale com a MHR por telefone ou WhatsApp, acompanhe os trabalhos nas redes sociais ou envie sua demanda diretamente pelo formulário abaixo.',
      },
      form: {
        eyebrow: 'Solicitar orçamento',
        title: 'Descreva a sua demanda',
        lead: 'Quanto mais detalhes sobre o escopo, o local e o prazo, mais precisa será a análise técnica da MHR.',
      },
      cta: {
        eyebrow: 'Análise técnica',
        title: 'Sua demanda avaliada pela equipe de engenharia',
        text: 'Cada solicitação é analisada considerando escopo, disciplina envolvida, prazo e condições de execução em planta.',
      },
    },

    /* ===================================================================
       ATUAÇÃO NACIONAL
       =================================================================== */
    atuacao: {
      hero: {
        eyebrow: 'Abrangência',
        title: 'Atuação Nacional — MHR Engenharia',
        lead: 'Mobilizamos equipes técnicas em todo o território nacional conforme o escopo, o prazo, a localização e os requisitos de cada projeto.',
      },
      mobilization: {
        eyebrow: 'Como definimos a mobilização',
        title: 'Atendimento conforme escopo e localização',
        lead: 'A composição das equipes e dos recursos é dimensionada caso a caso, considerando o escopo, o prazo e a localização do serviço.',
        p1: 'Atuamos em operações industriais de mineração, beneficiamento mineral, agroindústria e infraestrutura industrial, com mobilização de equipes técnicas conforme as necessidades de cada contrato.',
        p2: 'A base operacional fica em Varginha/MG e o planejamento de mobilização é definido junto com o cliente, considerando a janela de execução e as condições da planta.',
      },
      services: {
        eyebrow: 'Serviços mobilizáveis',
        title: 'Serviços que atendemos em campo',
      },
      cta: {
        eyebrow: 'Em todo o Brasil',
        title: 'Sua operação fica onde?',
        text: 'Informe a localização, o escopo e o prazo para avaliarmos a mobilização da equipe.',
      },
    },

    /* ===================================================================
       SERVIÇO: PARADAS DE MANUTENÇÃO
       =================================================================== */
    paradas: {
      hero: {
        eyebrow: 'Serviço',
        title: 'Paradas de Manutenção Industrial',
        lead: 'A MHR Engenharia executa serviços durante paradas programadas de manutenção industrial, com mobilização de equipes e recursos conforme o escopo e a janela operacional definida pelo cliente.',
      },
      scope: {
        eyebrow: 'Frentes executadas',
        title: 'Serviços executados na janela de parada',
        text: 'Atuamos em manutenção mecânica, montagem e desmontagem de equipamentos, caldeiraria, soldagem, estruturas, adequações e serviços elétricos/instrumentação quando aplicáveis.',
      },
      control: {
        eyebrow: 'Integração ao planejamento',
        title: 'Execução integrada ao planejamento',
        text: 'A execução pode ser integrada ao planejamento do cliente, com acompanhamento de cronograma, registros de campo, medições e documentação de execução.',
      },
      cta: {
        eyebrow: 'Parada programada',
        title: 'Planeje sua parada com a MHR',
        text: 'Envie o escopo e a janela disponível para avaliarmos a composição de equipes e a sequência de execução.',
      },
    },

    /* ===================================================================
       SEGMENTO: MINERAÇÃO
       =================================================================== */
    mineracao: {
      hero: {
        eyebrow: 'Segmento',
        title: 'Montagem e Manutenção Eletromecânica para Mineração',
        lead: 'A MHR Engenharia atua na execução de serviços de montagem e manutenção eletromecânica para operações de mineração, beneficiamento mineral e infraestrutura de plantas industriais.',
      },
      applications: {
        eyebrow: 'Onde atuamos',
        title: 'Aplicações em plantas de mineração',
        text: 'Entre as aplicações estão plantas de beneficiamento, britagem, moagem, peneiramento, correias e transportadores, estruturas e sistemas auxiliares.',
      },
      services: {
        eyebrow: 'Frentes aplicadas',
        title: 'Serviços aplicados a este segmento',
        lead: 'Serviços executados conforme o escopo contratado e as necessidades da operação.',
      },
      national: {
        eyebrow: 'Atuação nacional',
        title: 'Equipes mobilizadas em todo o Brasil',
        lead: 'A MHR mobiliza equipes técnicas para projetos em diferentes regiões do Brasil, de acordo com o escopo, prazo e requisitos do cliente.',
      },
      cta: {
        eyebrow: 'Mineração',
        title: 'Precisa de apoio na sua planta?',
        text: 'Apresente o escopo e as condições da operação para avaliarmos a melhor composição de execução.',
      },
    },

    /* ===================================================================
       SEGMENTO: AGROINDÚSTRIA
       =================================================================== */
    agroindustria: {
      hero: {
        eyebrow: 'Segmento',
        title: 'Montagem e Manutenção Industrial para Agroindústria',
        lead: 'A MHR Engenharia executa serviços de montagem e manutenção industrial para operações agroindustriais, incluindo instalações de armazenagem, movimentação e processamento de grãos.',
      },
      applications: {
        eyebrow: 'Onde atuamos',
        title: 'Aplicações em unidades agroindustriais',
        text: 'Atuamos em instalações de armazenagem, movimentação e processamento de grãos, conforme o escopo contratado e as condições da unidade.',
      },
      services: {
        eyebrow: 'Frentes aplicadas',
        title: 'Serviços aplicados a este segmento',
        lead: 'Serviços executados conforme o escopo contratado e as necessidades da operação.',
      },
      cta: {
        eyebrow: 'Agroindústria',
        title: 'Precisa de apoio na sua unidade?',
        text: 'Apresente o escopo e as condições da operação para avaliarmos a melhor composição de execução.',
      },
    },

    /* ===================================================================
       404
       =================================================================== */
    erro404: {
      main: {
        eyebrow: 'Página não encontrada',
        title: 'Este endereço não corresponde a uma página da MHR',
        text: 'O link pode estar incorreto ou o conteúdo pode ter sido movido. Utilize a navegação para acessar as áreas institucionais da empresa.',
      },
    },
  };

  /* --------------------------------------------------------------------
     Esquema do painel: página → grupos → campos.
     t: 'text' (padrão) | 'textarea' | 'lines' (uma linha por item)
     -------------------------------------------------------------------- */
  MHR.pagesSchema = [
    {
      page: 'home',
      label: 'Home',
      groups: [
        { title: 'Banner no-JS (reserva)', fields: [
          { k: 'hero.eyebrow', l: 'Rótulo' },
          { k: 'hero.title', l: 'Título', full: true },
          { k: 'hero.text', l: 'Texto', t: 'textarea', full: true },
        ] },
        { title: 'Seção A Empresa', fields: [
          { k: 'about.eyebrow', l: 'Rótulo' },
          { k: 'about.title', l: 'Título', full: true },
          { k: 'about.lead', l: 'Texto de apoio', t: 'textarea', full: true },
          { k: 'about.items', l: 'Lista (um item por linha)', t: 'lines', full: true },
        ] },
        { title: 'Seção Equipe', fields: [
          { k: 'team.eyebrow', l: 'Rótulo' },
          { k: 'team.title', l: 'Título', full: true },
          { k: 'team.lead', l: 'Texto de apoio', t: 'textarea', full: true },
          { k: 'team.chips', l: 'Disciplinas (uma por linha)', t: 'lines', full: true },
        ] },
        { title: 'Seção Serviços (cabeçalho)', fields: [
          { k: 'services.eyebrow', l: 'Rótulo' },
          { k: 'services.title', l: 'Título', full: true },
          { k: 'services.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Seção Segmentos (cabeçalho)', fields: [
          { k: 'segments.eyebrow', l: 'Rótulo' },
          { k: 'segments.title', l: 'Título', full: true },
          { k: 'segments.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Capacidade técnica', fields: [
          { k: 'capacity.eyebrow', l: 'Rótulo' },
          { k: 'capacity.title', l: 'Título', full: true },
          { k: 'capacity.text', l: 'Texto', t: 'textarea', full: true },
          { k: 'capacity.hseLabel', l: 'Rótulo HSE' },
          { k: 'capacity.hseText', l: 'Texto HSE', t: 'textarea', full: true },
        ] },
        { title: 'Contato (resumo)', fields: [
          { k: 'contact.eyebrow', l: 'Rótulo' },
          { k: 'contact.title', l: 'Título', full: true },
          { k: 'contact.lead', l: 'Texto de apoio', t: 'textarea', full: true },
          { k: 'contact.chips', l: 'Temas (um por linha)', t: 'lines', full: true },
        ] },
      ],
    },
    {
      page: 'empresa',
      label: 'A Empresa',
      groups: [
        { title: 'Topo da página', fields: [
          { k: 'hero.eyebrow', l: 'Rótulo' },
          { k: 'hero.title', l: 'Título', full: true },
          { k: 'hero.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Quem somos', fields: [
          { k: 'about.eyebrow', l: 'Rótulo' },
          { k: 'about.title', l: 'Título', full: true },
          { k: 'about.lead', l: 'Primeiro parágrafo', t: 'textarea', full: true },
          { k: 'about.p1', l: 'Segundo parágrafo', t: 'textarea', full: true },
          { k: 'about.p2', l: 'Terceiro parágrafo', t: 'textarea', full: true },
        ] },
        { title: 'Dados cadastrais', fields: [
          { k: 'data.eyebrow', l: 'Rótulo' },
          { k: 'data.title', l: 'Título', full: true },
        ] },
        { title: 'Equipe técnica', fields: [
          { k: 'team.eyebrow', l: 'Rótulo' },
          { k: 'team.title', l: 'Título', full: true },
          { k: 'team.lead', l: 'Texto de apoio', t: 'textarea', full: true },
          { k: 'team.execTitle', l: 'Título — equipe de execução' },
          { k: 'team.execText', l: 'Texto — equipe de execução', t: 'textarea', full: true },
          { k: 'team.discTitle', l: 'Título — disciplinas' },
          { k: 'team.discText', l: 'Texto — disciplinas', t: 'textarea', full: true },
        ] },
        { title: 'Como trabalhamos', fields: [
          { k: 'method.eyebrow', l: 'Rótulo' },
          { k: 'method.title', l: 'Título', full: true },
        ] },
        { title: 'Área de atendimento', fields: [
          { k: 'area.eyebrow', l: 'Rótulo' },
          { k: 'area.title', l: 'Título', full: true },
          { k: 'area.lead', l: 'Texto de apoio', t: 'textarea', full: true },
          { k: 'area.items', l: 'Lista (um item por linha)', t: 'lines', full: true },
          { k: 'area.panelTitle', l: 'Painel — rótulo' },
        ] },
        { title: 'Faixa final (CTA)', fields: [
          { k: 'cta.eyebrow', l: 'Rótulo' },
          { k: 'cta.title', l: 'Título', full: true },
          { k: 'cta.text', l: 'Texto', t: 'textarea', full: true },
        ] },
      ],
    },
    {
      page: 'servicos',
      label: 'Serviços',
      groups: [
        { title: 'Topo da página', fields: [
          { k: 'hero.eyebrow', l: 'Rótulo' },
          { k: 'hero.title', l: 'Título', full: true },
          { k: 'hero.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Execução integrada', fields: [
          { k: 'integration.eyebrow', l: 'Rótulo' },
          { k: 'integration.title', l: 'Título', full: true },
          { k: 'integration.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Faixa final (CTA)', fields: [
          { k: 'cta.eyebrow', l: 'Rótulo' },
          { k: 'cta.title', l: 'Título', full: true },
          { k: 'cta.text', l: 'Texto', t: 'textarea', full: true },
        ] },
      ],
    },
    {
      page: 'segmentos',
      label: 'Segmentos',
      groups: [
        { title: 'Topo da página', fields: [
          { k: 'hero.eyebrow', l: 'Rótulo' },
          { k: 'hero.title', l: 'Título', full: true },
          { k: 'hero.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Lista de segmentos', fields: [
          { k: 'list.eyebrow', l: 'Rótulo' },
          { k: 'list.title', l: 'Título', full: true },
          { k: 'list.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Capacidade', fields: [
          { k: 'capacity.eyebrow', l: 'Rótulo' },
          { k: 'capacity.title', l: 'Título', full: true },
          { k: 'capacity.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Faixa final (CTA)', fields: [
          { k: 'cta.eyebrow', l: 'Rótulo' },
          { k: 'cta.title', l: 'Título', full: true },
          { k: 'cta.text', l: 'Texto', t: 'textarea', full: true },
        ] },
      ],
    },
    {
      page: 'engenharia',
      label: 'Engenharia',
      groups: [
        { title: 'Topo da página', fields: [
          { k: 'hero.eyebrow', l: 'Rótulo' },
          { k: 'hero.title', l: 'Título', full: true },
          { k: 'hero.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Fluxo de trabalho (cabeçalho)', fields: [
          { k: 'flow.eyebrow', l: 'Rótulo' },
          { k: 'flow.title', l: 'Título', full: true },
          { k: 'flow.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Entregáveis (cabeçalho)', fields: [
          { k: 'deliverables.eyebrow', l: 'Rótulo' },
          { k: 'deliverables.title', l: 'Título', full: true },
          { k: 'deliverables.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Controle', fields: [
          { k: 'control.eyebrow', l: 'Rótulo' },
          { k: 'control.title', l: 'Título', full: true },
          { k: 'control.p1', l: 'Primeiro parágrafo', t: 'textarea', full: true },
          { k: 'control.p2', l: 'Segundo parágrafo', t: 'textarea', full: true },
        ] },
        { title: 'Responsabilidade técnica', fields: [
          { k: 'responsibility.eyebrow', l: 'Rótulo' },
          { k: 'responsibility.title', l: 'Título', full: true },
          { k: 'responsibility.text', l: 'Texto', t: 'textarea', full: true },
        ] },
        { title: 'Faixa final (CTA)', fields: [
          { k: 'cta.eyebrow', l: 'Rótulo' },
          { k: 'cta.title', l: 'Título', full: true },
          { k: 'cta.text', l: 'Texto', t: 'textarea', full: true },
        ] },
      ],
    },
    {
      page: 'seguranca',
      label: 'Segurança e Qualidade',
      groups: [
        { title: 'Topo da página', fields: [
          { k: 'hero.eyebrow', l: 'Rótulo' },
          { k: 'hero.title', l: 'Título', full: true },
          { k: 'hero.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Princípios', fields: [
          { k: 'principles.eyebrow', l: 'Rótulo' },
          { k: 'principles.title', l: 'Título', full: true },
          { k: 'principles.p1', l: 'Primeiro parágrafo', t: 'textarea', full: true },
          { k: 'principles.p2', l: 'Segundo parágrafo', t: 'textarea', full: true },
        ] },
        { title: 'Responsabilidade técnica', fields: [
          { k: 'technical.eyebrow', l: 'Rótulo' },
          { k: 'technical.title', l: 'Título', full: true },
          { k: 'technical.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Qualidade', fields: [
          { k: 'quality.eyebrow', l: 'Rótulo' },
          { k: 'quality.title', l: 'Título', full: true },
          { k: 'quality.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Faixa final (CTA)', fields: [
          { k: 'cta.eyebrow', l: 'Rótulo' },
          { k: 'cta.title', l: 'Título', full: true },
          { k: 'cta.text', l: 'Texto', t: 'textarea', full: true },
        ] },
      ],
    },
    {
      page: 'contato',
      label: 'Contato',
      groups: [
        { title: 'Topo da página', fields: [
          { k: 'hero.eyebrow', l: 'Rótulo' },
          { k: 'hero.title', l: 'Título', full: true },
          { k: 'hero.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Canais', fields: [
          { k: 'channels.eyebrow', l: 'Rótulo' },
          { k: 'channels.title', l: 'Título', full: true },
          { k: 'channels.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Formulário (cabeçalho)', fields: [
          { k: 'form.eyebrow', l: 'Rótulo' },
          { k: 'form.title', l: 'Título', full: true },
          { k: 'form.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Faixa final (CTA)', fields: [
          { k: 'cta.eyebrow', l: 'Rótulo' },
          { k: 'cta.title', l: 'Título', full: true },
          { k: 'cta.text', l: 'Texto', t: 'textarea', full: true },
        ] },
      ],
    },
    {
      page: 'atuacao',
      label: 'Atuação Nacional',
      groups: [
        { title: 'Topo da página', fields: [
          { k: 'hero.eyebrow', l: 'Rótulo' },
          { k: 'hero.title', l: 'Título', full: true },
          { k: 'hero.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Mobilização', fields: [
          { k: 'mobilization.eyebrow', l: 'Rótulo' },
          { k: 'mobilization.title', l: 'Título', full: true },
          { k: 'mobilization.lead', l: 'Texto de apoio', t: 'textarea', full: true },
          { k: 'mobilization.p1', l: 'Parágrafo 1', t: 'textarea', full: true },
          { k: 'mobilization.p2', l: 'Parágrafo 2', t: 'textarea', full: true },
        ] },
        { title: 'Serviços mobilizáveis', fields: [
          { k: 'services.eyebrow', l: 'Rótulo' },
          { k: 'services.title', l: 'Título', full: true },
        ] },
        { title: 'Faixa final (CTA)', fields: [
          { k: 'cta.eyebrow', l: 'Rótulo' },
          { k: 'cta.title', l: 'Título', full: true },
          { k: 'cta.text', l: 'Texto', t: 'textarea', full: true },
        ] },
      ],
    },
    {
      page: 'paradas',
      label: 'Serviço: Paradas',
      groups: [
        { title: 'Topo da página', fields: [
          { k: 'hero.eyebrow', l: 'Rótulo' },
          { k: 'hero.title', l: 'Título', full: true },
          { k: 'hero.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Atuação na parada', fields: [
          { k: 'scope.eyebrow', l: 'Rótulo' },
          { k: 'scope.title', l: 'Título', full: true },
          { k: 'scope.text', l: 'Texto', t: 'textarea', full: true },
        ] },
        { title: 'Controle', fields: [
          { k: 'control.eyebrow', l: 'Rótulo' },
          { k: 'control.title', l: 'Título', full: true },
          { k: 'control.text', l: 'Texto', t: 'textarea', full: true },
        ] },
        { title: 'Faixa final (CTA)', fields: [
          { k: 'cta.eyebrow', l: 'Rótulo' },
          { k: 'cta.title', l: 'Título', full: true },
          { k: 'cta.text', l: 'Texto', t: 'textarea', full: true },
        ] },
      ],
    },
    {
      page: 'mineracao',
      label: 'Segmento: Mineração',
      groups: [
        { title: 'Topo da página', fields: [
          { k: 'hero.eyebrow', l: 'Rótulo' },
          { k: 'hero.title', l: 'Título', full: true },
          { k: 'hero.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Aplicações', fields: [
          { k: 'applications.eyebrow', l: 'Rótulo' },
          { k: 'applications.title', l: 'Título', full: true },
          { k: 'applications.text', l: 'Texto', t: 'textarea', full: true },
        ] },
        { title: 'Serviços', fields: [
          { k: 'services.eyebrow', l: 'Rótulo' },
          { k: 'services.title', l: 'Título', full: true },
          { k: 'services.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Abrangência', fields: [
          { k: 'national.eyebrow', l: 'Rótulo' },
          { k: 'national.title', l: 'Título', full: true },
          { k: 'national.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Faixa final (CTA)', fields: [
          { k: 'cta.eyebrow', l: 'Rótulo' },
          { k: 'cta.title', l: 'Título', full: true },
          { k: 'cta.text', l: 'Texto', t: 'textarea', full: true },
        ] },
      ],
    },
    {
      page: 'agroindustria',
      label: 'Segmento: Agroindústria',
      groups: [
        { title: 'Topo da página', fields: [
          { k: 'hero.eyebrow', l: 'Rótulo' },
          { k: 'hero.title', l: 'Título', full: true },
          { k: 'hero.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Aplicações', fields: [
          { k: 'applications.eyebrow', l: 'Rótulo' },
          { k: 'applications.title', l: 'Título', full: true },
          { k: 'applications.text', l: 'Texto', t: 'textarea', full: true },
        ] },
        { title: 'Serviços', fields: [
          { k: 'services.eyebrow', l: 'Rótulo' },
          { k: 'services.title', l: 'Título', full: true },
          { k: 'services.lead', l: 'Texto de apoio', t: 'textarea', full: true },
        ] },
        { title: 'Faixa final (CTA)', fields: [
          { k: 'cta.eyebrow', l: 'Rótulo' },
          { k: 'cta.title', l: 'Título', full: true },
          { k: 'cta.text', l: 'Texto', t: 'textarea', full: true },
        ] },
      ],
    },
    {
      page: 'erro404',
      label: 'Página 404',
      groups: [
        { title: 'Conteúdo', fields: [
          { k: 'main.eyebrow', l: 'Rótulo' },
          { k: 'main.title', l: 'Título', full: true },
          { k: 'main.text', l: 'Texto', t: 'textarea', full: true },
        ] },
      ],
    },
  ];
})((window.MHR = window.MHR || {}));
