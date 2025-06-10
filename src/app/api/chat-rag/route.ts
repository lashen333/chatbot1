import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RetrievalQAChain } from 'langchain/chains';

const CRO_FAQ = `
Conversion Rate Optimization (CRO) is the process of improving your website’s ability to convert visitors.
This includes UI/UX optimization, A/B testing, improving CTAs, and using AI-powered strategies.
Aenigm3 Labs helps businesses grow with CRO audits, funnel optimization, and ad performance strategies.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const question = messages[messages.length - 1].content;

    console.log("📥 Question:", question);

    // Split FAQ text
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 300 });
    const docs = await splitter.createDocuments([CRO_FAQ]);

    // Create vector store in memory
    const vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY })
    );

    // Create chat model
    const model = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo', // or 'gpt-4'
      temperature: 0.7,
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create RAG chain
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
    const result = await chain.invoke({ query: question });

    console.log("✅ Answer:", result.text);

    return NextResponse.json({
      reply: {
        role: 'assistant',
        content: result.text,
      },
    });

  } catch (err: any) {
    console.error("❌ Server Error:", err?.message || err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
