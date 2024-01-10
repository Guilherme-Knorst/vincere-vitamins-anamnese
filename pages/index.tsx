import Button from '../components/button'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Header from '../components/header'
import Content from '../components/content'

export default function Anamnese() {
	const router = useRouter()
	const [fade, setFade] = useState(false)

	const startAnamnese = () => {
		setFade(true)
		const timer = setTimeout(() => {
			router.push('/question/1')
			clearTimeout(timer)
		}, 1000)
	}

	return (
		<>
			<div
				className={`transition-opacity ease-linear duration-700	flex flex-col items-center gap-10 ${
					fade ? 'opacity-0' : 'opacity-100'
				}`}
			>
				<Content
					header={<Header />}
					content={
						<>
							<h1>Olá, seja bem-vindo à Eleven!</h1>
							<br />
							<h1 className='pt-9'>
								Estamos empolgados por tê-lo aqui conosco e queremos parabenizá-lo
								desde já por buscar também o autoaperfeiçoamento.
							</h1>
							<h1 className='pt-10'>
								A partir de agora, iremos oferecer uma série de perguntas
								específicas que nos proporcionarão o mapeamento de todo seu
								organismo, descobrindo assim pontos falhos para então melhorá-los.
								Ao final dessa anamnese, teremos informações o suficiente para
								criarmos uma estratégia verdadeiramente personalizada e sem contra
								indicações, visando potencializar sua produtividade, inteligência,
								foco e bem-estar para cada um dos pilares que compõem seu estilo de
								vida e objetivos pessoais.
							</h1>
							<h1 className='pt-10'>Pronto para começar?</h1>
						</>
					}
				/>

				<Button onClick={startAnamnese}>ESTOU PRONTO!</Button>
			</div>
		</>
	)
}
