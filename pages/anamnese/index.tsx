import { FunctionComponent, useState } from 'react'
import * as Progress from '@radix-ui/react-progress'
interface QuestionsProps {}

export default function Questions({}: QuestionsProps) {
  const [step, setStep] = useState(12)
  const [answers, setAnswers] = useState({})
  const totalSteps = 3 // Você pode modificar dependendo do número total de passos

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleChange = (name, value) => {
    setAnswers((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-between p-24">
      <Progress.Root
        className="relative max-w-5xl overflow-hidden bg-sky-500/100 rounded-full w-60 h-24 transform translateZ-0"
        value={step}
      >
        <Progress.Indicator
          className="bg-black w-full h-full transition-transform duration-660 ease-cubic-bezier-065-0-035-1"
          style={{ transform: `translateX(-${100 - step}%)` }}
        />
      </Progress.Root>
      
      <div>
        <p>Olá, seja bem vindo ao …</p>
        <button onClick={() => handleChange('ready', true)}>
          Estou preparado
        </button>
        <button onClick={() => handleChange('ready', false)}>Ainda Não</button>
      </div>
    </div>
  )
}
