import React, {
	PropsWithChildren,
	ReactNode,
	createContext,
	useContext,
	useState
} from 'react'

interface Question {
	id: number
	text: string
	// answerType: 'text' | 'select' | 'choice'
	// answerOptions?: string[] | number[]
	answer: string | number
}

interface Context {
	questions: Question[]
	setQuestions: (questions: Question[]) => void
}

// Criação do contexto
export const QuestionsContext = createContext<Context>({ questions: [], setQuestions: () => {}})

export const QuestionsProvider = ({ children }: PropsWithChildren) => {
	
	const qs: Question[] = [
		{
			id: 1,
			text: 'Qual seu nome completo?',
			// buttonComponent: (display, startReveal) => (
			// 	<Button display={display} startReveal={startReveal} onClick={handleAnswer}>
			// 		ESTOU PRONTO!
			// 	</Button>
			// ),
			answer: ''
		},
		{
			id: 2,
			text:
				'Para seguirmos com o seu atendimento, precisamos da sua aprovação quanto aos Termos de Uso e à Política de Privacidade.(Fique tranquilo, todos os seus dados são confidenciais)',
			// buttonComponent: (display, startReveal) => (
			// 	<Button display={display} startReveal={startReveal} onClick={handleAnswer}>
			// 		Aceito
			// 	</Button>
			// ),
			answer: ''
		},
		{
			id: 3,
			text:
				'33333333333333333333333',
			// buttonComponent: (display, startReveal) => (
			// 	<Button display={display} startReveal={startReveal} onClick={handleAnswer}>
			// 		3
			// 	</Button>
			// ),
			answer: ''
		},
		{
			id: 4,
			text:
				'454657777777777777777',
			// buttonComponent: (display, startReveal) => (
			// 	<Button display={display} startReveal={startReveal} onClick={handleAnswer}>
			// 		4
			// 	</Button>
			// ),
			answer: ''
		}
		// { id: 3, text: 'Qual sua idade?', answer: '' },
		// {
		// 	id: 4,
		// 	text: 'Como você se identifica?',
		// 	answerOptions: ['Homem', 'Mulher', 'Outro'],
		// 	answer: ''
		// },
		// {
		// 	id: 6,
		// 	text: 'Qual seu sexo biológico?',
		// 	answerOptions: ['Homem', 'Mulher'],
		// 	answer: ''
		// }
		// Continuar para todas as perguntas
	]

	const [questions, setQuestions] = useState<Question[]>(qs)

	return (
		<QuestionsContext.Provider value={{ questions, setQuestions}}>
			{children}
		</QuestionsContext.Provider>
	)
}

export function useQuestions() {
	return useContext(QuestionsContext)
}
