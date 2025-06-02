import { useRouter } from 'next/router'
import React, {
	Dispatch,
	PropsWithChildren,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react'
import { mascaraData, mascaraTelefone } from '../utils'

export interface CheckBoxOption {
	name: string
	isChecked: boolean
}

export interface IQuestion {
	header?: ReactNode
	id: number
	isNotQuestion?: boolean
	text: string | ReactNode
	buttonText?: string
	hasDynamicText?: boolean
	inputPlaceholder?: string
	options?: Array<CheckBoxOption>
	buttonOptions?: Array<string>
	isSmallButton?: boolean
	iconName?: string
	answer: string | undefined
	formatter?: (phone: string) => string
	maxLength?: number
	isNote?: boolean
	pdfText?: string

	// noAnswer?: boolean
	// conditionalToQuestion?: Array<number | string>
	fillsProfileField?: keyof UserProfile
}

export interface UserProfile {
	[n: string]: string
	name: string
	phone: string
}

interface Context {
	profile: Partial<UserProfile> | null
	questions: IQuestion[]
	setQuestions: Dispatch<SetStateAction<IQuestion[]>>
	updateQuestionArrayWithAnswer: (answer: string | undefined, optionName?: string) => void
}

export const QuestionContext = createContext<Context>({
	questions: [],
	setQuestions: () => {},
	updateQuestionArrayWithAnswer: () => {},
	profile: null
})

export const QuestionProvider = ({ children }: PropsWithChildren) => {
	const router = useRouter()
	const currentQuestionId = parseInt(router.query.number as string)
	const ANSWER_TO_QUESTION_TEXT_RELATION_IDS = new Map([[2, 3]])
	const [profile, setProfile] = useState<Partial<UserProfile>>({})

	const qs: IQuestion[] = [
		{
			header: (<div className='z-0 flex flex-col items-center gap-10'>
				<div className='flex flex-col items-center relative'>
				<img
						className='w-[11rem] sm:w-[22rem] pb-1'
						src='/anamnese/img/eleven.jpeg'
						alt=''
					/>
					{/* <img
						className='w-[9rem] sm:w-[15rem] pb-1'
						src='/img/eleven-text.png'
						alt=''
					/>
					<img
						className='w-[4rem] sm:w-[7rem] absolute bottom-0'
						src='/img/bio-text.png'
						alt=''
					/> */}
				</div>
				{/* <div
					className={`h-[2.3rem] text-[2.3rem] pt-1 sm:h-[3.9rem] sm:text-[3.9rem] font-[1000]
						bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text`}
				>
					CYBER ANAMNESE
				</div> */}
			</div>),
			isNotQuestion: true,
			id: 0,
			text: <>
							<p>Olá, seja bem-vindo à Eleven!</p>
							<br/>
							<p>
								Estamos empolgados por tê-lo aqui conosco e queremos parabenizá-lo desde já por
								buscar também o autoaperfeiçoamento.
							</p>
							<br/>
							<p>
								A partir de agora, iremos oferecer uma série de perguntas específicas que nos
								proporcionarão o mapeamento de todo seu organismo, descobrindo assim pontos
								falhos para então melhorá-los. Ao final dessa anamnese, teremos informações o
								suficiente para criarmos uma estratégia verdadeiramente personalizada e sem
								contra indicações, visando potencializar sua produtividade, inteligência, foco e
								bem-estar para cada um dos pilares que compõem seu estilo de vida e objetivos
								pessoais.
							</p>
							<br/>
							<h1>Pronto para começar?</h1>
						</>,
			buttonOptions: ['Estou pronto'],
			answer: '',
		},
		{
			id: 1,
			isNotQuestion: true,
			text: (
				<>
					<p>Para seguirmos, precisamos de sua aprovação quanto aos Termos de Uso e à Política de Privacidade.</p>
					<p className='pt-6'>(Fique tranquilo, todos os seus dados são confidenciais)</p>
				</>
			),
			buttonOptions: ['Aceito os termos'],
			answer: '',
		},
		{
			id: 2,
			text: 'Qual seu nome completo?',
			inputPlaceholder: 'Digite seu nome...',
			answer: '',
			fillsProfileField: 'name'
		},
		{
			id: 3,
			text: 'Ok {name}, qual sua data de nascimento?',
			hasDynamicText: true,
			inputPlaceholder: '00/00/0000',
			formatter: mascaraData,
			answer: ''
		},
		{
			id: 4,
			text: 'Qual sua idade?',
			inputPlaceholder: 'Digite sua idade...',
			answer: ''
		},
		{
			id: 5,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180)',
			inputPlaceholder: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 6,
			text: 'Qual seu peso atual?',
			inputPlaceholder: 'Digite seu peso atual (kg)...',
			answer: ''
		},
		{
			id: 7,
			text: 'Qual sua profissão?',
			inputPlaceholder: 'Digite sua profissão...',
			answer: '' 
		},
		{
			id: 8,
			text: 'Para qual número de WhatsApp deseja que enviemos seus resultados?',
			inputPlaceholder: '(51) 99583-1736',
			fillsProfileField: "phone",
			formatter: mascaraTelefone,
			maxLength: 15,
			answer: ''
		},
		{
			isNotQuestion: true,
			id: 9,
			text: (
				<>
					<p>Perfeito, vamos continuar...</p>
					<p className='pt-6'>
						A ciência já comprovou que nossos pensamentos têm um impacto direto em nosso corpo, da mesma forma que o corpo, ao ter deficiências nutricionais, hormonais e até mesmo outros processos, pode afetar negativamente nossos pensamentos, gerando assim uma cascata de efeitos em nossa própria fisiologia.
					</p>
					<p className='pt-6'>
						Isso significa que precisamos diariamente de uma ampla variedade de mecanismos para funcionarmos em nosso mais alto grau de desempenho. No entanto, a maioria das pessoas desconhece o que está comprometendo sua saúde, bem-estar e performance, e exatamente por isso que estamos aqui.
					</p>
					<p className='pt-6'>
						Na Eleven acreditamos em uma abordagem sistêmica e multifatorial, onde cada detalhe pode ser a total diferença entre o sucesso e o fracasso rumo aos seus objetivos pessoais.
					</p>
				</>
			),
			buttonOptions: ['Continuar'],
			answer: '',
		},
		{
			isNotQuestion: true,
			id: 10,
			text: (
				<>
					<p>Para isso, pedimos que:</p>
					<p className='pt-6'>01. Seja extremamente sincero consigo mesmo;</p>
					<p className='pt-6'>02. Analise calculadamente seus pontos fortes, mas principalmente seus pontos fracos;</p>
					<p className='pt-6'>03. Esteja disposto a reconhecer imperfeições, pois este é o ponto de partida para alcançar seus objetivos.</p>
				</>
			),
			buttonOptions: ['Estou Pronto!'],
			answer: '',
		},
		{
			id: 11,
			text: 'Para começarmos, gostaria de saber com que frequência contraiu gripes, resfriados ou outras infecções no último ano?',
			buttonOptions: ['Nunca', 'Raramente', '2 a 3 vezes', '4 ou mais vezes'],
			iconName: 'imunidade',
			answer: ''
		},
		{
			id: 12,
			text: 'Como percebe a queda da sua imunidade?',
			options: [
				{ name: 'Gripes e resfriados', isChecked: false },
				{ name: 'Dores de garganta', isChecked: false },
				{ name: 'Herpes', isChecked: false }
			],
			inputPlaceholder: 'Outra, digite aqui...',
			iconName: 'imunidade',
			answer: ''
		},
		{
			id: 13,
			text: 'Tem histórico de doenças autoimunes?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			iconName: 'imunidade',
			answer: ''
		},
		{
			id: 14,
			text: 'Você sente que sua cicatrização é lenta?',
			buttonOptions: ['Sim','Não'],
			iconName: 'imunidade',
			answer: ''
		},
		{
			id: 15,
			text: 'Tem alergias ou intolerâncias alimentares?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			iconName: 'imunidade',
			answer: ''
		},
		{
			id: 16,
			text: 'Como você classificaria seu nível atual de imunidade de 0 a 10?',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'imunidade',
			answer: '',
			isNote: true
		},
		{
			id: 17,
			text: 'Com que frequência você evacua?',
			buttonOptions: ['1x/dia', '2x ou mais/dia', 'Constipação'],
			iconName: 'intestino',
			answer: ''
		},
		{
			id: 18,
			text: 'Sente inchaço ou gases frequentes?',
			buttonOptions: ['Sim','Não'],
			iconName: 'intestino',
			answer: ''
		},
		{
			id: 19,
			text: 'Tem convivido com episódios de refluxo ou azia?',
			buttonOptions: ['Sim','Não'],
			iconName: 'intestino',
			answer: ''
		},
		{
			id: 20,
			text: 'Sente que algum alimento piora sua digestão?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			iconName: 'intestino',
			answer: ''
		},
		{
			id: 21,
			text: 'Como você classificaria seu processo digestivo de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'intestino',
			answer: '',
			isNote: true
		},
		{
			id: 22,
			text: 'Você sente energia suficiente para realizar suas atividades diárias?',
			buttonOptions: ['Sim', 'Às vezes', 'Raramente', 'Nunca'],
			iconName: 'energia',
			answer: ''
		},
		{
			id: 23,
			text: 'Como é seu nível de atividade física?',
			buttonOptions: ['Sedentário', 'Moderado', 'Intenso'],
			iconName: 'energia',
			answer: ''
		},
		{
			id: 24,
			text: 'Em que momentos do dia você percebe maior queda de energia?',
			options: [
				{ name: 'Durante a manhã', isChecked: false },
				{ name: 'Meio dia', isChecked: false },
				{ name: 'Durante a tarde', isChecked: false },
				{ name: 'Final do dia', isChecked: false }
			],
			inputPlaceholder: 'Outro, digite aqui...',
			iconName: 'energia',
			answer: ''
		},
		{
			id: 25,
			text: 'Já teve diagnóstico ou suspeita de deficiência de alguma vitamina ou mineral (ferro, Vitamina D, B12 e outros)?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			iconName: 'energia',
			answer: ''
		},
		{
			id: 26,
			text: 'Já teve diagnóstico ou suspeita de deficiência de algum hormônio?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			iconName: 'energia',
			answer: ''
		},
		{
			id: 27,
			text: 'Como você classificaria seu nível atual de energia de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'energia',
			answer: '',
			isNote: true
		},
		{
			id: 28,
			text: 'Você costuma ter dificuldades em manter o foco em suas atividades?',
			buttonOptions: ['Sempre', 'Às vezes', 'Raramente', 'Nunca'],
			iconName: 'foco',
			answer: ''
		},
		{
			id: 29,
			text: 'Consome estimulantes como café, chá preto, pré-treinos ou nootrópicos?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			iconName: 'foco',
			answer: ''
		},
		{
			id: 30,
			text: 'Como você classificaria seu nível atual de foco de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'foco',
			answer: '',
			isNote: true
		},
		{
			id: 31,
			text: 'Com que frequência você sente "nevoeiro mental" ou esquecimento?',
			buttonOptions: ['Sempre', 'Às vezes', 'Raramente', 'Nunca'],
			iconName: 'memoria',
			answer: ''
		},
		{
			id: 32,
			text: 'Sente que aprende mais devagar do que antes?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'memoria',
			answer: ''
		},
		{
			id: 33,
			text: 'Tem histórico familiar de doenças neurodegenerativas?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			iconName: 'memoria',
			answer: ''
		},
		{
			id: 34,
			text: 'Você consome alimentos ricos em ômega-3 e antioxidantes?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'memoria',
			answer: ''
		},
		{
			id: 35,
			text: 'Como você classificaria seu nível atual de memória de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'memoria',
			answer: '',
			isNote: true
		},
		{
			id: 36,
			text: 'Em média, quantas horas você dorme por noite?',
			buttonOptions: ['Menos de 5h', 'De 6h a 7h', 'De 7h a 8h', 'Acima de 9h'],
			iconName: 'sono',
			answer: ''
		},
		{
			id: 37,
			text: 'Você acorda durante a noite?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'sono',
			answer: ''
		},
		{
			id: 38,
			text: 'Tem dificuldade para pegar no sono?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'sono',
			answer: ''
		},
		{
			id: 39,
			text: 'Você ronca?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'sono',
			answer: ''
		},
		{
			id: 40,
			text: 'Você já foi diagnosticado com algum distúrbio do sono?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			iconName: 'sono',
			answer: ''
		},
		{
			id: 41,
			text: 'Você acorda descansado ou já sente cansaço ao despertar?',
			buttonOptions: ['Cansado', 'Descansado'],
			iconName: 'sono',
			answer: ''
		},
		{
			id: 42,
			text: 'Costuma ter sonhos vívidos ao acordar?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'sono',
			answer: ''
		},
		{
			id: 43,
			text: 'Como você classificaria a qualidade atual de seu sono, de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'sono',
			answer: '',
			isNote: true
		},
		{
			id: 44,
			text: 'Quais são suas principais fontes de estresse?',
			buttonOptions: ['Não tenho'],
			inputPlaceholder: 'Especifique...',
			iconName: 'stress',
			answer: ''
		},
		{
			id: 45,
			text: 'Você costuma sentir irritabilidade ou ansiedade excessiva?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'stress',
			answer: ''
		},
		{
			id: 46,
			text: 'Já notou queda de cabelo, ganho/perda de peso ou problemas digestivos em períodos de estresse?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'stress',
			answer: ''
		},
		{
			id: 47,
			text: 'Como avalia sua capacidade de lidar com desafios e crises?',
			buttonOptions: ['Boa', 'Média', 'Ruim'],
			iconName: 'stress',
			answer: ''
		},
		{
			id: 48,
			text: 'Já teve sintomas como palpitações, tremores, sudorese excessiva ou falta de ar sem motivo aparente?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			iconName: 'stress',
			answer: ''
		},
		{
			id: 49,
			text: 'Como você classificaria seu nível atual de estresse de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'stress',
			answer: '',
			isNote: true
		},
		{
			id: 50,
			text: 'Tem convivido com falta de lubrificação?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, digite aqui...',
			iconName: 'libido',
			answer: ''
		},
		{
			id: 51,
			text: 'Tem convivido com dificuldade de ereção?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, digite aqui...',
			iconName: 'libido',
			answer: ''
		},
		{
			id: 52,
			text: 'Como você classificaria seu nível atual de apetite sexual de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'libido',
			answer: '',
			isNote: true
		},
		{
			id: 53,
			text: 'Você tem enfrentado problemas com queda de cabelo?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'cabelo',
			answer: ''
		},
		{
			id: 54,
			text: 'Como você classificaria a saúde atual do seu cabelo de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'cabelo',
			answer: '',
			isNote: true
		},
		{
			id: 55,
			text: 'Suas unhas quebram facilmente ou têm manchas?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'unha',
			answer: ''
		},
		{
			id: 56,
			text: 'Como você classificaria a saúde atual de suas unhas de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'unha',
			answer: '',
			isNote: true
		},
		{
			id: 57,
			text: 'Tem tido problemas com caspas?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'pele',
			answer: ''
		},
		{
			id: 58,
			text: 'Como descreveria seu tipo de pele?',
			buttonOptions: ['Seca', 'Oleosa', 'Mista', 'Normal'],
			iconName: 'pele',
			answer: ''
		},
		{
			id: 59,
			text: 'Quais são suas principais preocupações com a pele?',
			options: [
				{ name: 'Acnes', isChecked: false },
				{ name: 'Manchas', isChecked: false },
				{ name: 'Envelhecimento', isChecked: false },
				{ name: 'Pele seca', isChecked: false },
				{ name: 'Pele oleosa', isChecked: false }
			],
			inputPlaceholder: 'Outra, digite aqui...',
			buttonText: 'Continuar',
			iconName: 'pele',
			answer: ''
		},
		{
			id: 60,
			text: 'Possui alguma doença relacionada a pele?',
			options: [
				{ name: 'Psoríase', isChecked: false },
				{ name: 'Rosácea', isChecked: false },
				{ name: 'Dermatite', isChecked: false }
			],
			inputPlaceholder: 'Outras, digite aqui...',
			iconName: 'pele',
			answer: ''
		},
		{
			id: 61,
			text: 'Você se expõe ao sol diariamente?',
			buttonOptions: ['Sempre', 'Às vezes', 'Raramente', 'Nunca'],
			iconName: 'pele',
			answer: ''
		},
		{
			id: 62,
			text: 'Faz uso de protetor solar?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'pele',
			answer: ''
		},
		{
			id: 63,
			text: 'Como você classificaria a saúde atual da sua pele de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'pele',
			answer: '',
			isNote: true
		},
		{
			id: 64,
			text: (
				<>
					<p>Ótimo, até aqui tudo está claro e anotado</p>
					<p className='pt-6'>
						Agora, gostaríamos de saber mais sobre seus hábitos e estilo de vida atual
					</p>
					<p className='pt-6'>No seu cotidiano, fazem parte</p>
				</>
			),
			pdfText: 'Agora, gostaríamos de saber mais sobre seus hábitos e estilo de vida atual. No seu cotidiano, fazem parte',
			options: [
				{ name: 'Alimentação saudável', isChecked: false },
				{ name: 'Prática de exercícios físicos', isChecked: false },
				{ name: 'Compulsão por doces ou comida', isChecked: false },
				{ name: 'Exposição frequente ao sol', isChecked: false },
				{ name: 'Consumo de álcool', isChecked: false },
				{ name: 'Tabagismo', isChecked: false },
				{ name: 'Consumo de café', isChecked: false }
			],
			buttonText: 'Continuar',
			answer: ''
		},
		{
			id: 65,
			text: 'Você frequentemente pratica grounding, pisando descalço diretamente em contato com a terra?',
			buttonOptions: ['Sim', 'Não'],
			answer: ''
		},
		{
			id: 66,
			text: 'Com que frequência pratica atividades físicas na semana?',
			buttonOptions: ['1 a 2 vezes', '3 a 4 vezes', '5 ou mais vezes', 'Nenhuma'],
			answer: ''
		},
		{
			id: 67,
			text: 'Em qual período costuma praticá las?',
			options: [
				{ name: 'Manhã', isChecked: false },
				{ name: 'Tarde', isChecked: false },
				{ name: 'Noite', isChecked: false },
				{ name: 'Não pratico', isChecked: false }
			],
			answer: ''
		},
		{
			id: 68,
			text: 'Quais são os tipos de atividade que pratica?',
			buttonOptions: ['Não pratico'],
			inputPlaceholder: 'Por favor, digite aqui...',
			answer: ''
		},
		{
			id: 69,
			text: 'Qual o principal objetivo de suas práticas?',
			options: [
				{ name: 'Saúde', isChecked: false },
				{ name: 'Performance', isChecked: false },
				{ name: 'Estética', isChecked: false },
				{ name: 'Tratamento específico', isChecked: false }
			],
			answer: ''
		},
		{
			id: 70,
			text: 'Já fez alguma cirurgia?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 71,
			text: 'Já teve algum tipo de câncer?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 72,
			text: 'Você possui alguma das seguintes condições?',
			options: [
				{ name: 'Rinite alérgica', isChecked: false },
				{ name: 'Enxaqueca', isChecked: false },
				{ name: 'Colesterol e triglicérides elevados', isChecked: false },
				{ name: 'Pressão alta', isChecked: false },
				{ name: 'Pressão baixa', isChecked: false },
				{ name: 'Dores articulares', isChecked: false },
				{ name: 'Glicemia elevada', isChecked: false },
				{ name: 'Anemia', isChecked: false },
				{ name: 'Asma', isChecked: false },
				{ name: 'Diabetes', isChecked: false },
				{ name: 'Cirurgia bariátrica', isChecked: false },
				{ name: 'Cirurgia recente (menos de 3 meses)', isChecked: false },
				{ name: 'Distúrbios gastrointestinais', isChecked: false },
				{ name: 'Problemas renais', isChecked: false },
				{ name: 'Problemas na vesícula', isChecked: false },
				{ name: 'Problemas no fígado', isChecked: false },
				{ name: 'Problemas na tireoide', isChecked: false },
				{ name: 'Problemas cardíacos', isChecked: false },
				{ name: 'Nenhum desses', isChecked: false }
			],
			answer: ''
		},
		{
			id: 73,
			text: 'Sente dores ou possui algum tipo de lesão?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 74,
			text: 'Já teve ou tem algum tipo de distúrbio alimentar?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 75,
			text: 'Você tem alguma alergia medicamentosa?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 76,
			text: 'Toma algum medicamento regularmente? (Se sim, quais?)',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 77,
			text: 'Você possui alguma outra condição crônica que necessite acompanhamento médico ou que seja importante relatar?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 78,
			text: 'Nos últimos meses utilizou medicamentos para algum desses motivos?',
			options: [
				{ name: 'Anticoagulantes', isChecked: false },
				{ name: 'Antidepressivos', isChecked: false },
				{ name: 'Outros medicamentos psiquiátricos ou neurológicos', isChecked: false },
				{ name: 'Anti inflamatórios', isChecked: false },
				{ name: 'Antibióticos', isChecked: false },
				{ name: 'Medicamentos para colesterol', isChecked: false },
				{ name: 'Medicamentos para diabetes', isChecked: false },
				{ name: 'Medicamentos para emagrecimento', isChecked: false },
				{ name: 'Medicamentos para a pele', isChecked: false },
				{ name: 'Medicamentos para pressão alta', isChecked: false },
				{ name: 'Medicamentos para saúde cardíaca', isChecked: false },
				{ name: 'Protetores gástricos (prazois)', isChecked: false },
				{ name: 'Medicamentos para tireoide', isChecked: false },
				{ name: 'Hormônios e anticoncepcionais', isChecked: false },
				{ name: 'Outros', isChecked: false }
				
			],
			inputPlaceholder: 'Se escolheu algum, especifique...',
			answer: ''
		},
		{
			id: 79,
			text: 'Tem alguma contra indicação para suplementação com ferro?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 80,
			text: 'Utiliza desodorante spray tradicional (com alumínio)?',
			buttonOptions: ['Sim', 'Não'],
			answer: ''
		},
		{
			id: 81,
			text: 'Utiliza pastas de dente tradicionais (com flúor)?',
			buttonOptions: ['Sim', 'Não'],
			answer: ''
		},
		{
			id: 82,
			text: 'Em sua alimentação, consome peixes com frequência? (mercúrio)',
			buttonOptions: ['Sim', 'Não'],
			answer: ''
		},
		{
			id: 83,
			text: 'Quando foi a última vez em que realizou um protocolo de desparasitação contra vermes?',
			buttonOptions: ['Nunca fiz', 'Há mais de 1 ano', 'Fiz recentemente'],
			answer: ''
		},
		{
			id: 84,
			text: 'Você tem ideia de qual é, aproximadamente, a sua pressão arterial hoje?',
			buttonOptions: ['Não sei'],
			inputPlaceholder: 'Digite aqui...',
			answer: ''
		},
		{
			id: 85,
			text: 'Você tem ideia de qual é, aproximadamente, o seu percentual de gordura atual?',
			buttonOptions: ['Não sei'],
			inputPlaceholder: 'Digite aqui...',
			answer: ''
		},
		{
			id: 86,
			text: 'Há mais alguma questão de saúde que gostaria de mencionar?',
			buttonOptions: ['Não'],
			inputPlaceholder: 'Sim, especifique...',
			answer: ''
		},
		{
			isNotQuestion: true,
			id: 87,
			text: (
				<>
					<p>Muito bem, finalizamos essa primeira etapa...</p>
					<p className='pt-6'>
						Cada resposta sua nos ajudará a mapear com precisão sua saúde e estilo de vida
						atuais.
					</p>
					<p className='pt-6'>Sua auto análise está pronta...</p>
					<p className='pt-6'>Preparado(a) para vê-la?</p>
				</>
			),
			buttonOptions: ['Gerar relatório...'],
			answer: '',
		}
	]

	const [questions, setQuestions] = useState<IQuestion[]>(qs)

	// useEffect(() => {
	// 	setQuestions(
	// 		questions.map((q, qIndex) => {
	// 			if (q.hasDynamicText && currentQuestionId < q.id) {
	// 				return { ...q, text: qs[qIndex].text }
	// 			}
	// 			return q
	// 		})
	// 	)
	// }, [currentQuestionId])

	useEffect(() => {
		fillDynamicTextIfNeeded()
	}, [profile])

	const currentQuestionHasRelation = () =>
		ANSWER_TO_QUESTION_TEXT_RELATION_IDS.has(currentQuestionId)

	const fillDynamicTextIfNeeded = () => {
		if (currentQuestionHasRelation()) {
			setQuestions((prev) => {
				return prev.map((q) => {
					if (ANSWER_TO_QUESTION_TEXT_RELATION_IDS.get(currentQuestionId) === q.id) {
						let updatedText = q.text as string

						for (const key of Object.keys(profile as UserProfile)) {
							const value = profile[key] !== undefined ? profile[key] : ''
							updatedText = updatedText?.replace(
								new RegExp(`{${key}}`, 'g'),
								value as string
							)
						}
						return { ...q, text: updatedText }
					}
					return q
				})
			})
		}
	}

	const fillProfile = (field: string, answer: string) => {
		setProfile((prev) => ({
			...prev,
			[field]: answer
		}))
	}

	const updateQuestionArrayWithAnswer = (answer: string | undefined, optionName?: string) => {
		setQuestions((prev) =>
			prev.map((q, qIndex) => {
				if (qIndex === currentQuestionId) {
					if (optionName) {
						return {
							...q,
							answer: answer,
							options: q.options?.map((o) =>
								o.name == optionName ? { ...o, isChecked: !o.isChecked } : o
							)
						}
					}
					if (q.fillsProfileField && answer) {
						fillProfile(q.fillsProfileField as string, answer as string)
					}
					return { ...q, answer: answer }
				}
				return q
			})
		)
	}

	return (
		<QuestionContext.Provider
			value={{ questions, setQuestions, updateQuestionArrayWithAnswer, profile }}
		>
			{children}
		</QuestionContext.Provider>
	)
}

export function useQuestions() {
	return useContext(QuestionContext)
}
