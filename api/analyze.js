export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error('[Lens] ANTHROPIC_API_KEY não configurada');
    return res.status(500).json({ error: 'API key não configurada. Configure ANTHROPIC_API_KEY nas variáveis de ambiente do Vercel.' });
  }

  try {
    const { messages, model, max_tokens } = req.body;

    if (!messages || !model) {
      return res.status(400).json({ error: 'Parâmetros inválidos.' });
    }

    console.log(`[Lens] Análise iniciada — model: ${model}`);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens, messages }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Lens] Erro Anthropic:', JSON.stringify(data));
      return res.status(response.status).json({
        error: data.error?.message || `Erro ${response.status} da API Anthropic`
      });
    }

    console.log('[Lens] Sucesso');
    return res.status(200).json(data);

  } catch (err) {
    console.error('[Lens] Erro interno:', err.message);
    return res.status(500).json({ error: 'Erro interno: ' + err.message });
  }
}
