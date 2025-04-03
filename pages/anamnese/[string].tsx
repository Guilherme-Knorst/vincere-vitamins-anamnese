import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuestions } from '../../providers/QuestionProvider'
import { formatarTelefoneParaEnvio } from '../../utils'
import Question from './man/[number]'
import { useQuestionsWoman } from '../../providers/QuestionProviderWoman'

export default function End() {
	const router = useRouter()
	const { genre, gringe } = router.query
	
	const { questions: questionsMan, profile: profileMan } = useQuestions()
	const { questions: questionsWoman, profile: profileWoman } = useQuestionsWoman()

	const [fade, setFade] = useState(true)

	const finalQuestion = {
		isNotQuestion: true,
		id: 90,
		text: (
			<>
				<p>Parabéns! Você acaba de concluir sua anamnese EleveN Biohacking.</p>
				<p className='pt-6'>
					Nos próximos minutos, entraremos em contato para enviar, em primeira mão, 
					o seu relatório pelo WhatsApp cadastrado no início. Fique atento e preparado!
				</p>
				{/* <p className='pt-6'>Fique atento e preparado!</p> */}
				<p className='pt-6'>(Caso não receba, entre em contato conosco pelo WhatsApp disponível em nosso site).</p>
			</>
		),
		answer: '',
	}
	
	const questions = genre === 'm' ? questionsMan : questionsWoman
	const profile = genre === 'm' ? profileMan : profileWoman
	
	useEffect(() => {
		generateAnamnese()
		setFade(false)
	}, [])

	const generateAnamnese = async () => {

    // Formata as perguntas e respostas
		const anamnese = questions.filter(q => !q.isNotQuestion && q.id !== gringe as unknown as number)
			.map(({ text, options, answer, buttonOptions}) => 
				({ title: buttonOptions ? text + ` (${buttonOptions.join(', ')})` : options ? text + ` (${options.map(o => o.name).join(', ')})` : text,
				 	 answer: options ? options.filter(o => o.isChecked).map(o => o.name).join(", ") : answer }))

		const formattedPhone = formatarTelefoneParaEnvio(profile?.phone as string)

		const name = profile?.name

		////// TWILIO

		console.log("Enviando %s - %d", profile?.name, formatarTelefoneParaEnvio(profile?.phone as string))

		try {
      const response = await fetch('https://elevenbiohacking-anamnese-8485.twil.io', {
        method: 'POST',
        headers: { "content-type": "application/json" },
        // Envia os dados como parâmetros de formulário
        body: JSON.stringify({ name, phone: formattedPhone, anamnese }),
      });

      const data = await response.json();
      console.log('Mensagem enviada com SID: %s - LINK PDF %s', data.sid, data.pdfUrl);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      // setLoading(false);
    }
  };

	return (
		<div
			className={`flex flex-col items-center sm:justify-center transition-opacity ease-linear duration-1000	flex flex-col items-center min-h-screen pt-6 ${
				fade ? 'opacity-0' : 'opacity-100'
			}`}
		>
			<Question.Container
				goNext={() => router.push('/')}
				question={finalQuestion}
				buttonText='Finalizar'
			>
				{finalQuestion.text}
			</Question.Container>
		</div>
	)
}

		////// INICIA MENSAGEM NO ZAP COM O RELATORIO //////

		// // Defina seu número de WhatsApp em formato internacional (exemplo: +5511999999999)
		// const phoneNumber = '+5551997290011';

		// // Cria a URL com o parâmetro text (codifica o conteúdo para URL)
		// const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
		// 	formattedContent
		// )}`;

		// // Abre a URL em uma nova aba ou janela
		// window.open(url, '_blank');


		////// ARQUIVO DE TEXTO //////


    // // Cria um Blob com o conteúdo formatado
    // const blob = new Blob([formattedContent], { type: 'text/plain;charset=utf-8' });
    // // Cria uma URL para o Blob
    // const url = URL.createObjectURL(blob);
    // // Cria um link temporário para download
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = `Anamnese - ${prof?.name}.txt`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // // Libera o objeto URL
    // URL.revokeObjectURL(url);
