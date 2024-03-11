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

export interface CheckBoxOption {
	name: string
	isChecked: boolean
}

export interface IQuestion {
	id: number
	text: string | ReactNode
	buttonText?: string
	hasDynamicText?: boolean
	inputText?: string
	options?: Array<CheckBoxOption>
	buttonOptions?: Array<string>
	isSmallButton?: boolean
	iconName?: string
	answer: string | number
	conditionalAnswerToQuestionRelation?: Map<string, number>
	conditionalToQuestion?: number
	fillsProfileField?: keyof UserProfile
}

interface UserProfile {
	[n: string]: string
	name: string
	email: string
}

interface Context {
	profile: Partial<UserProfile> | null
	questions: IQuestion[]
	setQuestions: Dispatch<SetStateAction<IQuestion[]>>
	updateQuestionArrayWithAnswer: (answer: string) => void
}

export const QuestionContext = createContext<Context>({
	questions: [],
	setQuestions: () => {},
	updateQuestionArrayWithAnswer: () => {},
	profile: null
})

export const QuestionProvider = ({ children }: PropsWithChildren) => {
	const router = useRouter()
	const { number } = router.query
	const currentQuestionId = parseInt(number as string)
	const QUESTION_INDEX = currentQuestionId - 1
	const ANSWER_TO_QUESTION_TEXT_RELATION_IDS = new Map([[2, 3]])
	const [profile, setProfile] = useState<Partial<UserProfile>>({})

	const qs: IQuestion[] = [
		{
			id: 1,
			text: 'Para seguirmos com o seu atendimento, precisamos da sua aprovação quanto aos Termos de Uso e à Política de Privacidade.(Fique tranquilo, todos os seus dados são confidenciais)',
			buttonText: 'Aceito',
			answer: ''
		},
		{
			id: 2,
			text: 'Qual seu nome completo?',
			inputText: 'Digite seu nome...',
			answer: '',
			fillsProfileField: 'name'
		},
		{
			id: 3,
			text: `Ok {name}, qual sua data de nascimento?`,
			hasDynamicText: true,
			inputText: '00/00/0000',
			answer: ''
		},
		{
			id: 4,
			text: 'Qual sua idade?',
			inputText: 'Digite sua idade...',
			answer: ''
		},
		{
			id: 5,
			text: 'Como você se identifica?',
			buttonOptions: ['Homem', 'Mulher', 'Outro'],
			conditionalAnswerToQuestionRelation: new Map([['Outro', 6]]),
			answer: ''
		},
		{
			id: 6,
			text: 'Qual seu sexo biológico?',
			buttonOptions: ['Homem', 'Mulher'],
			conditionalToQuestion: 5,
			answer: ''
		},
		{
			id: 7,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 8,
			text: 'Qual seu peso atual?',
			inputText: 'Digite seu peso atual...',
			answer: ''
		},
		{
			id: 9,
			text: 'Para qual e-mail deseja que enviemos seus resultados?',
			inputText: 'Digite seu melhor email...',
			answer: ''
		},
		{
			id: 10,
			text: (
				<>
					<p>Perfeito, vamos continuar</p>
					<p className='pt-6'>
						A ciência já comprovou que nossos pensamentos têm um impacto direto em nosso
						corpo, da mesma forma que o corpo, ao ter deficiência de nutrientes, pode
						afetar negativamente nossos pensamentos e a própria fisiologia. Isso
						significa que precisamos diariamente de uma ampla variedade de nutrientes
						para funcionarmos em nosso mais alto grau de desempenho.
					</p>
					<p className='pt-6'>
						No entanto, a maioria das pessoas desconhece o que está comprometendo seu
						bem estar e performance, e exatamente por isso que estamos aqui.
					</p>
					<p className='pt-6'>
						Na Eleven acreditamos em uma abordagem sistêmica e multifatorial, onde
						buscamos entender primeiro cada detalhe de seu atual estilo de vida e
						objetivos pessoais.
					</p>
				</>
			),
			buttonText: 'Continuar',
			answer: ''
		},
		{
			id: 11,
			text: (
				<>
					<p>Para isso, pedimos que</p>
					<p className='pt-6'>01. Seja extremamente sincero consigo mesmo</p>
					<p className='pt-6'>
						02. Analise calculadamente seus pontos fortes, mas principalmente seus
						pontos fracos
					</p>
					<p className='pt-6'>
						03. Esteja disposto a reconhecer imperfeições, pois este é o ponto de
						partida para alcançar seus objetivos
					</p>
				</>
			),
			buttonText: 'Estou Pronto!',
			answer: ''
		},
		{
			id: 12,
			text: 'Para começarmos, gostaria de saber com que frequência contraiu gripes, resfriados ou outras infecções no último ano?',
			buttonOptions: ['Raramente', '2 a 3 vezes', '4 ou mais vezes'],
			iconName: 'imunidade',
			answer: ''
		},
		{
			id: 13,
			text: 'Como percebe a queda da sua imunidade?',
			options: [
				{ name: 'Gripes e resfriados', isChecked: false },
				{ name: 'Dores de garganta', isChecked: false },
				{ name: 'Herpes', isChecked: false }
			],
			inputText: 'Outra, digite aqui...',
			iconName: 'imunidade',
			answer: ''
		},
		{
			id: 14,
			text: 'Como você classificaria seu nível atual de imunidade de 0 a 10?',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'imunidade',
			answer: ''
		},
		{
			id: 15,
			text: 'Como é sua regularidade intestinal?',
			buttonOptions: ['Com esforço', 'Sem esforço'],
			iconName: 'intestino',
			answer: ''
		},
		{
			id: 16,
			text: 'Como descreveria sua digestão?',
			options: [
				{ name: 'Náuseas', isChecked: false },
				{ name: 'Azia', isChecked: false },
				{ name: 'Gases', isChecked: false },
				{ name: 'Ótima', isChecked: false }
			],
			inputText: 'Outras, digite aqui...',
			iconName: 'intestino',
			answer: ''
		},
		{
			id: 17,
			text: 'Alguma intolerância alimentar conhecida?',
			buttonOptions: ['Não'],
			iconName: 'intestino',
			inputText: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 18,
			text: 'Como você classificaria seu processo digestivo de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'intestino',
			answer: ''
		},
		{
			id: 19,
			text: 'Ultimamente, tem se sentido cansado?',
			buttonOptions: ['Com frequência', 'Às vezes', 'Raramente'],
			iconName: 'energia',
			answer: ''
		},
		{
			id: 20,
			text: 'Como você classificaria seu nível atual de energia de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'energia',
			answer: ''
		},
		{
			id: 21,
			text: 'Você costuma ter dificuldades em manter o foco em suas atividades?',
			buttonOptions: ['Sempre', 'Às vezes', 'Raramente'],
			iconName: 'foco',
			answer: ''
		},
		{
			id: 22,
			text: 'Como você classificaria seu nível atual de foco de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'foco',
			answer: ''
		},
		{
			id: 23,
			text: 'Com que frequência percebe esquecimentos?',
			buttonOptions: ['Com frequência', 'Às vezes', 'Raramente'],
			iconName: 'memoria',
			answer: ''
		},
		{
			id: 24,
			text: 'Como você classificaria seu nível atual de memória de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'memoria',
			answer: ''
		},
		{
			id: 25,
			text: 'Em média, dorme quantas horas por dia?',
			buttonOptions: ['Menos de 5h', 'De 6h a 7h', 'De 7h a 8h', 'Acima de 9h'],
			iconName: 'sono',
			answer: ''
		},
		{
			id: 26,
			text: 'Possui algum desses problemas do sono?',
			options: [
				{ name: 'Insônia', isChecked: false },
				{ name: 'Apneia', isChecked: false },
				{ name: 'Muitas interrupções', isChecked: false },
				{ name: 'Nenhum', isChecked: false }
			],
			inputText: 'Outro, digite aqui...',
			iconName: 'sono',
			answer: ''
		},
		{
			id: 27,
			text: 'Como você classificaria a qualidade atual de seu sono, de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'sono',
			answer: ''
		},
		{
			id: 28,
			text: 'Quais são suas principais fontes de estresse?',
			buttonOptions: ['Não tenho'],
			inputText: 'Especifique...',
			iconName: 'stress',
			answer: ''
		},
		{
			id: 29,
			text: 'Como você classificaria seu nível atual de estresse de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'stress',
			answer: ''
		},
		//CONDICIONAL HOMEM
		{
			id: 30,
			text: 'Caso seja do sexo feminino, já utilizou algum método contraceptivo?',
			options: [
				{ name: 'Anticoncepcional', isChecked: false },
				{ name: 'Diu Hormonal', isChecked: false },
			],
			inputText: 'Outro, digite aqui...',
			iconName: 'libido',
			answer: ''
		},
		{
			id: 31,
			text: 'Atualmente ainda utiliza algum método contraceptivo?',
			buttonOptions: ['Sou homem'],
			inputText: 'Sim, digite aqui...',
			iconName: 'libido',
			answer: ''
		},
		{
			id: 32,
			text: 'Como você classificaria seu nível atual de apetite sexual de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'libido',
			answer: ''
		},
		{
			id: 33,
			text: 'Você tem enfrentado problemas com queda de cabelo?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'cabelo-unha',
			answer: ''
		},
		{
			id: 34,
			text: 'Como você classificaria a saúde atual do seu cabelo de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'cabelo-unha',
			answer: ''
		},
		{
			id: 35,
			text: 'Suas unhas estão mais fracas que o normal?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'cabelo-unha',
			answer: ''
		},
		{
			id: 36,
			text: 'Como você classificaria a saúde atual de suas unhas de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'cabelo-unha',
			answer: ''
		},
		{
			id: 37,
			text: 'Tem tido problemas com caspas?',
			buttonOptions: ['Sim', 'Não'],
			iconName: 'pele',
			answer: ''
		},
		{
			id: 38,
			text: 'Como descreveria seu tipo de pele?',
			buttonOptions: ['Oleosa', 'Seca', 'Mista', 'Normal'],
			iconName: 'pele',
			answer: ''
		},
		{
			id: 39,
			text: 'Quais são suas principais preocupações com a pele?',
			options: [
				{ name: 'Acnes', isChecked: false },
				{ name: 'Manchas', isChecked: false },
				{ name: 'Envelhecimento', isChecked: false },
				{ name: 'Pele seca', isChecked: false },
				{ name: 'Pele oleosa', isChecked: false },
			],
			inputText: 'Outra, digite aqui...',
			buttonText: 'Continuar',
			iconName: 'pele',
			answer: ''
		},
		{
			id: 40,
			text: 'Como você classificaria a saúde atual da sua pele de 0 a 10',
			buttonOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			isSmallButton: true,
			iconName: 'pele',
			answer: ''
		},
		{
			id: 41,
			text: 'Possui alguma doença relacionada a pele?',
			options: [
				{ name: 'Psoríase', isChecked: false },
				{ name: 'Rosácea', isChecked: false },
				{ name: 'Dermatite', isChecked: false }
			],
			inputText: 'Outras, digite aqui...',
			iconName: 'pele',
			answer: ''
		},
		{
			id: 42,
			text: (
				<>
					<p>Ótimo, até aqui tudo está claro e anotado</p>
					<p className='pt-6'>
						Agora, gostaríamos de saber mais sobre seus hábitos e estilo de vida atual
					</p>
					<p className='pt-6'>No seu cotidiano, fazem parte</p>
				</>
			),
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
			id: 43,
			text: 'Com que frequência pratica atividades físicas na semana?',
			buttonOptions: ['1 a 2 vezes', '3 a 4 vezes', '5 ou mais vezes', 'Nenhuma'],
			answer: ''
		},
		{
			id: 44,
			text: 'Em qual período costuma praticá las?',
			options: [
				{ name: 'Manhã', isChecked: false },
				{ name: 'Tarde', isChecked: false },
				{ name: 'Noite', isChecked: false }
			],
			answer: ''
		},
		{
			id: 45,
			text: 'Quais são os tipos de atividade que pratica?',
			inputText: 'Digite aqui...',
			answer: ''
		},
		{
			id: 46,
			text: 'Qual o principal objetivo de suas práticas?',
			options: [
				{ name: 'Saúde', isChecked: false },
				{ name: 'Massa magra', isChecked: false },
				{ name: 'Emagrecimento', isChecked: false },
				{ name: 'Performance', isChecked: false }
			],
			answer: ''
		},
		{
			id: 47,
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
				{ name: 'Problemas cardíacos', isChecked: false }
			],
			answer: ''
		},
		{
			id: 48,
			text: 'Já fez alguma cirurgia?',
			buttonOptions: ['Não'],
			inputText: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 49,
			text: 'Sente dores ou possui algum tipo de lesão?',
			buttonOptions: ['Não'],
			inputText: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 50,
			text: 'Já teve ou tem algum tipo de distúrbio alimentar?',
			buttonOptions: ['Não'],
			inputText: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 51,
			text: 'Você tem alguma alergia com alimentos ou medicamentos?',
			buttonOptions: ['Não'],
			inputText: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 52,
			text: 'Toma algum medicamento regularmente? (Se sim, quais?)',
			buttonOptions: ['Não'],
			inputText: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 53,
			text: 'Você possui alguma outra condição crônica que necessite acompanhamento médico ou que seja importante relatar?',
			buttonOptions: ['Não'],
			inputText: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 54,
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
				{ name: 'Protetores gástricos', isChecked: false },
				{ name: 'Medicamentos para tireoide', isChecked: false },
				{ name: 'Hormônios e anticoncepcionais', isChecked: false }
			],
			answer: ''
		},
		{
			id: 55,
			text: 'Tem alguma contra indicação para suplementação com ferro?',
			buttonOptions: ['Não'],
			inputText: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 56,
			text: 'Utiliza desodorante spray tradicional (com alumínio)?',
			buttonOptions: ['Sim', 'Não'],
			answer: ''
		},
		{
			id: 57,
			text: 'Em sua alimentação, consome peixes com frequência? (levando em consideração a exposição ao mercúrio)',
			buttonOptions: ['Sim', 'Não'],
			answer: ''
		},
		{
			id: 58,
			text: 'Quando foi a última vez em que realizou um protocolo de desparasitação contra vermes?',
			buttonOptions: ['Há mais de 1 ano', 'nunca fiz'],
			inputText: 'Digite aqui...',
			answer: ''
		},
		{
			id: 59,
			text: 'Há mais alguma questão de saúde que gostaria de mencionar',
			buttonOptions: ['Não'],
			inputText: 'Sim, especifique...',
			answer: ''
		},
		{
			id: 60,
			text: (
				<>
					<p>Muito bem, finalizamos essa primeira etapa</p>
					<p className='pt-6'>
						Nossa anamnese ofereceu perguntas claras e organizadas para obter
						informações essenciais sobre sua saúde e estilo de vida atuais, garantindo
						que todas as áreas relevantes fossem enfim abordadas
					</p>
					<p className='pt-6'>Seu relatório está pronto e já pode ser gerado</p>
					<p>Preparado para vê-lo?</p>
				</>
			),
			buttonOptions: ['Gerar relatório...'],
			answer: ''
		},
		{
			id: 61,
			text: (
				<>
					<p>Aqui na Eleven, acreditamos em ser excelêntes!</p>
					<p className='pt-6'>
						É por isso que criamos f órmulas inteligentes pensando acima de tudo na sua
						saúde, já que muitas pessoas podem ser alérgicas a alguns elementos
						tradicionalmente vistos na indústria Sendo assim prepararemos sua fórmula
						personalizada em cápsulas incolores, sem adição de corantes ou adoçantes
						artificiais, sem açucares, sem caseína, glúten e até mesmo sem parabenos, já
						que visamos proporcionar uma melhor absorção e preservação dos nutrientes,
						otimizando ainda mais a qualidade final de sua fórmula para oferecer a
						máxima pureza de cada matéria prima
					</p>
					<p className='pt-6'>
						Estamos ansiosos para ajudar você nessa nova etapa de sua vida, e esperamos
						que esteja totalmente preparado para uma experiência única, como nunca antes
						ninguém ousou proporcionar nesse setor
					</p>
				</>
			),
			buttonOptions: ['Eu quero ser ELEVEN'],
			answer: ''
		},
		// {
		// 	id: 71,
		// 	text: 'Digite aqui o seu CEP para analisarmos a melhor entrega de sua fórmula',
		// 	inputText: 'Digite seu cep...',
		// 	iconName: 'pele',
		// 	answer: ''
		// },
		// {
		// 	id: 72,
		// 	text: 'Gostaria de fornecer seu WhatsApp para receber informações sobre a sua fórmula personalizada e ainda ter o contato do nosso time de especialistas? (Por favor, inclua o código de área)',
		// 	inputText: 'Digite seu número...',
		// 	answer: ''
		// }
	]

	const [questions, setQuestions] = useState<IQuestion[]>(qs)

	if (QUESTION_INDEX === 71) console.log('final ', questions)

	useEffect(() => {
		setQuestions(
			questions.map((q, qIndex) => {
				if (q.hasDynamicText && currentQuestionId < q.id) {
					return { ...q, text: qs[qIndex].text }
				}
				return q
			})
		)
	}, [currentQuestionId])

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
						console.log('asasdasd ', profile)

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

	const updateQuestionArrayWithAnswer = (answer: string) => {
		setQuestions(
			questions.map((q, qIndex) => {
				if (qIndex === QUESTION_INDEX) {
					if (q.options) {
						return {
							...q,
							options: q.options.map((o) =>
								o.name == answer ? { ...o, isChecked: !o.isChecked } : o
							)
						}
					}
					if (q.fillsProfileField) {
						fillProfile(q.fillsProfileField as string, answer)
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
