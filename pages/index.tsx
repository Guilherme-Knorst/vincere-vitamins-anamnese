import { useRouter } from 'next/router'
import { useState } from 'react'
import Header from '../components/header'
import Question from './question/[number]'

export default function Anamnese() {
	const router = useRouter()
	const [fadeOut, setFadeOut] = useState(false)

	const startAnamnese = () => {
		setFadeOut(true)
		const timer = setTimeout(() => {
			router.push('/question/1')
			clearTimeout(timer)
		}, 700)
	}

	return (
		<Question.Container
			show={true}
			isOpaque={fadeOut}
			header={<Header />}
			buttonText='ESTOU PRONTO!!!'
			onButtonClick={startAnamnese}
			
		>
			<div>
				<p>Olá, seja bem-vindo à Eleven!</p>
				<p className='pt-7'>
					Estamos empolgados por tê-lo aqui conosco e queremos parabenizá-lo desde já por
					buscar também o autoaperfeiçoamento.
				</p>
				<p className='pt-10'>
					A partir de agora, iremos oferecer uma série de perguntas específicas que nos
					proporcionarão o mapeamento de todo seu organismo, descobrindo assim pontos
					falhos para então melhorá-los. Ao final dessa anamnese, teremos informações o
					suficiente para criarmos uma estratégia verdadeiramente personalizada e sem
					contra indicações, visando potencializar sua produtividade, inteligência, foco e
					bem-estar para cada um dos pilares que compõem seu estilo de vida e objetivos
					pessoais.
				</p>
				<h1 className='pt-10'>Pronto para começar?</h1>
			</div>
		</Question.Container>
	)
}
