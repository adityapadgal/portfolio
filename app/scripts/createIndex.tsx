import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

async function createIndex() {
  const indexName = process.env.PINECONE_INDEX!;

  console.log(`Creating Pinecone index: ${indexName}...`);

  await pc.createIndex({
    name: indexName,
    dimension: 1536, // OpenAI's "text-embedding-ada-002" uses 1536 dimensions
    metric: "cosine",
    spec: { serverless: { cloud: "aws", region: process.env.PINECONE_ENV! } },
  });

  console.log("Index created successfully!");
}

createIndex().catch(console.error);
