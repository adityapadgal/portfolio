import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

    // Mock resume context (Replace with ChromaDB retrieval later)
    const context = "My resume includes experience in data engineering, ML, and AI systems.";

    // Call Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are answering questions about my resume." },
          { role: "user", content: `Context: ${context}\nQuestion: ${query}\nAnswer:` },
        ],
        max_completion_tokens: 200,
        temperature: 0.7,
        top_p: 0.9
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch AI response" }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ answer: data.choices[0].message.content });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
