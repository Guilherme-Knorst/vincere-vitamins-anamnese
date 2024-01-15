import { useQuestions } from '../../providers/QuestionProvider'
import {
	ChangeEvent,
	ChangeEventHandler,
	MouseEvent,
	MouseEventHandler,
	MutableRefObject,
	PropsWithChildren,
	ReactNode,
	useEffect,
	useRef,
	useState
} from 'react'
import { useRouter } from 'next/router'
import Button from '../../components/button'
import { Card } from '../../components/card'
import Input from '../../components/input'
import MultipleSelect from '../../components/multipleSelect'

function Question() {
	const router = useRouter()
	const { number } = router.query
	const currentQuestionId = parseInt(number as string)
	const { questions, setQuestions } = useQuestions()
	const [fadeOut, setFadeOut] = useState(true)
	const [debounced, setDebounced] = useState(currentQuestionId)
	const answerRef = useRef() as MutableRefObject<string | null>

	useEffect(() => {
		const timer = setTimeout(() => setFadeOut(false), 1500)
		const timer2 = setTimeout(() => setDebounced(currentQuestionId), 700)
	}, [currentQuestionId])

	const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
		answerRef.current = e.target.value
	}

	const getAnswerFromButtonTextOrFilledAnswerRef = (e: MouseEvent<HTMLButtonElement>) => {
		return answerRef.current ?? (e.target as HTMLElement).innerText
	}

	const updateQuestionArrayWithAnswer = (answer: string) => {
		return questions.map((p, index) =>
			index === currentQuestionId ? { ...p, resposta: answer } : p
		)
	}

	const next = () => {
		answerRef.current = null
		router.push('/question/' + (currentQuestionId + 1))
	}

	const handleAnswer = (e: MouseEvent<HTMLButtonElement>) => {
		const answer = getAnswerFromButtonTextOrFilledAnswerRef(e)
		const questionsWithUpdatedAnswer = updateQuestionArrayWithAnswer(answer)
		setQuestions(questionsWithUpdatedAnswer)
		setFadeOut(true)
		next()
	}

	return (
		<>
			{questions.map((q) => (
				<Question.Container
					show={debounced == q.id}
					isOpaque={fadeOut}
					buttonText={q.buttonText ?? 'Continuar'}
					onButtonClick={handleAnswer}
					inputText={q.inputText}
					options={q.options}
					buttonOptions={q.buttonOptions}
					handleInputChange={handleAnswerChange}
					key={q.id}
					header={
						q.iconName ? (
							<img
								className='w-[250px]'
								src={`/anamnese/img/icons/${q.iconName}.png`}
								alt=''
							/>
						) : null
					}
				>
					{q.text}
				</Question.Container>
			))}
		</>
	)
}

interface QuestionContainerProps extends PropsWithChildren {
	show: boolean
	isOpaque?: boolean
	header?: ReactNode
	buttonText: string
	inputText?: string
	options?: Array<string>
	buttonOptions?: Array<string>
	onButtonClick: MouseEventHandler<HTMLButtonElement>
	handleInputChange?: ChangeEventHandler<HTMLInputElement>
	handleRadioChange?: ChangeEventHandler<HTMLInputElement>
}

Question.Container = ({
	show,
	isOpaque,
	header,
	buttonText,
	inputText,
	options,
	buttonOptions,
	onButtonClick,
	handleInputChange,
	...props
}: QuestionContainerProps) => {
	return (
		<div
			className={`transition-opacity ease-linear duration-700	flex flex-col items-center gap-10 ${
				show ? 'show' : 'hidden'
			} ${isOpaque ? 'opacity-0' : 'opacity-100'}`}
		>
			{header}
			<Card>{props.children}</Card>
			{options && <MultipleSelect options={options} onChange={handleInputChange} />}
			{inputText && <Input onChange={handleInputChange} placeholder={inputText} />}
			<div className='pt-6'>
				{buttonOptions ? (
					<div className='flex gap-10'>
						{buttonOptions.map((o) => (
							<Button key={o} onClick={onButtonClick}>{o}</Button>
						))}
					</div>
				) : (
					<Button onClick={onButtonClick}>{buttonText}</Button>
				)}
			</div>
		</div>
	)
}

export default Question
