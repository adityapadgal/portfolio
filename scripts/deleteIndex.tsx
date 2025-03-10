import { Pinecone } from "@pinecone-database/pinecone";


const PINECONE_API_KEY = "pcsk_59g8BQ_K3FfxDeQYVnKHNqnGr4S55Veb9jFHx5H7bA6gNMHWtf7Jw9B68aGHLsAZKNVXyT";
const PINECONE_INDEX = "resume-index"; 


const pc = new Pinecone({ apiKey: PINECONE_API_KEY });

async function deleteIndex() {
  console.log(`Deleting Pinecone index: ${PINECONE_INDEX}...`);

  await pc.deleteIndex(PINECONE_INDEX);
  
  console.log("✅ Index deleted successfully!");
}

deleteIndex().catch(console.error);
