import { IQuestion, useQuestions } from '../../providers/QuestionProvider'
import {
	ChangeEventHandler,
	MouseEvent,
	PropsWithChildren,
	ReactNode,
	useEffect,
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
	const { questions } = useQuestions()
	const currentQuestion = questions[currentQuestionId - 1]

	useEffect(() => {
		if (currentQuestionId) {
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

	const next = () => {
		router.push('/question/' + (currentQuestionId + 1))
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
		<Question.Container
			question={currentQuestion}
			goNext={next}
			header={
				currentQuestion?.iconName ? (
					<img
						className='w-[250px]'
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
	header?: ReactNode
	question?: IQuestion
	buttonText?: string
	goNext: Function
	handleRadioChange?: ChangeEventHandler<HTMLInputElement>
}

Question.Container = ({
	header,
	question,
	buttonText = 'Continuar',
	goNext,
	...props
}: QuestionContainerProps) => {
	const [fade, setFade] = useState(true)
	const { updateQuestionArrayWithAnswer } = useQuestions()
	const [answer, setAnswer] = useState<string | undefined | number>()

	useEffect(() => {
		setFade(false)
	}, [])

	useEffect(() => {
		setAnswer(question?.answer)
		setTimeout(() => {
			setFade(false)
		}, 400)
	}, [question])

	const handleChangeOption = (optionName: string) => {
		updateQuestionArrayWithAnswer(optionName)
	}

	const getAnswerFromButtonTextOrFilledAnswerRef = (e: MouseEvent<HTMLButtonElement>) => {
		return answer ?? (e.target as HTMLElement).innerText
	}

	const handleAnswer = (e: MouseEvent<HTMLButtonElement>) => {
		const answer = getAnswerFromButtonTextOrFilledAnswerRef(e)
		updateQuestionArrayWithAnswer(answer as string)
		setFade(true)
		setTimeout(() => {
			setAnswer('')
			goNext()
		}, 400)
	}

	return (
		<div
			className={`transition-opacity ease-linear duration-400	flex flex-col items-center gap-20 ${
				fade ? 'opacity-0' : 'opacity-100'
			}`}
		>
			{header ? (
				header
			) : question?.iconName ? (
				<img
					className='w-[250px]'
					src={`/anamnese/img/icons/${question.iconName}.png`}
					alt=''
				/>
			) : null}

			<Card>{props.children}</Card>

			{question?.options && (
				<div className='flex flex-col items-center gap-20'>
					<MultipleSelect
						onChangeOption={handleChangeOption}
						options={question.options}
					/>
					{!question.inputText && <Button onClick={handleAnswer}>{buttonText}</Button>}
					{question.inputText && (
						<div className='flex items-center gap-10 pt-12'>
							<Input
								value={answer}
								onChange={(e) => setAnswer(e.target.value)}
								placeholder={question.inputText}
							/>
							<Button
								onClick={handleAnswer}
								isInputConfirm={true}
								disabled={answer == ''}
							>
								{buttonText}
							</Button>
						</div>
					)}
				</div>
			)}

			{question?.buttonOptions && (
				<div className='flex gap-10'>
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
					/>
					<Button onClick={handleAnswer} isInputConfirm={true} disabled={answer == ''}>
						{buttonText}
					</Button>
				</div>
			)}

			{!question?.inputText && !question?.options && !question?.buttonOptions && (
				<Button onClick={handleAnswer} disabled={answer == ''}>
					{buttonText}
				</Button>
			)}
		</div>
	)
}

export default Question
