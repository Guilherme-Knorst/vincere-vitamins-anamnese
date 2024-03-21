import { IQuestion, useQuestions } from '../../providers/QuestionProvider'
import {
	ChangeEventHandler,
	MouseEvent,
	PropsWithChildren,
	ReactNode,
	RefObject,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'
import { useRouter } from 'next/router'
import Button from '../../components/button'
import { Card } from '../../components/card'
import Input from '../../components/input'
import MultipleSelect from '../../components/multipleSelect'

const noAnswerQuestionIds = [1, 10, 11, 60]

function Question() {
	const router = useRouter()
	const { number } = router.query
	const currentQuestionId = parseInt(number as string)
	const { questions, updateQuestionArrayWithAnswer } = useQuestions()
	const currentQuestion = questions[currentQuestionId - 1]

	useEffect(() => {
		if (currentQuestion) {
			checkForConditionalDisplay()
		}
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
					if (destinyQuestion.conditionalToQuestion?.[0]) {
						router.push('/question/' + destinyQuestion.conditionalToQuestion[0])
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

	const next = () => {
		router.push('/question/' + (currentQuestionId + 1))
	}

	const checkForConditionalDisplay = () => {
		if (!currentQuestion.conditionalToQuestion) return

		const targetQuestion = questions[(currentQuestion.conditionalToQuestion[0] as number) - 1]

		if (!targetQuestion) return

		const isCurrentQuestionAllowedToDisplay =
			targetQuestion.answer === currentQuestion.conditionalToQuestion[1]

		if (!isCurrentQuestionAllowedToDisplay) {
			if (currentQuestionId === 6) {
				updateQuestionArrayWithAnswer(targetQuestion.answer)
			}
			next()
		}
	}

	return (
		<Question.Container
			question={currentQuestion}
			noAnswer={noAnswerQuestionIds.includes(currentQuestionId)}
			goNext={next}
			header={
				currentQuestion?.iconName ? (
					<img
						className='w-[150px] sm:w-[250px]'
						src={`/anamnese/img/icons/${currentQuestion.iconName}.png`}
						alt=''
					/>
				) : null
			}
		>
			{currentQuestion?.text}
		</Question.Container>
	)
}

interface QuestionContainerProps extends PropsWithChildren {
	noAnswer?: boolean
	header?: ReactNode
	question?: IQuestion
	buttonText?: string
	goNext: Function
	handleRadioChange?: ChangeEventHandler<HTMLInputElement>
}

Question.Container = ({
	noAnswer,
	header,
	question,
	buttonText = 'Continuar',
	goNext,
	...props
}: QuestionContainerProps) => {
	const [fade, setFade] = useState(true)
	const { updateQuestionArrayWithAnswer } = useQuestions()
	const [answer, setAnswer] = useState<string | undefined>(question?.answer)
	const inputRef = useRef() as RefObject<HTMLInputElement>
	const router = useRouter()

	useEffect(() => {
		setFade(false)
	}, [])

	useEffect(() => {
		if (inputRef.current) {
			console.log('ref podre ', inputRef.current)

			inputRef.current.focus()
		}
	}, [question?.id])

	useEffect(() => {
		if (!question?.options) {
			setAnswer(question?.answer)
		}
		setTimeout(() => {
			setFade(false)
		}, 400)
	}, [question])

	const handleChangeOption = (optionName: string) => {
		updateQuestionArrayWithAnswer(answer, optionName)
	}

	const handleAnswer = (e: MouseEvent<HTMLButtonElement>) => {
		setFade(true)

		if (question?.id == 60) {
			setTimeout(() => {
				router.push('/level')
			}, 400)
			return
		}

		setTimeout(() => {
			setAnswer('')
			goNext()
		}, 400)

		if (answer === '') {
			const btnAnswer = (e.target as HTMLElement).innerText
			updateQuestionArrayWithAnswer(btnAnswer)
		} else {
			updateQuestionArrayWithAnswer(answer)
		}
	}

	const isChecked = useMemo(() => question?.options?.some((o) => o.isChecked), [question])

	const canGoNext = () => (answer && answer != '') || noAnswer || isChecked

	console.log(answer)

	return (
		<div
			className={`transition-opacity ease-linear duration-400	flex flex-col items-center justify-center gap-5 min-h-screen ${
				fade ? 'opacity-0' : 'opacity-100'
			}`}
		>
			{header ? header : null}

			<Card>{props.children}</Card>

			{question?.options && (
				<div className='flex flex-col items-center gap-10'>
					<MultipleSelect
						onChangeOption={handleChangeOption}
						options={question.options}
					/>
					{!question.inputText && (
						<Button onClick={handleAnswer} disabled={!canGoNext()}>
							{buttonText}
						</Button>
					)}
					{question.inputText && (
						<div className='flex flex-col gap-10'>
							<Input
								value={answer}
								onChange={(e) => setAnswer(e.target.value)}
								placeholder={question.inputText}
								autoFocus
								ref={inputRef}
							/>
							<Button onClick={handleAnswer} disabled={!canGoNext()}>
								{buttonText}
							</Button>
						</div>
					)}
				</div>
			)}

			{question?.buttonOptions && (
				<div className='flex flex-wrap justify-center gap-6 pt-5'>
					{question.buttonOptions.map((o) => (
						<Button key={o} onClick={handleAnswer} small={question.isSmallButton}>
							{o}
						</Button>
					))}
				</div>
			)}

			{question?.inputText && !question.options && (
				<div className='flex flex-col items-center gap-10 pt-12'>
					<Input
						value={answer}
						onChange={(e) => setAnswer(e.target.value)}
						placeholder={question.inputText}
						ref={inputRef}
					/>
					<Button onClick={handleAnswer} disabled={!canGoNext()}>
						{buttonText}
					</Button>
				</div>
			)}

			{!question?.inputText && !question?.options && !question?.buttonOptions && (
				<Button onClick={handleAnswer} disabled={!canGoNext()}>
					{buttonText}
				</Button>
			)}
		</div>
	)
}

export default Question
