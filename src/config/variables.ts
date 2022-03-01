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
                'possibilidades do seu negócio. Você pode decidir as parcelas' +
                ' e organizar melhor suas finanças.',
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
    ]
}

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
            answer: 'Não, você só precisa preencher o formulário e C4B faz o ' +
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
        titleFaturamento: 'Faturamento mensal recomendado seria:',
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
export const Terms = {
    textTerm: 'de relacionamento com o C4B. Autorizo a consulta de SRC e'+
    ' da Agenda de recebíveis da empresa.',
    modal: {
        title: 'Termos e condições',
        headerText: 'Informação de uso publico',
        headerTitle: 'Autorização',
        list: [
            {
                text: ''
            },
            {
                text: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos,' +
                'e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja' +
                'de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não' +
                'só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente' +
                'inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum,' +
                'e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.'
            },
            {
                text:' Ao contrário do que se acredita, Lorem Ipsum não é simplesmente um texto randômico.' +
                'Com mais de 2000 anos, suas raízes podem ser encontradas em uma obra de literatura latina' +
                'clássica datada de 45 AC. Richard McClintock, um professor de latim do Hampden-Sydney College na Virginia,'+
                ' pesquisou uma das mais obscuras palavras em latim, consectetur, oriunda de uma passagem de Lorem Ipsum, e,'+
                ' procurando por entre citações da palavra na literatura clássica, descobriu a sua indubitável origem.'+
                ' Lorem Ipsum vem das seções 1.10.32 e 1.10.33 do "de Finibus Bonorum et Malorum" (Os Extremos do Bem e do Mal),'+
                'de Cícero, escrito em 45 AC. Este livro é um tratado de teoria da ética muito popular na época da Renascença. ' +
                'A primeira linha de Lorem Ipsum, "Lorem Ipsum dolor sit amet..." vem de uma linha na seção 1.10.32.'
            }
        ]
    }
}

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
        optin: {
            error: ['Precisa aceitar os termos e condições!']
        },
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

export const ContractConfiguration = {
    text: {
        pw_exemple: 'A senha é o CNPJ usando . - e /. exemplo: ' +
            '(19.259.103/0001-07)',
        list: [
            {
                name: 'acceptTerms',
                text: 'Li e acepto os Termos e Condições de ' +
                    'Relacionamento com o C4B. Declaro que tenho poderes'+
                    ' de assinatura pela empresa e autorizo a ' +
                    'assinatura eletrônica.',
                errors: ['Precisa aceitar os termos e condições!']
            },
            {
                name: 'authorizeSCR',
                text: 'Autorizo a Consulta de SCR e da Agenda de ' +
                    'Recebíveis e ac eito os Termos de Sigilo Bancário',
                errors: ['Precisa autorizar a consulta de SCR!']
            },
            {
                name: 'existsPEP',
                text: 'Na empresa, há alguma Pessoa Exposta ' +
                    'Publicamente (PEP) em uma função de administração, ' +
                    'controle direto ou indireto, direção, procuração ou ' + 
                    'representação?',
                errors: ['Precisa responder a pergunta sobre a PEP!']
            },
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
    submittLabel: 'Próximo'
}

export const ListItemsNavBar = [
    {
        title: 'Solicite seu crédito',
        href: 'column-two'
    },
    {
        title: 'Informações',
        href: 'information-section'
    },
    {
        title: 'FAQ',
        href: 'faq-section'
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

export const RatingChips = {
    text: {
        titleChips: 'Gostou do processo?',
        ratingChips: [
            {
                id: 1,
                name: 'ratingChip',
                label: 'Simples de usar'
            },
            {
                id: 2,
                name: 'ratingChip',
                label: 'Visual lindo'
            },
            {
                id: 3,
                name: 'ratingChip',
                label: 'Informações organizadas'
            },
            {
                id: 4,
                name: 'ratingChip',
                label: 'Pode melhorar'
            }
        ],
        errors: ['Você precisa escolher um motivo válido!']
    }
}

export const FooterConfiguration = {
    list: [
        {
            title: 'Sobre nós',
            text: 'C4B - Voyager',
            link: 'https://github.com/42voyager'
        },
        {
            title: 'SAC',
            text: '0888 888 88 99',
            link: ''
        },
        {
            title: 'Ouvidoria',
            text: '845-333-5555',
            link: ''
        },
        {
            title: 'Localização',
            text: 'Bairro Rua do Sol, Springfield ' +
                'Gotham City – 12345-123 CNPJ: 54.4545.4545/4444-33',
            link: ''
        }
    ]
}

export const ErrorConfiguration = {
    text: {
        error: 'Erro 400',
        title: 'Página não encontrada',
        text: 'Voltar para a home.'
    }
}