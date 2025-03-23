from nearai.agents.environment import Environment
import os
import requests
import time
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer
import json

CONTRACT_TEMPLATE = {
    "pt-BR": {
        "title": "CONTRATO DE PRESTAÇÃO DE SERVIÇOS",
        "sections": [
            ("IDENTIFICAÇÃO DAS PARTES", 
             "Entre:\n\n"
             "[NOME COMPLETO DO CONTRATANTE], [nacionalidade], [estado civil], [profissão], portador do CPF nº [Número do CPF], residente e domiciliado [Endereço Completo], doravante denominado CONTRATANTE;\n\n"
             "e\n\n"
             "[NOME COMPLETO DO CONTRATADO], [nacionalidade], [estado civil], [profissão], portador do CPF nº [Número do CPF], residente e domiciliado [Endereço Completo], doravante denominado CONTRATADO;"),

            ("CLÁUSULA 1ª - DO OBJETO", 
             "O objeto do presente contrato consiste na prestação dos seguintes serviços por parte do CONTRATADO ao CONTRATANTE: [Descrição detalhada dos serviços, especificações técnicas, entregáveis]."),

            ("CLÁUSULA 2ª - DO PRAZO", 
             "O presente contrato terá vigência de [Data de início] a [Data de término], podendo ser renovado mediante acordo escrito entre as partes."),

            ("CLÁUSULA 3ª - DA REMUNERAÇÃO", 
             "Pela execução dos serviços, o CONTRATANTE pagará ao CONTRATADO o valor total de R$ [Valor numérico] ([Valor por extenso]), mediante [Forma de pagamento: parcelamento, condições, prazos].\n"
             "Pagamentos serão realizados através de [Meio de pagamento] para a conta bancária [Dados bancários completos]."),

            ("CLÁUSULA 4ª - DAS OBRIGAÇÕES DAS PARTES", 
             "O CONTRATADO obriga-se a:\n"
             "a) Executar os serviços com diligência e profissionalismo\n"
             "b) [Outras obrigações específicas]\n\n"
             "O CONTRATANTE obriga-se a:\n"
             "a) Fornecer todos os recursos necessários\n"
             "b) [Outras obrigações específicas]"),

            ("CLÁUSULA 5ª - DA CONFIDENCIALIDADE", 
             "As partes comprometem-se a manter sigilo sobre todas as informações trocadas durante a vigência do contrato."),

            ("CLÁUSULA 6ª - DA RESCISÃO", 
             "O contrato poderá ser rescindido por:\n"
             "a) Descumprimento de cláusulas por qualquer das partes\n"
             "b) [Outras condições de rescisão]"),

            ("CLÁUSULA 7ª - DISPOSIÇÕES FINAIS", 
             "Quaisquer alterações devem ser feitas por escrito e assinadas por ambas as partes.\n"
             "Os Tribunais de [Cidade/Estado] serão competentes para dirimir quaisquer dúvidas decorrentes deste contrato."),

            ("ASSINATURAS", 
             "__________________________________________\n"
             "[Nome do Contratante]\n\n"
             "__________________________________________\n"
             "[Nome do Contratado]\n\n"
             "Data: __/__/____")
        ]
    },
    "en": {
        "title": "SERVICE AGREEMENT CONTRACT",
        "sections": [
            ("PARTIES IDENTIFICATION", 
             "Between:\n\n"
             "[FULL NAME OF CLIENT], [nationality], [marital status], [profession], holder of CPF nº [CPF Number], resident at [Full Address], hereinafter referred to as CLIENT;\n\n"
             "and\n\n"
             "[FULL NAME OF PROVIDER], [nationality], [marital status], [profession], holder of CPF nº [CPF Number], resident at [Full Address], hereinafter referred to as PROVIDER;"),

            ("CLAUSE 1 - OBJECT", 
             "The purpose of this agreement is the provision of the following services by PROVIDER to CLIENT: [Detailed service description, technical specifications, deliverables]."),

            ("CLAUSE 2 - TERM", 
             "This agreement shall be effective from [Start Date] to [End Date], renewable by written agreement between both parties."),

            ("CLAUSE 3 - COMPENSATION", 
             "For the services rendered, CLIENT shall pay PROVIDER the total amount of R$ [Numeric Value] ([Value in Words]), through [Payment method: installments, conditions, terms].\n"
             "Payments shall be made via [Payment method] to bank account [Complete bank details]."),

            ("CLAUSE 4 - PARTIES' OBLIGATIONS", 
             "PROVIDER agrees to:\n"
             "a) Perform services with due diligence and professionalism\n"
             "b) [Other specific obligations]\n\n"
             "CLIENT agrees to:\n"
             "a) Provide all necessary resources\n"
             "b) [Other specific obligations]"),

            ("CLAUSE 5 - CONFIDENTIALITY", 
             "Both parties commit to maintain confidentiality regarding all information exchanged during the term of this agreement."),

            ("CLAUSE 6 - TERMINATION", 
             "This agreement may be terminated due to:\n"
             "a) Breach of contract terms by either party\n"
             "b) [Other termination conditions]"),

            ("CLAUSE 7 - GENERAL PROVISIONS", 
             "Any amendments must be made in writing and signed by both parties.\n"
             "The Courts of [City/State] shall have jurisdiction over any disputes arising from this agreement."),

            ("SIGNATURES", 
             "__________________________________________\n"
             "[Client Name]\n\n"
             "__________________________________________\n"
             "[Provider Name]\n\n"
             "Date: __/__/____")
        ]
    }
}

def create_professional_contract(language="pt-BR"):
    """Cria um template de contrato profissional"""
    template = CONTRACT_TEMPLATE.get(language, CONTRACT_TEMPLATE["pt-BR"])
    contract = [template["title"] + "\n\n"]
    
    for section in template["sections"]:
        contract.append(f"{section[0].upper()}\n")
        contract.append(f"{section[1]}\n\n")
    
    return "\n".join(contract)

def get_chat_messages(chat_id):
    """Obtém as mensagens do chat a partir da API"""
    url = f"http://localhost:3001/chats/{chat_id}/messages"  # Substitua pela sua URL real
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()  # Retorna as mensagens do chat
    else:
        print("Erro ao buscar mensagens:", response.text)
        return []

def format_chat_context(messages):
    """Formata as mensagens do chat para serem usadas no prompt"""
    formatted_context = "\n".join([f"User {msg['user_id']}: {msg['message']}" for msg in messages])
    return f"Chat Context:\n{formatted_context}\n\n"

def generate_versioned_filename(base_name, extension="txt"):
    """Gera um nome de arquivo com base em timestamp ou versão"""
    timestamp = time.strftime("%Y-%m-%d_%H-%M-%S")  # Usa o timestamp atual
    return f"{base_name}_{timestamp}.{extension}"

def save_contract_draft_as_txt(contract_content, filename):
    """Salva o rascunho do contrato em um arquivo .txt"""
    local_path = os.path.expanduser(f"~/Desktop/{filename}")

    # Salva o conteúdo do contrato em formato .txt
    with open(local_path, "w") as file:
        file.write(contract_content)

    print(f"Rascunho do contrato salvo como .txt em: {local_path}")

def fill_contract_template(contract_data, language="pt-BR"):
    # Obtemos o template do contrato com base no idioma
    contract_template = CONTRACT_TEMPLATE.get(language, {})
    if not contract_template:
        raise ValueError(f"Template não encontrado para o idioma {language}")

    # Inicializamos as seções do contrato
    filled_sections = []
    
    # Preenche o título do contrato
    title = contract_template.get("title", "Contrato de Serviço")
    
    # Preenche as seções do contrato
    for section_title, section_text in contract_template.get("sections", []):
        filled_text = section_text
        
        # Substitui os placeholders com os dados do contrato
        filled_text = filled_text.replace("[NOME COMPLETO DO CONTRATANTE]", contract_data.get("contratante", {}).get("nome_completo", "[NOME COMPLETO DO CONTRATANTE]"))
        filled_text = filled_text.replace("[nacionalidade]", contract_data.get("contratante", {}).get("nacionalidade", "[nacionalidade]"))
        filled_text = filled_text.replace("[estado civil]", contract_data.get("contratante", {}).get("estado_civil", "[estado civil]"))
        filled_text = filled_text.replace("[profissão]", contract_data.get("contratante", {}).get("profissao", "[profissão]"))
        filled_text = filled_text.replace("[Número do CPF]", contract_data.get("contratante", {}).get("cpf", "[Número do CPF]"))
        filled_text = filled_text.replace("[Endereço Completo]", contract_data.get("contratante", {}).get("endereco", "[Endereço Completo]"))
        
        filled_text = filled_text.replace("[NOME COMPLETO DO CONTRATADO]", contract_data.get("contratado", {}).get("nome_completo", "[NOME COMPLETO DO CONTRATADO]"))
        filled_text = filled_text.replace("[nacionalidade]", contract_data.get("contratado", {}).get("nacionalidade", "[nacionalidade]"))
        filled_text = filled_text.replace("[estado civil]", contract_data.get("contratado", {}).get("estado_civil", "[estado civil]"))
        filled_text = filled_text.replace("[profissão]", contract_data.get("contratado", {}).get("profissao", "[profissão]"))
        filled_text = filled_text.replace("[Número do CPF]", contract_data.get("contratado", {}).get("cpf", "[Número do CPF]"))
        filled_text = filled_text.replace("[Endereço Completo]", contract_data.get("contratado", {}).get("endereco", "[Endereço Completo]"))
        
        filled_text = filled_text.replace("[Descrição detalhada dos serviços]", contract_data.get("servicos", "[Descrição detalhada dos serviços]"))
        filled_text = filled_text.replace("[Data de início]", contract_data.get("prazo", {}).get("inicio", "[Data de início]"))
        filled_text = filled_text.replace("[Data de término]", contract_data.get("prazo", {}).get("termino", "[Data de término]"))
        
        # Garantimos que o valor numérico seja uma string
        valor_numerico = str(contract_data.get("pagamento", {}).get("valor", "[Valor numérico]"))
        filled_text = filled_text.replace("[Valor numérico]", valor_numerico)
        
        filled_text = filled_text.replace("[Valor por extenso]", contract_data.get("pagamento", {}).get("extenso", "[Valor por extenso]"))
        filled_text = filled_text.replace("[Forma de pagamento]", contract_data.get("pagamento", {}).get("metodo", "[Forma de pagamento]"))
        filled_text = filled_text.replace("[Meio de pagamento]", contract_data.get("pagamento", {}).get("metodo", "[Meio de pagamento]"))
        filled_text = filled_text.replace("[Dados bancários completos]", contract_data.get("pagamento", {}).get("dados_bancarios", "[Dados bancários completos]"))
        
        filled_text = filled_text.replace("[Cidade/Estado]", contract_data.get("jurisdicao", "[Cidade/Estado para jurisdição]"))
        
        # Adiciona a seção preenchida na lista
        filled_sections.append(f"{section_title}\n{filled_text}")
    
    # Combina o título e as seções preenchidas para gerar o contrato completo
    final_contract = f"{title}\n\n" + "\n\n".join(filled_sections)
    return final_contract

def run(env: Environment):
    chat_id = 2  # Chat específico que queremos processar
    chat_messages = get_chat_messages(chat_id)

    # Formata o contexto do chat para ser usado no prompt
    chat_context = format_chat_context(chat_messages)

    # Detecta o idioma principal do chat
    def detect_language(messages):
        portuguese_keywords = ['serviço', 'contrato', 'valor', 'prazo']
        for msg in messages:
            if any(keyword in msg['message'].lower() for keyword in portuguese_keywords):
                return "pt-BR"
        return "en"

    contract_language = detect_language(chat_messages)

    # Prompt modificado para extração estruturada de dados
    prompt = {
        "role": "system",
        "content": f"""Você é um assistente de contratos especializado em extrair informações de conversas. 
    Analise o histórico do chat abaixo e retorne APENAS UM JSON VÁLIDO, sem explicações adicionais, no seguinte formato:

    Histórico da conversa:
    {chat_context}

    {{
        "contratante": {{
            "nome_completo": "[NOME COMPLETO DO CONTRATANTE]",
            "nacionalidade": "[nacionalidade]",
            "cpf": "[Número do CPF]",
            "endereco": "[Endereço Completo]"
        }},
        "contratado": {{
            "nome_completo": "[NOME COMPLETO DO CONTRATADO]",
            "nacionalidade": "[nacionalidade]",
            "cpf": "[Número do CPF]",
            "endereco": "[Endereço Completo]"
        }},
        "servicos": "[Descrição detalhada dos serviços]",
        "prazo": {{ 
            "inicio": "[Data de início]", 
            "termino": "[Data de término]" 
        }},
        "pagamento": {{
            "valor": "[Valor numérico]",
            "extenso": "[Valor por extenso]",
            "metodo": "[Forma de pagamento]",
            "dados_bancarios": "[Dados bancários completos]"
        }},
        "jurisdicao": "[Cidade/Estado para jurisdição]"
    }}

    IMPORTANTE:
    1. Retorne SOMENTE o JSON, sem explicações adicionais.
    2. Se algum dado não estiver na conversa, mantenha o marcador "[ ]".
    3. O idioma do contrato deve ser {contract_language}.
    """
    }

    # Processa o prompt e obtém os dados estruturados
    result = env.completion([prompt] + env.list_messages())
    
    print("Resposta do AI:", result)  # Adiciona um log para debugar a resposta do AI
    try:
        contract_data = json.loads(result)
    except json.JSONDecodeError as e:
        print("Erro ao parsear resposta do AI:", e)
        contract_data = {}


    # Gera o contrato profissional
    professional_contract = create_professional_contract(contract_language)
    
    # Função para substituição segura de campos
    final_contract = fill_contract_template(contract_data, language="pt-BR")

    # Preenche o template com os dados
    # final_contract = safe_replace(professional_contract, contract_data)

    # Atualiza a geração de PDF com idioma correto
    def save_contract_as_pdf(contract_content, filename, language):
        local_path = os.path.expanduser(f"~/Desktop/{filename}")
        
        doc = SimpleDocTemplate(local_path, pagesize=letter,
                              rightMargin=72, leftMargin=72,
                              topMargin=72, bottomMargin=72)
        
        styles = getSampleStyleSheet()
        styles['Title'].fontName = 'Helvetica-Bold'
        styles['Title'].fontSize = 16
        styles['Title'].spaceAfter = 24
        styles['Title'].alignment = 1

        flowables = []
        
        # Título do contrato
        title = CONTRACT_TEMPLATE[language]["title"]
        flowables.append(Paragraph(title, styles['Title']))
        flowables.append(Spacer(1, 24))
        
        # Conteúdo formatado
        for line in contract_content.split('\n'):
            if any(section in line for section in ["CLÁUSULA", "CLAUSE", "IDENTIFICAÇÃO", "PARTIES"]):
                p = Paragraph(line, styles['Heading2'])
            else:
                p = Paragraph(line, styles['BodyText'])
            
            flowables.append(p)
            flowables.append(Spacer(1, 12))
        
        doc.build(flowables)
        print(f"Contrato salvo como PDF em: {local_path}")

    # Salva os arquivos
    versioned_filename = generate_versioned_filename("contrato_profissional")
    
    save_contract_draft_as_txt(final_contract, f"{versioned_filename}.txt")
    save_contract_as_pdf(final_contract, f"{versioned_filename}.pdf", contract_language)

    # Restante da lógica...
    env.request_user_input()

# Executa o agente
run(env)
