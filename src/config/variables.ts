//Textos do Banner
export const TitleBanner = 'Solicite um crédito para seu negócio'
export const TextBanner = 'Rápido, simples, sem burocracia'

//textos dos pontos forte
export const PontosForte = {
    title: 'Por que C4B é diferente?',
    pontos: [
        {
            title: 'Liquidez',
            description: 'Cristalize os planos para fazer crescer seu negócio.',
            image: 'img_item_01.jpg',
            altText: 'Imagen 1'
        },
        {
            title: 'Facil de solicitar',
            description: 'O processo é online, ' +
            'e você recebe a resposta no seu e-mail.',
            image: 'img_item_02.jpg',
            altText: 'Imagen 2'
        },
        {
            title: 'Faça crescer seu negócio',
            description: 'A rapidez de resposta ajuda você planejar melhor.',
            image: 'img_item_03.jpg',
            altText: 'Imagen 3'
        }
    ]
}


// Textos do error
export const errorMsgs = {
    tooManyRequests: 'Por favor, tente de novo mais tarde',
}

//Textos  do form
export const TitleForm = 'Solicite seu crédito em 2 passos'

//textos de informações
export const Infos = {
    title: 'C4B é a resposta para sua necessidade de crédito',
    infosList: [
        {
            text: 'O processo de solicitação é simples e ' +
            'sem burocracia, você só precisa ' +
            'preencher o formulário e esperar a resposta por e-mail. ' +
            'C4B foi desenhado para ' +
            'você não precisar se deslocar.',
            img: 'info-img1.jpg'
        },
        {
            text: 'Crédito a medida de sua empresa. ' +
            'C4B permite calcular com antecipação ' +
            'a quantidade solicitada para que esteja dentro das ' +
            'possibilidades do seu negócio. ' +
            'Você pode decidir as parcelas e organizar melhor suas finanças.',
            img: 'info-img3.jpg'
        },
        {
            text: 'O processo é digitalizado para facilitar ' +
            'o envío de informações, ' +
            'esqueça de ter que agendar visitas ao banco ou ' + 
            'de perder tempo em trámites ' +
            'burocráticos. Você faz a solicitação desde seu ' +
            'computador e recebe a resposta ' +
            'no seu computador',
            img: 'info-img4.jpg'
        }
    ]}

// Array of questions and answer
export const FaqsInfo = {
    title: 'FAQ',
    faqs: [
        {
            question: 'Preciso comprovar faturamento?', 
            answer: 'Sim, porém, nosso processo ' +
            'permite solicitar um crédito a medida de seu faturamento.'
        },
        { 
            question: 'Existe algúm processo além de preencher o formulário?',
            answer: 'Não, você só precisa preencher o formulário e C4B faz o '+
            'trabalho. Você faz a solicitação desde ' +
            'seu computador e recebe a resposta no seu computador.'
        },
        {
            question: 'É seguro?',
            answer: 'Todo o processo garante segurança e transparência. ' +
            'São solicitadas o mínimo de informações necessárias para ' +
            'tramitar o crédito.'
        }
    ]
}

export const CreditData = {
    text: {
        titleLimits: 'De quanto seu negócio precisa',
        creditLimits: [
            {
                id: 10000,
                name: 'creditLimit',
                label: 'R$10.000 - R$100.000'
            },
            {
                id: 500000,
                name: 'creditLimit',
                label: 'R$100.001 - R$500.000'
            },
            {
                id: 1000000,
                name: 'creditLimit',
                label: 'R$500.001 - R$1.000.000'
            },
            {
                id: 5000000,
                name: 'creditLimit',
                label: 'R$1.000.001 - R$5.000.000'
            }
        ],
        titleInstallments: 'Em quantas vezes você quer pagar?',
        creditInstallments: [
            {
                id: 6,
                name: 'installments',
                label: '6x'
            },
            {
                id: 12,
                name: 'installments',
                label: '12x'
            },
            {
                id: 24,
                name: 'installments',
                label: '24x'
            },
            {
                id: 36,
                name: 'installments',
                label: '36x'
            }
        ],
        titleMotivo: 'Qual o motivo da sua solicitação de crédito?',
        listReasons: [
            'Capital de giro',
            'Pagamento de folha ou 13º salário',
            'Compra de equipamentos',
            'Investimento em infraestrutura',
            'Compra de insumos e produtos',
            'Outros'
        ],
        errors: ['Você precisa escolher um motivo válido!']
    }
}

// Array for the text of terms
export const Terms = [
    {
        text: 'Atendendo ao disposto na Resolução CMN nº 4571/2017 (“Resolução'+
        'SCR”), e, no artigo 1º da Resolução CMN nº 3920/2010, conforme'+
        'alteradas, as empresas abaixo elencadas e representadas (“Empresas”)'+
        'autorizam, em caráter irrevogável e irretratável o Banco ABC Brasil'+
        'S.A, bem como às demais empresas do Grupo ABC e seus eventuais'+
        'sucessores, a consultar as informações relativas a estas ou às'+
        'operações de crédito e operações no mercado de câmbio que estas'+
        'realizem ou venham a realizar, conforme disponibilizadas pelo SCR –'+
        'Sistema de Informações de Créditos do Banco Central do Brasil e pelo'+
        'SISBACEN – Sistema de Informações do Banco Central do Brasil, ou por'+
        'qualquer outro sistema que venha a sucedê-los.'
    },
    {
        text: 'As Empresas autorizam ainda, em caráter ' + 
        'irrevogável e irretratável,'+
        'que referidas informações, no que tange a operações por estas'+
        'realizadas junto ao Banco ABC Brasil S.A., sejam por este, bem como'+
        'por demais empresas do Grupo ABC e seus eventuais sucessores,'+
        'registradas junto a referidos sistemas.'
    },
    {
        text: ' A finalidade e o uso de tais informações estão relacionados à'+
        'operações de crédito, nos termos do art.3º da Resolução SCR, tendo'+
        'como finalidades específicas: (i) o fornecimento de informações ao'+
        'Banco Central do Brasil para fins de monitoramento do crédito no'+
        'sistema financeiro e para o exercício de suas atividades de'+
        'fiscalização e (ii) propiciar o intercâmbio, entre as instituições'+
        'financeiras sujeitas ao dever de conservar o sigilo bancário de que'+
        'trata a Lei Complementar nº 105/2001, das informações referentes a'+
        'débitos e responsabilidades de seus clientes em quaisquer operações'+
        'de crédito, com o objetivo de subsidiar decisões negociais e de'+
        'crédito.'
    },
    {
        text: '  As Empresas declaram-se cientes de que poderão consultar as'+
        'informações do SCR por meio do site do Registrato – Extrato do'+
        'Registro de Informações no BACEN ou na Central de Atendimento ao'+
        'Público do BACEN.'
    },
    {
        text: ' As eventuais manifestações de discordância ' +
        'quanto às informações'+
        'constantes do SCR e os pedidos de correções, exclusões e registros'+
        'de medidas judiciais no SCR deverão ser dirigidos ao Banco ABC'+
        'Brasil S.A, por meio de requerimento escrito e devidamente assinado'+
        'pelo(s) representante(s) das Empresas, conforme o caso, acompanhado'+
        'da respectiva decisão judicial, quando aplicável, observado o'+
        'disposto nos artigos 11 e 12 da Circular BACEN nº 3.870, de 19 de'+
        'dezembro de 2017.'
    },
    {
        text: '  Ainda, as Empresas desde já concordam ' +
        'expressamente em estender a'+
        'presente autorização de consulta ao SCR às demais instituições'+
        'autorizadas a consulta-lo, nos termos da Resolução SCR, que venham a'+
        'adquirir ou receber em garantia, ou que manifestem interesse em'+
        'adquirir ou receber em garantia, total ou parcialmente, a presente'+
        'operação de crédito.'
    }
]

// Sucess form
export const SucessMessage = [
    'recebemos sua solicitação ',
    'Obrigado pelo seu interesse!',
    'Em breve entraremos em contato!'
]

//feedback form
export const FeedbackConfiguration = {
    text: {
        title: 'Você tem alguma dúvida ou sugestão?',
        success: [
            'Recebemos seus comentários, obrigado pelo seu interesse!',
            'Em breve entraremos em contato!'
        ],
        errorTextArea: [['A mensagem precisa ser maior que 10 caracteres']],
        formInputInfolist: [
            {
                placeholder: 'Nome completo',
                error: ['O nome deve ter entre 2 e 150 caracteres!']
            },
            {
                placeholder: 'E-mail',
                error: ['O email é inválido!'],
            },
        ]
    }
}

export const UserConfiguration = {
    text: {
        formInputsInfo: [
            {
                type: 'text',
                name: 'name',
                placeholder: 'Nome Completo',
                mask: '',
                error: ['O nome é obrigatório.'],
            },
            {
                type: 'email',
                name: 'email',
                mask: '',
                placeholder: 'E-mail',
                error: ['O email é obrigatório e deve ser válido!']
            },
            {
                type: 'text',
                name: 'cellphone',
                mask: '(##) #####-####',
                placeholder: 'Celular',
                error: ['O número é obrigatório e deve ser válido!']
            },
            {
                type: 'text',
                name: 'cnpj',
                mask: '##.###.###/####-##',
                placeholder: 'CNPJ',
                error: ['O CNPJ é obrigatório e deve ser válido!']
            },
            {
                type: 'text',
                name: 'company',
                mask: '',
                placeholder: 'Nome da Empresa',
                error: ['O nome da empresa é obrigatório!']
            }
        ]
    }
}

export const BankInfoFormConfiguration = {
    title: 'Insira seus dados bancários',
    formInputsInfo: [
        {
            name: 'branch' as const,
            type: 'text',
            placeholder: 'Agência',
            error: ['A agência é inválida!'],
            mask: ['####', '####-#', '####-##']
        },
        {
            name: 'checkingAccount' as const,
            type: 'text',
            placeholder: 'Conta Corrente',
            error: ['A conta é inválida!'],
            mask: ['#####-#', '######-#', '#######-#', '########-#',
                '#########-#', '###########-#']
        },
    ],
    submittLabel: 'Enviar'
}

export const ListItemsNavBar = [
    {
        title: 'Solicite seu crédito',
        href: '#form-request'
    },
    {
        title: 'Informações',
        href: '#information-section'
    },
    {
        title: 'FAQ',
        href: '#faq-section'
    }
]

export const ListItemsNavBarBankForm = [
    {
        title: 'Nova Solicitação de Crédito',
        href: '/#form-request'
    },
    {
        title: 'Informações',
        href: '/#information-section'
    },
    {
        title: 'FAQ',
        href: '/#faq-section'
    }
]