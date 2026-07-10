import { useState } from 'react';
// supabase import removed because it's not used in this component

export function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sound Effects');
  const [description, setDescription] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8">Submit a Resource.</h1>

      <div className="space-y-4 max-w-xl">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Resource Title"
          className="w-full p-3 rounded-xl"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full p-3 rounded-xl"
        >
          <option>Sound Effects</option>
          <option>Overlays</option>
          <option>Presets</option>
          <option>Fonts</option>
        </select>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe your resource (what it is, what it's used for, etc.)"
          className="w-full p-3 rounded-xl"
        />

        <input
          type="text"
          value={downloadUrl}
          onChange={(event) => setDownloadUrl(event.target.value)}
          placeholder="Google Drive / Dropbox Download Link"
          className="w-full p-3 rounded-xl"
        />

        <button
          type="button"
    onClick={async () => {
  const response = await fetch('/api/submit', {
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
    console.error('Submission failed');
    return;
  }

  setSubmitted(true);

  setTitle('');
  setCategory('Sound Effects');
  setDescription('');
  setDownloadUrl('');
}}
          className="glass-button-primary px-6 py-3"
        >
          Submit Resource
        </button>
      </div>

      {submitted && (
        <p className="mt-6 text-green-600">
          Resource submitted successfully!
        </p>
      )}
    </main>
  );
}