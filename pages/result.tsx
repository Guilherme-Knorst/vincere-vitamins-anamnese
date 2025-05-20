import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { useQuestions } from '../providers/QuestionProvider'
import { formatarTelefoneParaEnvio } from '../utils'
import Question from './man/[number]'
import { useQuestionsWoman } from '../providers/QuestionProviderWoman'

export default function Result() {
	const router = useRouter()
	const { genre, gringe } = router.query
	
	const { questions: questionsMan, profile: profileMan } = useQuestions()
	const { questions: questionsWoman, profile: profileWoman } = useQuestionsWoman()

	const [fade, setFade] = useState(true)

	const finalQuestion = {
		isNotQuestion: true,
		id: 100,
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
		buttonOptions: ['Finalizar'],
		answer: '',
	}
	
	const questions = genre === 'm' ? questionsMan : questionsWoman
	const profile = genre === 'm' ? profileMan : profileWoman
	
	useEffect(() => {
		generateAnamnese()
		setFade(false)
	}, [])

	const generateAnamnese = async () => {

		const notes = questions.filter(q => !q.isNotQuestion && q.id !== gringe as unknown as number && 
			genre === 'm' ? [16,21,26,29,34,42,48,51,53,55,62].includes(q.id) : [16,21,26,29,34,42,48,53,55,57,64].includes(q.id))
			.map(q => {
				switch (q.iconName) {
					case 'imunidade':
						return { title: 'Imunidade', note: q.answer }
					case 'intestino':
						return { title: 'Intestino', note: q.answer }
					case 'energia':
						return { title: 'Energia', note: q.answer }
					case 'foco':
						return { title: 'Foco', note: q.answer }
					case 'memoria':
						return { title: 'Memória', note: q.answer }
					case 'sono':
						return { title: 'Sono', note: q.answer }
					case 'stress':
						return { title: 'Stress', note: q.answer }
					case 'libido':
						return { title: 'Libido', note: q.answer }
					case 'cabelo':
						return { title: 'Cabelo', note: q.answer }
					case 'unha':
						return { title: 'Unha', note: q.answer }
					case 'pele':
						return { title: 'Pele', note: q.answer }
			}})


    // Formata as perguntas e respostas
		const anamnese = questions.filter(q => !q.isNotQuestion && q.id !== gringe as unknown as number)
			.map(({ text, options, answer, buttonOptions}) => 
				({ title: buttonOptions ? text + ` (${buttonOptions.join(', ')})` : options ? text + ` (${options.map(o => o.name).join(', ')})` : text,
				 	 answer: options ? options.filter(o => o.isChecked).map(o => o.name).join(", ") : answer }))


		const formattedPhone = formatarTelefoneParaEnvio(profile?.phone as string)

		const name = profile?.name ?? ''

		//// TWILIO

		console.log("Enviando %s - %d", profile?.name, formatarTelefoneParaEnvio(profile?.phone as string))

		try {
      const response = await fetch('https://anamnese-1632.twil.io', {
        method: 'POST',
        headers: { "content-type": "application/json" },
        // Envia os dados como parâmetros de formulário
        body: JSON.stringify({ name, phone: formattedPhone, anamnese, notes }),
      });

      const data = await response.json();
      console.log('Mensagem enviada com SID: %s - LINK PDF %s', data.sid, data.pdfUrl);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      // setLoading(false);
    }
  };

	// const createPDF = (name: string, formattedPhone: string, anamnese: { title: ReactNode; answer: string | undefined;}[]) => {
	// 	try {
	// 		// Cria o documento PDF com pdfkit
	// 		const doc = new PDF({
	// 			layout: 'landscape',
	// 			// margins: { top: 70, bottom: 50, left: 70, right: 70 },
	// 			// layout: 'landscape',
	// 			// size: [1080, 540],
				
	// 		});
	
	
	// 		// Define o caminho da imagem de fundo
	// 		// const backgroundImagePath = Runtime.getAssets()['/background.jpeg'].path
	
	// 		//Desenha a imagem de fundo na primeira página
	// 		doc.image('/anamnese/img/pdf/1.jpg', 0, 0, {
	// 			width: doc.page.width,
	// 			height: doc.page.height
	// 		});
			
	// 		// Sempre que uma nova página for adicionada, desenha o background
	// 		// doc.on('pageAdded', function() {
	// 		// 	doc.image(backgroundImagePath, 0, 0, {
	// 		// 		width: doc.page.width,
	// 		// 		height: doc.page.height
	// 		// 	});
	// 		// });
	
	// 		// doc.font(Runtime.getAssets()['/Colus-Regular.ttf'].path)
			
	// 		// const imagePath = Runtime.getAssets()['/eleven.jpeg'].path
	// 		// const imageWidth = 210;
	// 		// const imageHeight = 70;
	
	// 		// Calcula coordenadas para centralizar a imagem horizontalmente e verticalmente
	// 		// const xPos = (doc.page.width - imageWidth) / 2;
	// 		// const yPos = (doc.page.height - imageHeight) / 2;
	
	// 		// Cria um gradiente horizontal (da esquerda para a direita)
	// 		// const grad = doc.linearGradient(50, 0, 150, 100)
	// 		// .stop(0, [181, 142, 107])
	// 		// .stop(1, [211, 186, 139])
	
	// 		// doc.fill(grad)
	// 		// doc.fontSize(16);
	// 		// doc.text('BIOTECH', 70, 200, { align: 'center' });
	
	// 		// doc.image(imagePath, xPos, yPos, {fit: [imageWidth, imageHeight], align: 'center', valign: 'center'})
	// 		// .fontSize(16)
	// 		// .text('SAÚDE | CIÊNCIA | TECNOLOGIA', 70, 590, { align: 'center'});
			
	// 		// ---- Segunda página: Nome centralizado ----
	// 		doc.addPage();
	// 		doc.image('/anamnese/img/pdf/2.jpg', 0, 0, {
	// 			width: doc.page.width,
	// 			height: doc.page.height
	// 		});

			
	// 		// ---- Terceira página (Frase) ----
	// 		doc.addPage();

	// 		doc.image('/anamnese/img/pdf/fundo 2.jpg', 0, 0, {
	// 			width: doc.page.width,
	// 			height: doc.page.height
	// 		});

	// 		//Cria um gradiente horizontal (da esquerda para a direita)
	// 		const grad = doc.linearGradient(0, 0, doc.page.width, 0)
	// 		.stop(0, [246, 193, 79])  // Início do gradiente: preto
	// 		.stop(1, [220, 136, 57]);  // Fim do gradiente: cinza
	
	// 		doc.fill(grad)
	// 		doc.fontSize(70);
	// 		doc.text(name, 70, 280, {
	// 			align: 'center',
	// 			baseline: 'middle',
	// 		});
	
	// 		// Cria um gradiente horizontal (da esquerda para a direita)
	// 		// const grad3 = doc.linearGradient(50, 0, 150, 100)
	// 		// .stop(0, [181, 142, 107])
	// 		// .stop(1, [211, 186, 139])
	
	// 		// doc.fill(grad3)
	// 		// doc.fontSize(23);
	
	// 		// // Centraliza o texto na página
	// 		// doc.text("Há bilhões de pessoas no mundo, mas nenhuma delas é igual a você", 70, 370, {
	// 		// 	align: 'center',
	// 		// });
			
	// 		// ---- Quarta página (Início do relatório) ----
	// 		doc.addPage();
	
	// 		anamnese.forEach((item) => {
	// 			const questionText = `\n\n${item.title}`;
	// 			const answerText = item.answer ?? '';
			
	// 			// Calcula a altura que o texto da pergunta ocupará
	// 			const questionHeight = doc.heightOfString(questionText, {
	// 				width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
	// 				align: 'left'
	// 			});
			
	// 			// Se o espaço atual + a altura da pergunta exceder o limite inferior, adiciona nova página
	// 			if (doc.y + questionHeight > doc.page.height - doc.page.margins.bottom) {
	// 				doc.addPage();
	// 			}
			
	// 			// Escreve a pergunta em branco
	// 			doc.fillColor('white')
	// 			.font('Helvetica')
	// 			.fontSize(14)
	// 			.text(questionText, {
	// 				align: 'left',
	// 				width: doc.page.width - doc.page.margins.left - doc.page.margins.right
	// 			});
			
	// 			// Calcula a altura que o texto da resposta ocupará
	// 			const answerHeight = doc.heightOfString(answerText, {
	// 				width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
	// 				align: 'left'
	// 			});
			
	// 			// Se o espaço atual + a altura da resposta exceder o limite inferior, adiciona nova página
	// 			if (doc.y + answerHeight > doc.page.height - doc.page.margins.bottom) {
	// 				doc.addPage();
	// 			}
			
	// 			// Escreve a resposta em amarelo
	// 			doc.fillColor([252, 189, 0])
	// 				.fontSize(14)
	// 				.text(answerText, {
	// 					align: 'left',
	// 					width: doc.page.width - doc.page.margins.left - doc.page.margins.right
	// 				});
				
	// 			doc.moveDown();
	// 		});
				
	// 		let buffers: unknown = [];
	// 		doc.on('data', buffers.push.bind(buffers));
			
	// 		doc.on('end', async () => {
	// 			try {
	// 				const pdfData = Buffer.concat(buffers);
	// 				// Converte o PDF para base64
	// 				const pdfBase64 = pdfData.toString('base64');
	
	// 				// WORDPRESS
					
	// 				// Dados para autenticação no WordPress
	// 				const wpUsername = 'twilio@twilio.com'; // Nome de usuário configurado como variável de ambiente na Twilio
	// 				const wpAppPassword = 'X9rR o2G0 cC3C acRo k4fb iMML'; // Application Password gerada para esse usuário
	// 				const authString = Buffer.from(`${wpUsername}:${wpAppPassword}`).toString('base64');
					
	// 				// URL do endpoint do WordPress
	// 				const wpEndpoint = 'https://elevenbiohacking.com/wp-json/twilio/v1/upload-pdf'; // ajuste para sua URL real
					
	// 				console.log("CHAMANDO WORDPRESS")

	// 				console.log("salvando pdf ", pdfBase64)

					

	// 				// Cria um blob a partir do Base64
	// 				const byteCharacters = atob(pdfBase64);
	// 				const byteNumbers = new Array(byteCharacters.length)
	// 					.fill(0)
	// 					.map((_, i) => byteCharacters.charCodeAt(i));
	// 				const byteArray = new Uint8Array(byteNumbers);
	// 				const blob = new Blob([byteArray], { type: 'application/pdf' });

	// 				// Cria URL temporária e dispara o download
	// 				const url = URL.createObjectURL(blob);
	// 				const link = document.createElement('a');
	// 				link.href = url;
	// 				link.download = 'pdf';
	// 				document.body.appendChild(link);
	// 				link.click();

	// 				// Cleanup
	// 				document.body.removeChild(link);
	// 				URL.revokeObjectURL(url);
	
	// 				// const wpResponse = await axios.post(
	// 				// 	wpEndpoint,
	// 				// 	new URLSearchParams({
	// 				// 		pdf: pdfBase64,
	// 				// 		name,
	// 				// 	}),
	// 				// 	{
	// 				// 		headers: {
	// 				// 			'Content-Type': 'application/x-www-form-urlencoded',
	// 				// 			'Authorization': `Basic ${authString}`
	// 				// 		}
	// 				// 	}
	// 				// );
					
	// 				// const pdfUrl = wpResponse.data.url;
	
	// 				// console.log("URL PDF ", pdfUrl)
	
	// 				console.log("Deu bom")
	
	// 			} catch (err) {
	// 				console.error('Erro ao criar o PDF:', err);

	// 			}
	// 		});
			
	// 		doc.end();
			
	// 	} catch (error) {
	// 		console.error('Erro ao criar o PDF:', error);
	// 	}

	// }

	return (
		<div
			className={`flex flex-col items-center sm:justify-center transition-opacity ease-linear duration-1000	flex flex-col items-center min-h-screen pt-6 ${
				fade ? 'opacity-0' : 'opacity-100'
			}`}
		>
			<Question.Container
				goNext={() => router.push('/gold')}
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
