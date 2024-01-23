import { CheckBoxOption, useQuestions } from '../../providers/QuestionProvider'
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
	const { questions, updateQuestionArrayWithAnswer } = useQuestions()
	const [fadeOut, setFadeOut] = useState(true)
	const [debounced, setDebounced] = useState(currentQuestionId)
	const answerRef = useRef() as MutableRefObject<string | null>

	useEffect(() => {
		if (currentQuestionId) {
			checkForConditionalDisplay()
		}
		const timer = setTimeout(() => setFadeOut(false), 400)
		const timer2 = setTimeout(() => setDebounced(currentQuestionId), 200)
	}, [currentQuestionId])

	useEffect(() => {
		router.beforePopState(({ as }) => {
			const currentPath = router.asPath
			if (as !== currentPath) {
				const segments = as.split('/')
				const destinyId = parseInt(segments[segments.length - 1])
				if (destinyId < currentQuestionId) {
					const destinyQuestion = questions.filter((q) => q.id === destinyId)[0]
					if (!destinyQuestion) return true
					if (destinyQuestion.conditionalToQuestion) {
						router.push('/question/' + destinyQuestion.conditionalToQuestion)
						return false
					}
				} else {
					return true
				}
			}

			return true
		})

		return () => {
			router.beforePopState(() => true)
		}
	}, [router])

	const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === 'checkbox') {
			// if(!answerRef.current){
			// 	answerRef.current = ''
			// }
			// answerRef.current += e.target.name + ','
			// return
		}
		answerRef.current = e.target.value
	}

	const getAnswerFromButtonTextOrFilledAnswerRef = (e: MouseEvent<HTMLButtonElement>) => {
		return answerRef.current ?? (e.target as HTMLElement).innerText
	}

	const next = () => {
		answerRef.current = null
		router.push('/question/' + (currentQuestionId + 1))
	}

	const handleAnswer = (e: MouseEvent<HTMLButtonElement>) => {
		const answer = getAnswerFromButtonTextOrFilledAnswerRef(e)
		updateQuestionArrayWithAnswer(answer)
		setFadeOut(true)
		next()
	}

	const checkForConditionalDisplay = () => {
		const currentChekingQuestion = questions.filter((q) => q.id === currentQuestionId)[0]

		const targetQuestion = questions.filter(
			(q) => q.id == currentChekingQuestion.conditionalToQuestion
		)[0]

		if (!targetQuestion) return true

		const questionIdAllowedToDisplay = targetQuestion.conditionalAnswerToQuestionRelation?.get(
			targetQuestion.answer as string
		)

		!(currentChekingQuestion.id === questionIdAllowedToDisplay) && next()
	}

	return (
		<>
			{questions.map((q) => (
				<Question.Container
					show={debounced == q.id}
					isOpaque={fadeOut}
					buttonText={q.buttonText}
					isSmallButton={q.isSmallButton}
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
	buttonText?: string
	isSmallButton?: boolean | undefined
	inputText?: string
	options?: Array<CheckBoxOption>
	buttonOptions?: Array<string>
	onButtonClick: MouseEventHandler<HTMLButtonElement>
	handleInputChange?: ChangeEventHandler<HTMLInputElement>
	handleRadioChange?: ChangeEventHandler<HTMLInputElement>
}

Question.Container = ({
	show,
	isOpaque,
	header,
	buttonText = 'Continuar',
	isSmallButton,
	inputText,
	options,
	buttonOptions,
	onButtonClick,
	handleInputChange,
	...props
}: QuestionContainerProps) => {
	return (
		<div
			className={`transition-opacity ease-linear duration-400	flex flex-col items-center gap-20 ${
				show ? 'show' : 'hidden'
			} ${isOpaque ? 'opacity-0' : 'opacity-100'}`}
		>
			{header}
			<Card>{props.children}</Card>
			{options && (
				<div className='flex flex-col items-center gap-20'>
					<MultipleSelect options={options} onChange={handleInputChange} />
					{!inputText && <Button onClick={onButtonClick}>{buttonText}</Button>}
					{inputText && (
						<div className='flex items-center gap-10 pt-12'>
							<Input onChange={handleInputChange} placeholder={inputText} />
							<Button onClick={onButtonClick} isInputConfirm={true}>
								{buttonText}
							</Button>
						</div>
					)}
				</div>
			)}

			{buttonOptions && (
				<div className='flex gap-10'>
					{buttonOptions.map((o) => (
						<Button key={o} onClick={onButtonClick} small={isSmallButton}>
							{o}
						</Button>
					))}
				</div>
			)}

			{(inputText && !options) && (
				<div className='flex items-center gap-10 pt-12'>
					<Input onChange={handleInputChange} placeholder={inputText} />
					<Button onClick={onButtonClick} isInputConfirm={true}>
						{buttonText}
					</Button>
				</div>
			)}
			{(!inputText && !options && !buttonOptions) && <Button onClick={onButtonClick}>{buttonText}</Button>}
		</div>
	)
}

export default Question
