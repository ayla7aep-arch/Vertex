import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, category, description, downloadUrl } = req.body;

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return res.status(500).json({ error: 'Webhook missing' });
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      embeds: [
        {
          title: '📥 New Resource Submission',
          fields: [
            {
              name: 'Title',
              value: title || 'No title',
            },
            {
              name: 'Category',
              value: category || 'No category',
            },
            {
              name: 'Description',
              value: description || 'No description',
            },
            {
              name: 'Download Link',
              value: downloadUrl || 'No link',
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'Discord failed' });
  }

  return res.status(200).json({ success: true });
}