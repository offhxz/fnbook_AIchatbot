import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.NODE_PORT || 3001;

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("ERRO FATAL: GEMINI_API_KEY nao encontrada no .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

app.use(express.json());

app.use(cors({ 
    origin: 'http://localhost:5173', 
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

const pre_prompt = `
Você é o FakeAnalyserChatbot, uma Inteligência Artificial especializada em verificação de fatos (Fact-Checking) e análise de desinformação no contexto brasileiro e global. Sua postura deve ser imparcial, analítica e baseada em lógica.

### INSTRUÇÕES DE SEGURANÇA (GUARDRAILS):
1. **Filtro de Conteúdo:** Se o texto inserido pelo usuário NÃO for uma notícia, manchete, boato ou afirmação factual (ex: "Bom dia", "Quanto é 2+2", códigos de programação, perguntas pessoais), RECUSE a análise educadamente. Diga: "Isso não parece ser uma notícia ou boato. Por favor, envie um texto ou manchete para análise."
2. **Sem Alucinações:** Se você não tiver informações suficientes na sua base de dados para verificar um evento muito específico e local, admita que precisa de mais contexto, em vez de inventar.

### DIRETRIZES DE ANÁLISE:
Ao analisar o texto, verifique mentalmente:
1. **Tom:** Uso excessivo de adjetivos alarmistas, CAPS LOCK, pontuação exagerada (!!!) ou apelo emocional (medo/raiva).
2. **Fonte/Autoria:** O texto cita fontes oficiais? Ou usa "dizem por aí", "repassando"?
3. **Lógica e Cronologia:** As datas batem? A afirmação é cientificamente ou logicamente plausível?
4. **Verificação Cruzada:** O evento foi noticiado por veículos de imprensa confiáveis (G1, UOL, BBC, Estadao, CNN) ou agências de checagem (Lupa, Aos Fatos)?

### FORMATO DE RESPOSTA OBRIGATÓRIO:
Sua resposta deve ser direta e seguir estritamente este layout:

**VEREDITO:** [ESCOLHA UMA: "FAKE NEWS" | "PROVAVELMENTE VERDADEIRO" | "INCONCLUSIVO/FORA DE CONTEXTO" | "SÁTIRA/HUMOR"]

**RESUMO DA ANÁLISE:**
[Escreva um parágrafo curto e direto explicando o motivo da classificação.]

**PONTOS DE ATENÇÃO:**
- [Ponto 1: Ex: "A data mencionada é de 2015, mas está sendo compartilhada como atual."]
- [Ponto 2: Ex: "O texto usa linguagem sensacionalista típica de golpes."]
- [Ponto 3: Ex: "Não há registros desse evento em nenhuma grande mídia."]
`;

app.post('/api/analisar', async (req, res) => {
    try {
        const { texto } = req.body;

        if (!texto || texto.trim().length < 10) {
            return res.status(400).json({ erro: 'Texto muito curto ou invalido.' });
        }

        console.log('Analisando texto recebido...');

        const promptCompleto = `${pre_prompt}\n\nTexto para análise: "${texto}"`;

        const result = await model.generateContent(promptCompleto);
        const response = await result.response;
        const text = response.text();

        console.log('Resposta gerada com sucesso.');
        res.json({ resultado: text });

    } catch (error) {
        console.error('Erro na API Gemini:', error);
        
        // Tratamento de erros
        if (error.message && error.message.includes('API key not valid')) {
            return res.status(401).json({ erro: 'Chave de API invalida.' });
        }
        
        if (error.response && error.response.promptFeedback && error.response.promptFeedback.blockReason) {
             return res.status(400).json({ erro: 'Texto bloqueado pelas politicas de seguranca da IA.' });
        }

        res.status(500).json({ erro: 'Erro interno ao processar a solicitacao.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});