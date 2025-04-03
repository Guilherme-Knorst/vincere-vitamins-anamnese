import React from 'react';
import Button from '../button';
import ButtonModal from './buttonModal';

type TermProps = {
	isOpen: boolean;
	onAccept: () => void;
	onClose: () => void;
};

const TermsModal = ({ isOpen, onAccept, onClose }: TermProps) => {
  return (
    <div className={`${isOpen ? 'opacity-100' : 'opacity-0 hidden'} fixed inset-0 bg-opacity-50 flex items-center justify-center z-[1000] z-10 transition-opacity ease-linear duration-400`}>
      <div className="bg-gradient-to-r from-primary to-secondary text-black rounded-lg max-w-[600px] w-[90%] max-h-[80%] overflow-y-auto p-5 shadow">
        <h2 className="text-2xl font-bold mb-4">Termos de Uso</h2>
        <div className="mb-5">
          <p className="mb-4">
            <strong>Data da última atualização:</strong> Março de 2025
          </p>
          <p className="mb-4">
            Bem-vindo(a) ao site da ELEVEN BIOHACKING. Antes de utilizar nossos
            serviços, é essencial que você leia atentamente e concorde com os
            presentes Termos de Uso. O site{' '}
            <a
              href="https://www.elevenbiohacking.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              www.elevenbiohacking.com
            </a>{' '}
            (“Site”) é operado pela ELEVEN BIOHACKING LTDA., inscrita no CNPJ
            53.541.265/0001-63, com sede na Rua Marechal Floriano, 1921, Jardim do
            Prado, CEP 95600-470, Taquara, Rio Grande do Sul (“ELEVEN BIOHACKING”).
            Estes Termos regulam a utilização dos serviços oferecidos e estão em
            conformidade com a legislação vigente.
          </p>
          <p className="mb-4">
            Ao clicar no botão "Eu li e aceito os Termos de Uso", você expressa
            seu consentimento livre, consciente e informado para se vincular a
            estes Termos.
          </p>

          <h3 className="text-xl font-semibold mb-4">
            OBJETIVO E ACEITAÇÃO DOS TERMOS
          </h3>
          <p className="mb-4">
            Este documento estabelece as condições gerais, regras e responsabilidades
            para o uso do Site e seus serviços. A ELEVEN BIOHACKING se reserva o
            direito de alterar estes Termos a qualquer momento, com notificação aos
            usuários, indicando a data da última atualização. A versão mais recente
            estará sempre disponível para consulta.
          </p>

          <h3 className="text-xl font-semibold mb-4">SOBRE A ELEVEN BIOHACKING</h3>
          <p className="mb-4">
            A ELEVEN BIOHACKING é uma plataforma digital que facilita a interação
            entre usuários e profissionais de saúde independentes para a elaboração
            de tratamentos personalizados. Também atua como intermediária entre
            usuários e farmácias de manipulação parceiras para a preparação de
            fórmulas personalizadas.
          </p>
          <p className="mb-4">
            Os tratamentos personalizados consideram formulações de vitaminas,
            minerais, fitoterápicos e medicações apenas mediante prescrição
            profissional médica, após atendimentos feitos pela equipe de
            especialistas (PLANO BIOTECH).
          </p>
          <p className="mb-4">
            Os suplementos da GOLD EDITION, são formulações de vitaminas e minerais,
            oferecidos sem prestar serviços de diagnóstico, tratamento ou cura de
            doenças e recomenda que o usuário consulte um profissional de saúde
            qualificado antes de seguir qualquer plano oferecido.
          </p>

          <h3 className="text-xl font-semibold mb-4">
            FUNCIONALIDADES, PAGAMENTO E ENTREGA
          </h3>
          <p className="mb-4">
            Após responder a anamnese, um questionário sobre saúde e estilo de vida,
            o usuário e a Eleven recebem os resultados de sua auto análise. Através
            disso, o usuário terá a oportunidade de conhecer nossos programas e,
            caso seja de seu interesse, contratá-los, para receber um plano
            personalizado, elaborado por um time de profissionais de saúde parceiros
            da ELEVEN BIOHACKING.
          </p>
          <p className="mb-4">
            Os produtos podem ser adquiridos em farmácias parceiras, com opções de
            pagamento via cartão de crédito, débito, boleto bancário e Pix. A entrega
            é de responsabilidade exclusiva das farmácias, que determinam os prazos
            e condições. A ELEVEN BIOHACKING não se responsabiliza por eventuais
            atrasos, erros na entrega ou qualidade dos produtos fornecidos pelas
            farmácias parceiras.
          </p>
          <p className="mb-4">
            Atuamos apenas com farmácias de manipulação devidamente reguladas pela
            Anvisa, que realizam testes laboratoriais em todos os insumos adquiridos.
          </p>
          <p className="mb-4">Farmácias credenciadas:</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              DANIS FARMÁCIA E DROGARIA LTDA. CNPJ/ME: 06.626.253/1000-24
            </li>
          </ul>
          <p className="mb-4">
            A ELEVEN BIOHACKING direciona os pedidos conforme a disponibilidade de
            insumos e capacidade de produção da farmácia.
          </p>

          <h3 className="text-xl font-semibold mb-4">
            RESPONSABILIDADES DO USUÁRIO
          </h3>
          <ul className="list-disc list-inside mb-4">
            <li>Possui 18 anos ou mais e capacidade legal para contratar;</li>
            <li>Fornece informações verídicas e autoriza sua verificação;</li>
            <li>
              Compreende que o questionário é uma ferramenta de apoio e não substitui
              a consulta com um profissional de saúde;
            </li>
            <li>
              É responsável pelo uso adequado do Site e seus serviços.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">
            PROPRIEDADE INTELECTUAL
          </h3>
          <p className="mb-4">
            Todos os direitos sobre o sistema, conteúdo e elementos visuais do Site
            pertencem exclusivamente à ELEVEN BIOHACKING e são protegidos pela
            legislação de propriedade intelectual. É proibida qualquer reprodução,
            distribuição, modificação ou utilização indevida do conteúdo sem
            autorização expressa.
          </p>

          <h3 className="text-xl font-semibold mb-4">
            DISPONIBILIDADE E INTERRUPÇÕES
          </h3>
          <p className="mb-4">
            A ELEVEN BIOHACKING pode suspender temporariamente os serviços por motivos
            técnicos ou estratégicos. Não garantimos funcionamento ininterrupto do
            Site e não nos responsabilizamos por prejuízos decorrentes de falhas.
          </p>

          <h3 className="text-xl font-semibold mb-4">SERVIÇOS DE TERCEIROS</h3>
          <p className="mb-4">
            O Site pode integrar serviços de terceiros para pagamento, hospedagem ou
            suporte. A ELEVEN BIOHACKING não se responsabiliza por falhas,
            indisponibilidades ou problemas causados por esses serviços.
          </p>

          <h3 className="text-xl font-semibold mb-4">
            RESOLUÇÃO DE CONFLITOS
          </h3>
          <p className="mb-4">
            Estes Termos de Uso são regidos pelas leis da República Federativa do
            Brasil. Qualquer controvérsia será resolvida no foro da Comarca de
            Taquara/RS, salvo disposição legal em contrário.
          </p>

          <h3 className="text-xl font-semibold mb-4">CONTATO</h3>
          <p className="mb-4">
            Para mais informações, entre em contato pelo e-mail{' '}
            <a
              href="mailto:elevenbiohacking@hotmail.com"
              className="text-blue-600"
            >
              elevenbiohacking@hotmail.com
            </a>
          </p>
          <p className="mb-4">
            <strong>ELEVEN BIOHACKING LTDA.</strong>
            <br />
            CNPJ 53.541.265/0001-63
            <br />
            <a
              href="https://www.elevenbiohacking.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              www.elevenbiohacking.com
            </a>
          </p>
        </div>
        <div className="w-full flex justify-around h-100">
          <ButtonModal
            onClick={onClose}
          >
            Fechar
          </ButtonModal>
					<ButtonModal
            onClick={onAccept}
          >
            Eu li e aceito
          </ButtonModal>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;