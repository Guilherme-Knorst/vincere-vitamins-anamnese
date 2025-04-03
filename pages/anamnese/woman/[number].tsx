import { IQuestion, useQuestionsWoman } from '../../../providers/QuestionProviderWoman'
import {
	ChangeEventHandler,
	MouseEvent,
	PropsWithChildren,
	RefObject,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'
import { useRouter } from 'next/router'
import Button from '../../../components/button'
import { Card } from '../../../components/card'
import Input from '../../../components/input'
import MultipleSelect from '../../../components/multipleSelect'
import { useTermsModal } from '../../../providers/ModalProvider'
import TermsModal from '../../../components/modal'

function Question() {
	const router = useRouter()
	const { number } = router.query
	const currentQuestionId = parseInt(number as string)
	const { questions } = useQuestionsWoman()
	const currentQuestion = questions[currentQuestionId]

	useEffect(() => {
		router.beforePopState(({ as }) => {
			const currentPath = router.asPath
			if (as !== currentPath) {
				const segments = as.split('/')
				const destinyId = parseInt(segments[segments.length - 1])
				if (destinyId < currentQuestionId) {
					const destinyQuestion = questions.filter((q) => q.id === destinyId)[0]
					if (!destinyQuestion) return true
					// if (destinyQuestion.conditionalToQuestion?.[0]) {
					// 	router.push('/question/' + destinyQuestion.conditionalToQuestion[0])
					// 	return false
					// }
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
		router.push('/anamnese/woman/' + (currentQuestionId + 1))
	}

	return (
		<Question.Container
			question={currentQuestion}
			goNext={next}
		>
			{currentQuestion?.text}
		</Question.Container>
	)
}

interface QuestionContainerProps extends PropsWithChildren {
	question?: IQuestion
	buttonText?: string
	goNext: Function
	handleRadioChange?: ChangeEventHandler<HTMLInputElement>
}

Question.Container = ({
	question,
	buttonText = 'Continuar',
	goNext,
	...props
}: QuestionContainerProps) => {
	const [fade, setFade] = useState(true)
	const { updateQuestionArrayWithAnswer, questions, profile } = useQuestionsWoman()
	const { openTermsModal, isTermsAccepted, setIsTermsAccepted, isModalOpen, setIsModalOpen } = useTermsModal()
	const [answer, setAnswer] = useState<string>(question?.answer ?? "")
	const inputRef = useRef() as RefObject<HTMLInputElement>
	const router = useRouter()

	const formattedAnswer = useMemo(() => question?.formatter?.(answer) ?? answer, [answer])

	useEffect(() => {
		setFade(false)
	}, [])

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [question?.id])

	useEffect(() => {
		// if (!question?.options) {
		// 	setAnswer(question?.answer)
		// }
		setTimeout(() => {
			setFade(false)
		}, 400)
	}, [question])

	const handleChangeOption = (optionName: string) => {
		updateQuestionArrayWithAnswer(answer, optionName)
	}

	const acceptTerms = () => {
		setIsModalOpen(false)
		setFade(true)
		setIsTermsAccepted(true)
		setTimeout(() => {
			goNext()
		}, 400)	}

	const handleAnswer = (e: MouseEvent<HTMLButtonElement>) => {
		
		if (question?.id == 86) {
			setFade(true)
			setTimeout(() => {
				router.push(
					{ pathname: "/anamnese/end", query: { genre: 'w', gringe: 65 } },
					"/anamnese/end"
				);
			}, 400)
			return
		}

		if (question?.id == 1 && isTermsAccepted === false) {
			openTermsModal()
			return
		}

		setFade(true)

		if (answer === '') {
			const btnAnswer = (e.target as HTMLElement).innerText
			updateQuestionArrayWithAnswer(btnAnswer)
		} else {
			updateQuestionArrayWithAnswer(answer)
		}

		setTimeout(() => {
			setAnswer('')
			goNext()
		}, 400)
	}

	const isChecked = useMemo(() => question?.options?.some((o) => o.isChecked), [question])

	const canGoNext = () => (answer && answer != '') || question?.isNotQuestion || isChecked

	return (
		<>
			<div
				className={`transition-opacity ease-linear duration-400	flex flex-col items-center justify-start sm:justify-center gap-10 min-h-full ${
					fade ? 'opacity-0' : 'opacity-100'
				}`}
			>

				{
					question?.header ? (
						question.header
					) : null
				}

				{/* {
					question?.iconName ? (
						<img
							className='w-[150px] sm:w-[250px]'
							src={`/img/icons/${question.iconName}.png`}
							alt=''
						/>
					) : null
				} */}

				<Card>{props.children}</Card>

				{question?.options && (
					<div className='flex flex-col items-center gap-10'>
						<MultipleSelect
							onChangeOption={handleChangeOption}
							options={question.options}
						/>
						{!question.inputPlaceholder && (
							<Button onClick={handleAnswer} disabled={!canGoNext()}>
								{buttonText}
							</Button>
						)}
						{question.inputPlaceholder && (
							<div className='flex flex-col gap-10'>
								<Input
									value={formattedAnswer}
									onChange={(e) => setAnswer(e.target.value)}
									placeholder={question.inputPlaceholder}
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

				{question?.inputPlaceholder && !question.options && (
					<div className='flex flex-col items-center gap-10 pt-12'>
						<Input
							value={formattedAnswer}
							onChange={(e) => setAnswer(e.target.value)}
							placeholder={question.inputPlaceholder}
							ref={inputRef}
						/>
						<Button onClick={handleAnswer} disabled={!canGoNext()}>
							{buttonText}
						</Button>
					</div>
				)}

				{/* {question?.isNotQuestion && (
					<Button onClick={handleAnswer} disabled={!canGoNext()}>
						{buttonText}
					</Button>
				)} */}
			
			</div>
			<TermsModal isOpen={isModalOpen} onAccept={acceptTerms} onClose={() => router.push("/")} />
		</>
	)
}

export default Question

	// useEffect(() => {
	// 	if (currentQuestion) {
	// 		checkForConditionalDisplay()
	// 	}
	// }, [currentQuestionId])

	// const checkForConditionalDisplay = () => {
	// 	if (!currentQuestion.conditionalToQuestion) return

	// 	const targetQuestion = questions[(currentQuestion.conditionalToQuestion[0] as number) - 1]

	// 	if (!targetQuestion) return

	// 	const isCurrentQuestionAllowedToDisplay =
	// 		targetQuestion.answer === currentQuestion.conditionalToQuestion[1]

	// 	if (!isCurrentQuestionAllowedToDisplay) {
	// 		if (currentQuestionId === 6) {
	// 			updateQuestionArrayWithAnswer(targetQuestion.answer)
	// 		}
	// 		next()
	// 	}
	// }