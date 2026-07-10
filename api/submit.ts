import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, category, description, downloadUrl } = req.body;

  const botUrl = process.env.BOT_URL;

  if (!botUrl) {
    return res.status(500).json({ error: 'Bot URL missing' });
  }

  const response = await fetch(`${botUrl}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      category,
      description,
      downloadUrl,
    }),
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'Bot failed' });
  }

  return res.status(200).json({ success: true });
}