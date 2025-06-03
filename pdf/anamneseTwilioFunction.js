// This is your new function. To start, set the name and path on the left.
const PDFDocument = require('pdfkit');
const axios = require('axios');

exports.handler = function(context, event, callback) {
  console.time()
  // Recebe os parâmetros enviados: a mensagem formatada e o número de destino
  const name = event.name;
  const phone = event.phone; // Certifique-se de que está no formato E.164, ex: "whatsapp:+551199999999 nao pode 9 na frente"
  const anamnese = event.anamnese;
  const notes = event.notes;

  if (!name || !phone || !anamnese || !notes) {
    return callback(new Error("Parâmetros faltando"));
  }

  try {
    // Cria o documento PDF com pdfkit
    const doc = new PDFDocument({
      size: [1079.999, 540],
      margins: { top: 50, bottom: 50, left: 220, right: 220 }
    });

    // Define o caminho da imagem de fundo
    const background1 = Runtime.getAssets()["/1.jpg"].path

    // Desenha a imagem de fundo na primeira página
    doc.image(background1, 0, 0, {
      width: doc.page.width,
      height: doc.page.height
    });

    doc.font(Runtime.getAssets()["/Colus-Regular.ttf"].path)
    
    doc.addPage();

    const background2 = Runtime.getAssets()["/2.jpg"].path

    doc.image(background2, 0, 0, {
      width: doc.page.width,
      height: doc.page.height
    });

    doc.addPage();

    const background3 = Runtime.getAssets()["/tras.jpg"].path

    doc.image(background3, 0, 0, {
      width: doc.page.width,
      height: doc.page.height
    });

    // man 16,21,26,29,34,42,48,51,53,55,62 invertido -> 48
    // woman 16,21,26,29,34,42,48,53,55,57,64.       48

    const logoPath = Runtime.getAssets()["/eleven-novo.png"].path;  // ajuste para o caminho da sua imagem
    
    const logoWidth = 170;
    doc.image(
      logoPath,
      (doc.page.width - logoWidth) / 2,
      30,
      { width: logoWidth, height: 65 }
    );

    // 2) Dados de nota
    const items = notes

    // 3) Calcula porcentagem geral (Stress invertido)
    let sum = 0;
    items.forEach(i => sum += (i.title === 'Stress' ? 10 - i.note : i.note));
    const overallPct = (sum / items.length) / 10;

    // 4) Layout e medidas
    const radius          = 78;   // aumentado em 40%
    const lineWidth       = 22;   // grossura do arco dobrada
    const padding         = 17;   // padding interno aumentado
    const panelGap        = 7;
    const spacing         = 5;   // gap entre barras
    const barHeight       = 16;
    const labelBarSpacing = 10;
    const barPercentSpacing = 10;
    const barWidth        = 160;

    // medida de texto para labels
    doc.fontSize(14);
    const maxLabelWidth = items.reduce((max, i) => Math.max(max, doc.widthOfString(i.title)), 0);

    // dimensões dos painéis
    const barsTotalH       = items.length * barHeight + (items.length - 1) * spacing;
    const panelH           = Math.max(radius * 2, barsTotalH) + padding * 2;
    const circPanelW       = radius * 2 + padding * 2;
    const barsPanelW       = maxLabelWidth + labelBarSpacing + barWidth + barPercentSpacing + padding;
    const panelW           = Math.max(circPanelW, barsPanelW);

    // centraliza horizontalmente os dois painéis
    const totalW = panelW * 2 + panelGap;
    const startX = (doc.page.width - totalW) / 2;

    // aumenta distância dos painéis da imagem de cima
    const panelY = 130;

    // função para gradiente de painel
    function panelGrad(x, y, w, h) {
      return doc.linearGradient(x, y, x, y + h)
        .stop(0, '#222222')
        .stop(1, '#000000');
    }

    // 5) Painel do círculo
    const circX = startX;
    const circGrad = panelGrad(circX, panelY, panelW, panelH);
    doc.fill(circGrad).rect(circX, panelY, panelW, panelH).fill();

    // centro do círculo (horizontalmente centralizado no painel)
    const cx = circX + panelW / 2;
    const cy = panelY + panelH / 2;

    // calcula o bounding box do anel (metade da grossura extra no raio externo)
    const innerR = radius - lineWidth/2;
    const outerR = radius + lineWidth/2;

    // cria um degradê radial que vai do meio do anel (start) até a borda externa (end)
    const goldGrad = doc.radialGradient(
      cx, cy, innerR,    // x0, y0, raio interno
      cx, cy, outerR     // x1, y1, raio externo
    )
      .stop(0, [241, 200, 84])   // cor no início do degradê (mais clara)
      .stop(1, [183, 144, 109]); // cor no fim do degradê (mais escura)

    // círculo de fundo
    doc
      .lineWidth(lineWidth)
      .strokeColor('#333333')
      .circle(cx, cy, radius)
      .stroke();

    // arco de progresso dourado (sem .lineCap)
    const startAng = -Math.PI / 2;
    const endAng   = startAng + overallPct * 2 * Math.PI;
    doc
      .lineWidth(lineWidth)
      .strokeColor(goldGrad)
      .arc(cx, cy, radius, startAng, endAng)
      .stroke();

    // texto central %
    const pctText = `${Math.round(overallPct * 100)}%`;
    doc
      .font('Helvetica')
      .fontSize(40)
      .fillColor('#FFFFFF')
      .text(
        pctText,
        cx - doc.widthOfString(pctText) / 2,
        cy - 18
      );

    // 6) Painel das barras
    const barsX    = circX + panelW + panelGap;
    const barsGrad = panelGrad(barsX, panelY, panelW, panelH);
    doc.fill(barsGrad).rect(barsX, panelY, panelW, panelH).fill();

    let y = panelY + padding;

        // gradiente dourado para gráficos

    items.forEach(item => {
      // label alinhado à direita
      const nota = item.title === 'Stress' ? 10 - item.note : item.note
      doc
        .font('Helvetica')
        .fontSize(11)
        .fillColor('#FFFFFF')
        .text(item.title, barsX, y + 3, {
          width: maxLabelWidth,
          align: 'right'
        });

      const barX   = barsX + maxLabelWidth + labelBarSpacing;
      const barY   = y;
      const barW   = barWidth * (nota / 10);
      const barH   = barHeight;

      const gra = doc
        .linearGradient(
          barX,         // x0 = início da barra
          barY,         // y0 = topo da barra
          barX + barW,  // x1 = fim da barra
          barY          // y1 = mesmo topo (só horizontal)
        )
        .stop(0,   [241, 200,  84])  // borda esquerda
        .stop(0.5, [210, 170,  97])  // meio
        .stop(1,   [183, 144, 109]); // borda direita

      // barra preenchida dourada
      doc
        .rect(barX, barY, barW, barH)
        .fill(gra);

      // // nota numérica
      doc
        .fontSize(12)
        .fillColor('#FFFFFF')
        .text(
          String(item.note),
          barsX + padding + maxLabelWidth + labelBarSpacing + barWidth + barPercentSpacing,
          y
        );

      y += barHeight + spacing;
    });

    // 7) Nome abaixo, centralizado
    const fontSize = 38;
    doc.fontSize(fontSize);
    // mede a largura do texto para posicionar o gradiente corretamente
    const textWidth = doc.widthOfString(name);
    const textX = (doc.page.width - textWidth) / 2;
    const textY = panelY + panelH + 35;
    // cria um gradiente que vai da esquerda do texto até a direita
    const textGrad = doc.linearGradient(
      textX,            // x0 = início do texto
      textY,            // y0 = topo do texto
      textX,// x1 = fim do texto
      textY + fontSize             // y1 = mesmo topo (gradiente horizontal)
    )
    .stop(0, [211, 123, 38])
    // .stop(0.5, [245, 201, 86])   // cor de início (amarelo claro)
    .stop(1, [245, 201, 86]); // cor de fim (dourado escuro)
    
    // aplica o gradiente e desenha o texto
    doc
      .font(Runtime.getAssets()["/Colus-Regular.ttf"].path)
      .fill(textGrad)
      .text(name, 0, textY, {
        width: doc.page.width,
        align: 'center'  // já centralizado pela posição X
      });
    

    const answwerBack = Runtime.getAssets()["/answerback.jpeg"].path
    // Sempre que uma nova página for adicionada, desenha o background
    doc.on('pageAdded', function() {
        // doc.rect(0, 0, doc.page.width, doc.page.height)  // desenha retângulo
        // .fill('black');
      doc.image(answwerBack, 0, 0, {
        width: doc.page.width,
        height: doc.page.height
      });
            
    });
    
    // ---- Quarta página (Início do relatório) ----
    doc.addPage();

		// Desenha um container chanfrado (TR & BL) com borda em degradê e interior preto
		function drawGradientChamferContainer(doc, x, y, w, h, c, grad, padding) {
			// 1.1) contorno chanfrado TR & BL com gradiente
			doc.save()
				.fill(grad)
				.moveTo(x, y)
				.lineTo(x + w - c, y)
				.lineTo(x + w,     y + c)
				.lineTo(x + w,     y + h)
				.lineTo(x + c,     y + h)
				.lineTo(x,         y + h - c)
				.closePath()
				.fill()
				.restore();

			// 1.2) interior preto com mesmos chanfros
			const ix = x + padding,
						iy = y + padding,
						iw = w - 2 * padding,
						ih = h - 2 * padding;
			doc.save()
				.fillColor('black')
				.moveTo(ix,            iy)
				.lineTo(ix + iw - c,   iy)
				.lineTo(ix + iw,       iy + c)
				.lineTo(ix + iw,       iy + ih)
				.lineTo(ix + c,        iy + ih)
				.lineTo(ix,            iy + ih - c)
				.closePath()
				.fill()
				.restore();
		}

		// Cria um degradê dourado horizontal
		function makeGoldGradient(doc, x0, y0, x1, y1) {
			return doc.linearGradient(x0, y0, x1, y1)
				.stop(0,   [241, 200,  84])
				.stop(0.5, [245, 201,  86])
				.stop(1,   [183, 144, 109]);
		}

		// ----------------------------------------------
		// 2) Parâmetros configuráveis de layout
		// ----------------------------------------------

		const chamferSize         = 18;   // tamanho do chanfrado
		const chamferBorderPad    = 1;    // padding interno entre borda chanfrada e box preto
		const textPadX            = 20;   // padding horizontal do texto dentro do box preto
		const textPadY            = 20;   // padding vertical do texto dentro do box preto
		const textSpacing         = 1;    // espaço entre pergunta e resposta dentro do container
		const blockSpacing        = 25;   // espaço entre containers sucessivos

		// Considera margens do documento
		const { top, bottom, left, right } = doc.page.margins;
		const availW = doc.page.width  - left - right;
		const availH = doc.page.height - top  - bottom;

		doc.font('Helvetica').fontSize(20);

		//////////////////////////////////////////////
		// 3) Loop principal: Q+A 0–6 em containers  //
		//     que preenchem páginas; Q+A ≥7 em      //
		//     container centralizado por página    //
		//////////////////////////////////////////////

		let cursorY = top; // posição Y inicial na primeira página

		anamnese.forEach((item, i) => {
			if (i < 7) {
				// 3.a) Pergunta índice 0 a 6: cada uma num container próprio que avança verticalmente

				// Mede altura da pergunta
				const qH = doc.heightOfString(item.title, {
					width: availW - 2 * chamferBorderPad - 2 * textPadX,
					align: 'center'
				});

				// Mede altura da resposta
				const aH = doc.heightOfString(item.answer, {
					width: availW - 2 * chamferBorderPad - 2 * textPadX,
					align: 'center'
				});

				// Altura total do texto dentro do container
				const totalTextH = qH + textSpacing + aH;

				// Dimensões do container
				const boxW = (availW - 2 * chamferBorderPad);
				const boxH = totalTextH + 2 * textPadY + 2 * chamferBorderPad;

				// Se não cabe no espaço restante, cria nova página
				if (cursorY + boxH > top + availH) {
					doc.addPage();
					cursorY = top;
				}

				// Centraliza container horizontalmente
				const boxX = left + (availW - boxW) / 2;
				const boxY = cursorY;

				// Gradiente dourado horizontal
				const boxGrad = makeGoldGradient(doc, boxX, boxY, boxX + boxW, boxY);

				// Desenha container chanfrado + interior preto
				drawGradientChamferContainer(
					doc,
					boxX, boxY, boxW, boxH,
					chamferSize, boxGrad, chamferBorderPad
				);

				// Calcula Y inicial do texto dentro do container
				const textStartY = boxY + chamferBorderPad + textPadY
												+ ((boxH - 2 * chamferBorderPad - 2 * textPadY) - totalTextH) / 2;

				// Desenha pergunta (branca)
				doc.fillColor('white')
					.text(
						item.title,
						boxX + chamferBorderPad + textPadX,
						textStartY,
						{ width: boxW - 2 * chamferBorderPad - 2 * textPadX, align: 'center' }
					);

				// Desenha resposta (amarela)
				doc.fillColor([252,189,0])
					.text(
						item.answer,
						boxX + chamferBorderPad + textPadX,
						textStartY + qH + textSpacing,
						{ width: boxW - 2 * chamferBorderPad - 2 * textPadX, align: 'center' }
					);

				// Avança cursorY para o próximo container
				cursorY += boxH + blockSpacing;

			} else {
				// 3.b) Para i ≥ 7: cada Q+A num container centralizado verticalmente e horizontalmente em sua própria página
				// Cria nova página
				doc.addPage();

				// Mede alturas com largura interna (full availW menos padding)
				doc.font('Helvetica').fontSize(20);
				const innerW = availW - 2 * chamferBorderPad - 2 * textPadX;
				const qH = doc.heightOfString(item.title,  { width: innerW, align: 'center' });
				const aH = doc.heightOfString(item.answer,{ width: innerW, align: 'center' });
				const totalTextH = qH + textSpacing + aH;

				// Dimensões do container
				const boxW = innerW + 2 * textPadX + 2 * chamferBorderPad;
				const boxH = totalTextH + 2 * textPadY + 2 * chamferBorderPad;

				// Centraliza container na página
				const boxX = left + (availW - boxW) / 2;
				const boxY = top  + (availH - boxH) / 2;

				// Gradiente dourado horizontal
				const boxGrad = makeGoldGradient(doc, boxX, boxY, boxX + boxW, boxY);

				// Desenha container chanfrado + interior preto
				drawGradientChamferContainer(
					doc,
					boxX, boxY, boxW, boxH,
					chamferSize, boxGrad, chamferBorderPad
				);

				// Calcula Y inicial do texto dentro do container
				const textStartY = boxY + chamferBorderPad + textPadY
												+ ((boxH - 2 * chamferBorderPad - 2 * textPadY) - totalTextH) / 2;

				// Desenha pergunta (branca)
				doc.fillColor('white')
					.text(
						item.title,
						boxX + chamferBorderPad + textPadX,
						textStartY,
						{ width: innerW, align: 'center' }
					);

				// Desenha resposta (amarela)
				doc.fillColor([252,189,0])
					.text(
						item.answer,
						boxX + chamferBorderPad + textPadX,
						textStartY + qH + textSpacing,
						{ width: innerW, align: 'center' }
					);
			}
		});

    doc.addPage();

    const final1 = Runtime.getAssets()["/fundo1.jpg"].path

    doc.image(final1, 0, 0, {
      width: doc.page.width,
      height: doc.page.height
    });

    doc.addPage();

    const final2 = Runtime.getAssets()["/fundo2.jpg"].path

    doc.image(final2, 0, 0, {
      width: doc.page.width,
      height: doc.page.height
    });

    doc.addPage();

    const final3 = Runtime.getAssets()["/fundo3.jpg"].path

    doc.image(final3, 0, 0, {
      width: doc.page.width,
      height: doc.page.height
    });

    doc.addPage();

    const final4 = Runtime.getAssets()["/fundo4.jpg"].path

    doc.image(final4, 0, 0, {
      width: doc.page.width,
      height: doc.page.height
    });

    doc.addPage();

    const final5 = Runtime.getAssets()["/fundo5.jpg"].path

    doc.image(final5, 0, 0, {
      width: doc.page.width,
      height: doc.page.height
    });

    doc.addPage();

    const final6 = Runtime.getAssets()["/fundo6.jpg"].path

    doc.image(final6, 0, 0, {
      width: doc.page.width,
      height: doc.page.height
    });
      
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    
    doc.on('end', async () => {
      try {
        const pdfData = Buffer.concat(buffers);
        // Converte o PDF para base64
        const pdfBase64 = pdfData.toString('base64');

        // WORDPRESS
        
        // Dados para autenticação no WordPress
        const wpUsername = context.WP_USERNAME; // Nome de usuário configurado como variável de ambiente na Twilio
        const wpAppPassword = context.WP_APP_PASSWORD; // Application Password gerada para esse usuário
        const authString = Buffer.from(`${wpUsername}:${wpAppPassword}`).toString('base64');
        
        // URL do endpoint do WordPress
        const wpEndpoint = 'https://elevenbiohacking.com/wp-json/twilio/v1/upload-pdf'; // ajuste para sua URL real
        
        console.timeEnd()
        console.log("CHAMANDO WORDPRESS")

        const wpResponse = await axios.post(
          wpEndpoint,
          new URLSearchParams({
            pdf: pdfBase64,
            name,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${authString}`
            }
          }
        );
        
        const pdfUrl = wpResponse.data.url;

        console.log("URL PDF ", pdfUrl)

        // Envia a mensagem via Twilio com a URL do PDF no campo mediaUrl
        const client = context.getTwilioClient();
        const msg = await client.messages.create({
          // contentVariables: JSON.stringify({ 1: 'Segue a sua anamnese em PDF', 2: 'asd' }),
          from: 'whatsapp:+14155238886', // Número WhatsApp do Twilio
          to: 'whatsapp:+55' + phone,
          body: 'Bem vindo ' + name + ', aqui está sua anamnese',
          mediaUrl: [pdfUrl],
        });
        
        const response = new Twilio.Response();

        response.appendHeader("Access-Control-Allow-Origin", "*");
        response.appendHeader("Content-Type", "application/json");
        // response.setBody({ success: true, pdfUrl });
        response.setBody({ success: true, sid: msg.sid, pdfUrl });


        console.log("Deu bom")

        return callback(null, response);
      } catch (err) {
        const response = new Twilio.Response();

        response.appendHeader("Access-Control-Allow-Origin", "*");
        response.appendHeader("Content-Type", "application/json");
        response.setStatusCode(500);
        response.setBody({ error: err.message });

        console.log("Deu ruim")

        return callback(null, response);
      }
    });
    
    doc.end();
    
  } catch (error) {
    const response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.setStatusCode(500);
    response.setBody({ error: error.message });

    console.log("Deu ruim fora")
    return callback(null, response);
  }
}
