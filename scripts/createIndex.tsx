import { Pinecone } from "@pinecone-database/pinecone";

const PINECONE_API_KEY = "pcsk_59g8BQ_K3FfxDeQYVnKHNqnGr4S55Veb9jFHx5H7bA6gNMHWtf7Jw9B68aGHLsAZKNVXyT";
const PINECONE_INDEX = "resume-index";

const pc = new Pinecone({ apiKey: PINECONE_API_KEY });

async function createIndex() {
  console.log(`Creating Pinecone index: ${PINECONE_INDEX} with dimension 384...`);

  await pc.createIndex({
    name: PINECONE_INDEX,
    dimension: 384,
    metric: "cosine",
    spec: { serverless: { cloud: "aws", region: "us-east-1" } },
  });

  console.log("✅ Index created successfully!");
}

createIndex().catch(console.error);
