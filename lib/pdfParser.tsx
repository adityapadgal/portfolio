import fs from "fs";
import pdf from "pdf-parse";

export async function extractTextFromPDF(filePath: string): Promise<string> {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer); // Call function correctly
    return pdfData.text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF.");
  }
}
