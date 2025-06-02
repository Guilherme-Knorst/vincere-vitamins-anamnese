import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuestions } from '../providers/QuestionProvider'
import { formatarTelefoneParaEnvio } from '../utils'
import { useQuestionsWoman } from '../providers/QuestionProviderWoman'
import { Card } from '../components/card'
import Button from '../components/button'

export default function Result() {
	const router = useRouter()
	const { genre } = router.query
	
	const { questions: questionsMan, profile: profileMan } = useQuestions()
	const { questions: questionsWoman, profile: profileWoman } = useQuestionsWoman()

	const [fade, setFade] = useState(true)
	const [pdfUrl, setPdfUrl] = useState("")
	
	const questions = genre === 'm' ? questionsMan : questionsWoman
	const profile = genre === 'm' ? profileMan : profileWoman
	
	useEffect(() => {
		generateAnamnese()
		setFade(false)
	}, [])

	const generateAnamnese = async () => {

		const notes = questions.filter(q => q.isNote)
			.map(q => {
				switch (q.iconName) {
					case 'imunidade':
						return { title: 'Imunidade', note: q.answer || 10 }
					case 'intestino':
						return { title: 'Intestino', note: q.answer || 9}
					case 'energia':
						return { title: 'Energia', note: q.answer || 6}
					case 'foco':
						return { title: 'Foco', note: q.answer || 4}
					case 'memoria':
						return { title: 'Memória', note: q.answer || 10}
					case 'sono':
						return { title: 'Sono', note: q.answer || 1}
					case 'stress':
						return { title: 'Stress', note: q.answer || 7}
					case 'libido':
						return { title: 'Libido', note: q.answer || 8}
					case 'cabelo':
						return { title: 'Cabelo', note: q.answer || 5}
					case 'unha':
						return { title: 'Unha', note: q.answer || 2}
					case 'pele':
						return { title: 'Pele', note: q.answer || 6}
			}})


    // Formata as perguntas e respostas
		const anamnese = questions.filter(q => !q.isNotQuestion)
			.map(({ isNote, text, pdfText, options, answer, buttonOptions}) => 
				({ title: isNote ? pdfText || text : buttonOptions ? (pdfText || text) + ` (${buttonOptions.join(', ')})` : options ? (pdfText || text) + ` (${options.map(o => o.name).join(', ')})` : pdfText || text,
				 	 answer: options ? options.filter(o => o.isChecked).map(o => o.name).join(", ") : answer }))


		const formattedPhone = formatarTelefoneParaEnvio(profile?.phone as string ?? "(51) 99583-1736")

		const name = profile?.name ?? "Nome de Teste"

		//// TWILIO

		console.log("Enviando %s - %d", profile?.name ?? "Nome de Teste", formatarTelefoneParaEnvio(profile?.phone as string ?? "(51) 99583-1736"))
		try {
      const response = await fetch('https://anamnese-1632.twil.io', {
        method: 'POST',
        headers: { "content-type": "application/json" },
        // Envia os dados como parâmetros de formulário
        body: JSON.stringify({ name, phone: formattedPhone, anamnese, notes }),
      });

      const data = await response.json();
			setPdfUrl(data.pdfUrl)
      console.log('Mensagem enviada com SID: %s - LINK PDF %s', data.sid, data.pdfUrl);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      // setLoading(false);
    }
  };

	const getPdf = () => {
		fetch(pdfUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = "Anamnese - " + (profile?.name ?? "Nome de Teste") + ".pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
      })
      .catch(err => console.error('Erro ao baixar PDF:', err));
	}

	const getWhatsappURL = () => {
		const phoneNumber = '+5551999073470';
		return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent("https://elevenbiohacking.com/wp-content/uploads/anamnese-pdfs/Guilherme-20-05-2025-17-17.pdf")}`;
	}

	return (
		<div
			className={`pt-6 min-h-screen transition-opacity ease-linear duration-400 flex flex-col items-center justify-start sm:justify-center gap-10 min-h-full ${
				fade ? 'opacity-0' : 'opacity-100'
			}`}
		>
			<Card>
				<p>Parabéns! Você acaba de concluir sua anamnese EleveN Biohacking.</p>
				<p className='pt-6'>
					Nos próximos minutos, entraremos em contato para enviar, em primeira mão, 
					o seu relatório pelo WhatsApp cadastrado no início. Fique atento e preparado!
				</p>
				{/* <p className='pt-6'>Fique atento e preparado!</p> */}
				<p className='pt-6'>(Caso não receba, entre em contato conosco pelo WhatsApp disponível em nosso site).</p>
				<div className='pt-6'>{pdfUrl == "k" ? 
					<div className='flex gap-6'><div className='w-10 h-10 border-4 border-gray-300 border-t-yellow-400 rounded-full animate-spin'/>Gerando pdf...</div> 
					: 
					<a className='underline text-primary hover:text-secondary visited:text-purple-600 pt-6' href={getWhatsappURL()}>Clique aqui para baixar seu pdf</a>}</div>

			</Card>
			<div className='flex flex-wrap justify-center gap-6 pt-5'>
				<Button disabled={pdfUrl == ""}>Finalizar</Button>
			</div>
		</div>
	)
}

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
