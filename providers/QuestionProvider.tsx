import React, { PropsWithChildren, ReactNode, createContext, useContext, useState } from 'react'

interface Question {
	id: number
	text: string | ReactNode
	buttonText?: string
	inputText?: string
	options?: Array<string>
	buttonOptions?: Array<string>
	iconName?: string
	answer: string | number
}

interface Context {
	questions: Question[]
	setQuestions: (questions: Question[]) => void
}

// Criação do contexto
export const QuestionsContext = createContext<Context>({ questions: [], setQuestions: () => {} })

export const QuestionsProvider = ({ children }: PropsWithChildren) => {
	const qs: Question[] = [
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
			// options: ['Psoríase', 'Rosácea', 'Dermatite'],
			answer: ''
		},
		{
			id: 3,
			text: 'Ok Bruno, qual sua data de nascimento?',
			inputText: 'Digite sua data de nascimento...',
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
			answer: ''
		},
		{
			id: 6,
			text: 'Qual seu sexo biológico?',
			buttonOptions: ['Homem', 'Mulher'],
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
			text: <p></p>,
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 11,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 12,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 13,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 14,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 15,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 16,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 17,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 18,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 19,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 20,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 21,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 22,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 23,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 24,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 25,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 26,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 27,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 28,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 29,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 30,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
		{
			id: 31,
			text: 'Qual é a sua altura (em cm)? (Se for 1,80, digite 180?',
			inputText: 'Digite sua altura...',
			answer: ''
		},
	]

	const [questions, setQuestions] = useState<Question[]>(qs)

	return (
		<QuestionsContext.Provider value={{ questions, setQuestions }}>
			{children}
		</QuestionsContext.Provider>
	)
}

export function useQuestions() {
	return useContext(QuestionsContext)
}
