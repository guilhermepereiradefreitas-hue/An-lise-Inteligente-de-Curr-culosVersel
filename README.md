# Lens — Análise Inteligente de Currículos

> Ferramenta web de análise de currículos com IA, comparação de candidatos, histórico persistente e exportação de relatórios. Desenvolvida para equipes de RH e recrutadores.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológica](#stack-tecnológica)
- [Como Usar](#como-usar)
- [Deploy no Vercel](#deploy-no-vercel)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Histórico de Versões](#histórico-de-versões)
- [Autor](#autor)

---

## Visão Geral

O **Lens** é uma aplicação web que permite a recrutadores e equipes de RH analisar currículos em PDF em relação a descrições de vagas, utilizando a API da Anthropic (Claude) para gerar análises detalhadas com pontuações, identificação de gaps e **pontos cegos** — informações que o CV não evidencia mas que são relevantes para a decisão de contratar.

---

## Funcionalidades

### v2.1.0 — Atual

| Funcionalidade | Descrição |
|---|---|
| **Upload de PDF** | Arraste ou selecione currículos em PDF via interface intuitiva |
| **Análise por IA** | Integração com Claude Sonnet via API da Anthropic |
| **Score geral (0–100)** | Pontuação visual com anel animado e código de cores |
| **Subscores** | Avaliação separada de Experiência, Técnico, Soft Skills e Apresentação |
| **Veredicto** | Recomendação clara: Avançar / Avaliar / Não Recomendado |
| **Pontos Fortes** | Lista de diferenciais do candidato para a vaga |
| **Gaps identificados** | Lacunas específicas em relação à descrição da vaga |
| **Pontos Cegos** | O que o CV não mostra — padrões ocultos, riscos e sinais não evidentes |
| **Perguntas de entrevista** | 5 perguntas geradas para investigar gaps e pontos cegos |
| **Comparação de candidatos** | Análise lado a lado de múltiplos candidatos, ordenados por score |
| **Histórico persistente** | Análises salvas automaticamente entre sessões |
| **Exportação** | Relatório completo exportado em HTML (imprimível como PDF) |

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Frontend | HTML5 + CSS3 + JavaScript (Vanilla) |
| Backend | Vercel Serverless Functions (Node.js) |
| Tipografia | Fraunces · Syne · IBM Plex Mono (Google Fonts) |
| Leitura de PDF | PDF.js v3.11.174 (Mozilla) |
| IA / LLM | Anthropic Claude Sonnet (`claude-sonnet-4-20250514`) |
| Deploy | Vercel (free tier) |

---

## Deploy no Vercel

### Pré-requisitos

- Conta no [Vercel](https://vercel.com) (gratuita)
- Conta no [GitHub](https://github.com) (gratuita)
- Chave de API da Anthropic — obtenha em [console.anthropic.com](https://console.anthropic.com)

---

### Passo 1 — Subir o código no GitHub

1. Crie um repositório novo em [github.com/new](https://github.com/new)
   - Nome sugerido: `lens-pro`
   - Visibilidade: **Private** (recomendado)

2. Faça upload dos arquivos do projeto:
```
lens-pro/
├── index.html
├── vercel.json
├── README.md
└── api/
    └── analyze.js
```

> No GitHub, clique em **"uploading an existing file"** e arraste a pasta inteira.

---

### Passo 2 — Conectar ao Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em **"Import Git Repository"**
3. Conecte sua conta do GitHub e selecione o repositório `lens-pro`
4. Mantenha todas as configurações padrão e clique em **Deploy**

---

### Passo 3 — Configurar a variável de ambiente

> ⚠️ Este passo é obrigatório. Sem ele, a IA não funcionará.

1. No dashboard do Vercel, acesse seu projeto
2. Vá em **Settings → Environment Variables**
3. Clique em **Add New**:

| Campo | Valor |
|---|---|
| **Name** | `ANTHROPIC_API_KEY` |
| **Value** | `sk-ant-api03-...` (sua chave) |
| **Environment** | Production, Preview, Development |

4. Clique em **Save**
5. Vá em **Deployments → ⋯ → Redeploy** para aplicar a variável

---

### Passo 4 — Acessar o site

Após o redeploy, seu Lens estará disponível em:
```
https://lens-pro.vercel.app
```
(ou o domínio gerado pelo Vercel — você pode customizar nas configurações)

---

### Atualizações futuras

A cada nova versão, basta atualizar os arquivos no GitHub. O Vercel faz o redeploy automaticamente em menos de 30 segundos.

---

## Estrutura do Projeto

```
lens-pro/
├── index.html          # Frontend completo (UI + lógica)
├── vercel.json         # Configuração de rotas do Vercel
├── README.md           # Este arquivo
└── api/
    └── analyze.js      # Serverless function — proxy seguro da API Anthropic
```

### Como funciona a segurança

```
Usuário (browser)
      │
      │  POST /api/analyze  (sem chave)
      ▼
Vercel Serverless Function (api/analyze.js)
      │
      │  + ANTHROPIC_API_KEY (variável de ambiente)
      ▼
API Anthropic
```

A chave de API **nunca é enviada ao browser** — ela fica exclusivamente no servidor Vercel.

---

## Como Usar

```
1. Acesse a URL do seu deploy no Vercel

2. Aba "Analisar":
   - Preencha nome do candidato e cargo
   - Faça upload do currículo em PDF
   - Cole a descrição da vaga
   - Clique em "Analisar Candidato →"

3. Leia o resultado:
   - Score geral e veredicto
   - Subscores por dimensão
   - Pontos fortes e gaps
   - Pontos Cegos (⚑) — seção mais crítica
   - Perguntas sugeridas para entrevista

4. Aba "Comparar":
   - Clique em "+ Adicionar à comparação" nos resultados
   - Repita para outros candidatos
   - Visualize lado a lado na aba Comparar

5. Exportar:
   - Clique em "⬇ Exportar PDF" nos resultados
   - Use Ctrl+P → "Salvar como PDF" no navegador
```

---

## Histórico de Versões

### v2.1.0 — 19/02/2026
- Comparação de múltiplos candidatos com ranking por score
- Histórico de análises persistente entre sessões
- Exportação de relatório em HTML/PDF
- Campos de nome do candidato e cargo disputado
- Rodapé com versão, autor e copyright
- **Deploy no Vercel com variável de ambiente segura**
- Proxy serverless (`api/analyze.js`) — chave nunca exposta no frontend
- Refatoração completa para tema dark com design system unificado
- Navegação por abas (Analisar / Comparar / Histórico)

---

### v1.0.0 — 18/02/2026
- Lançamento inicial
- Upload de PDF e extração de texto via PDF.js
- Análise por IA com score geral (0–100)
- Pontos fortes, gaps e pontos cegos
- 5 perguntas de entrevista geradas automaticamente
- Veredicto: Avançar / Avaliar / Não Recomendado
- Interface responsiva

---

## Licença

© 2026 Lens. Todos os direitos reservados.

Este projeto foi desenvolvido de forma proprietária. Nenhuma parte deste código pode ser reproduzida, distribuída ou utilizada sem autorização expressa do autor.

---

## Autor

**Guilherme Pereira**
v2.1.0 · Lens — Análise Inteligente de Currículos
© 2026 Lens. Todos os direitos reservados.
