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

  await fetch(webhookUrl!, {
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
              value: title,
            },
            {
              name: 'Category',
              value: category,
            },
            {
              name: 'Description',
              value: description,
            },
            {
              name: 'Download',
              value: downloadUrl,
            },
          ],
        },
      ],
    }),
  });

  return res.json({ success: true });
}