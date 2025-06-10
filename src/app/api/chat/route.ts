import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://aenigm3labs.com',
        'X-Title': 'Aenigm3 CRO Chatbot',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages,
        temperature: 0.7,
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      console.error('OpenRouter error:', res.status, text);
      return NextResponse.json({ error: 'OpenRouter failed' }, { status: 500 });
    }

    const data = JSON.parse(text);

    return NextResponse.json({
      reply: data.choices[0].message,
    });
  } catch (error) {
    console.error('Unexpected Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
