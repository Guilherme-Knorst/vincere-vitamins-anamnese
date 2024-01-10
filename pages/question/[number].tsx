import { useQuestions } from '../../providers/QuestionProvider'
import QuestionContent from '../../components/content'
import { MouseEvent, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Button from '../../components/button'

function Question() {
	const router = useRouter()
	const { number } = router.query
	const current = parseInt(number as string)
	const { questions, setQuestions } = useQuestions()
	const [reveal, setReveal] = useState(false)
	const [debounced, setDebounced] = useState(current)

	useEffect(() => {
		const timer = setTimeout(() => setReveal(true), 1200)
		const timer2 = setTimeout(() => setDebounced(current), 700)
	}, [current])

	const next = () => {
		router.push('/question/' + (current + 1))
	}

	const handleAnswer = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLElement
		const answer = target.textContent || target.innerText

		const newQuestions = questions.map((p, index) =>
			index === current ? { ...p, resposta: answer } : p
		)
		setQuestions(newQuestions)
		setReveal(false)
		next()
	}

	return (
		<>
			{questions.map((q) => (
				<div
					className={`transition-opacity ease-linear duration-700	flex flex-col items-center gap-10 ${
						debounced == q.id ? 'show' : 'hidden'
					} ${reveal ? 'opacity-100' : 'opacity-0'}`}
					key={q.id}
				>
					{/* <QuestionContent content={q.textComponent} header={q.headerComponent} /> */}
					<Question.Content content={q.text} />
					<Button onClick={handleAnswer}>ESTOU PRONTO!</Button>
				</div>
			))}
		</>
	)
}

interface QuestionContentProps {
	content: ReactNode
	header?: ReactNode
}

Question.Content = ({ content, header }: QuestionContentProps) => {
	return (
		<div className='transition-all duration-500 ease-in-out flex flex-col'>
			{header && header}
			<Card>{content}</Card>
		</div>
	)
}

export { Question }
