import { pipeline, AutoTokenizer } from "@xenova/transformers";

let model: any;
let tokenizer: any;

// Load model
async function loadModel() {
  if (!model) {
    console.log("Loading embedding model...");
    model = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    tokenizer = await AutoTokenizer.from_pretrained("Xenova/all-MiniLM-L6-v2");
    console.log("Model and tokenizer loaded successfully!");
  }
}

// Truncate text correctly
async function truncateText(text: string, maxTokens: number = 512): Promise<string> {
  const encoded = await tokenizer(text, { truncation: true, max_length: maxTokens });
  return tokenizer.decode(encoded.input_ids, { skip_special_tokens: true });
}

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  await loadModel();
  console.log("Generating embeddings using MiniLM (384-dim)...");

  return Promise.all(texts.map(async (text) => {
    const truncatedText = await truncateText(text);
    const embedding = await model(truncatedText, { pooling: "mean", normalize: true });

    console.log(`Generated embedding of size: ${embedding.data.length}`); // Should be 384

    return Array.from(embedding.data as Float32Array);
  }));
}
