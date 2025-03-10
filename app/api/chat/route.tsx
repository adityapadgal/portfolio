import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { getEmbeddings } from "@/lib/embeddings";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY!;
const PINECONE_INDEX = process.env.PINECONE_INDEX!;
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

const pc = new Pinecone({ apiKey: PINECONE_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

    console.log("Generating query embedding...");
    const [queryEmbedding] = await getEmbeddings([query]);

    console.log("Searching Pinecone for relevant resume data...");
    const index = pc.index(PINECONE_INDEX);

    // Perform a similarity search in Pinecone
    const pineconeResults = await index.query({
      vector: queryEmbedding,
      topK: 3, // Retrieve top 3 most relevant sections
      includeValues: true,
      includeMetadata: true,
    });

    const matches = pineconeResults.matches || [];
    if (matches.length === 0) {
      return NextResponse.json({ answer: "No relevant information found in resume." });
    }

    // Combine retrieved context
    const context = matches.map(match => match.metadata?.text).join("\n");

    console.log("Context Retrieved:", context);

    // Call Groq API for LLM response
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // Choose available Groq model
        messages: [
          { role: "system", content: "You are an AI assistant answering questions about my resume." },
          { role: "user", content: `Context: ${context}\n\nQuestion: ${query}\nAnswer:` },
        ],
        max_completion_tokens: 200,
        temperature: 0.7,
        top_p: 0.9,
      }),
    });

    const data = await response.json();
    return NextResponse.json({ answer: data.choices[0].message.content });

  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
