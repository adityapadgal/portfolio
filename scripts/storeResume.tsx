import { Pinecone } from "@pinecone-database/pinecone";
import { extractTextFromPDF } from "../lib/pdfParser";
import { getEmbeddings } from "../lib/embeddings"; // Now using open-source embeddings

const PINECONE_API_KEY = "pcsk_59g8BQ_K3FfxDeQYVnKHNqnGr4S55Veb9jFHx5H7bA6gNMHWtf7Jw9B68aGHLsAZKNVXyT";
const PINECONE_INDEX = "resume-index";
const pdfPath = "public/resume.pdf";

const pc = new Pinecone({ apiKey: PINECONE_API_KEY });

async function storeResume() {
  console.log("Extracting text from PDF...");
  const resumeText = await extractTextFromPDF(pdfPath);

  console.log("Splitting text into chunks...");
  const resumeChunks = resumeText.split("\n\n"); // Split by paragraphs

  console.log("Generating embeddings...");
  const embeddings = await getEmbeddings(resumeChunks);

  console.log("Initializing Pinecone...");
  const index = pc.index(PINECONE_INDEX);

  console.log("Storing resume in Pinecone...");
  await index.upsert(
    resumeChunks.map((text, i) => ({
      id: `doc-${i}`,
      values: embeddings[i],
      metadata: { text },
    }))
  );

  console.log("Resume stored successfully in Pinecone!");
}

storeResume().catch(console.error);
