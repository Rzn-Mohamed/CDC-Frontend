// Import necessary packages
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import fetch, { Headers, Request, Response } from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Make fetch and related classes available globally for the Google Generative AI library
globalThis.fetch = fetch;
globalThis.Headers = Headers;
globalThis.Request = Request;
globalThis.Response = Response;

// Get API key and backend URL from environment variables
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/api/cdc";

// Initialize the Gemini model directly with the Google API
const initGeminiModel = () => {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
  // Use gemini-2.0-flash instead of gemini-1.5-pro
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  return model;
};

// Fetch all CDCs from the backend
const fetchAllCDCs = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/all");
    console.log("All CDCs successfully fetched from backend");
    return response.data;
  } catch (error) {
    console.error("Error fetching CDCs from backend:", error.message);
    throw error;
  }
};

// Fetch a specific CDC by ID from the backend
const fetchCDCById = async (cdcId) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/${cdcId}`);
    console.log(`CDC with ID ${cdcId} successfully fetched from backend`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching CDC with ID ${cdcId} from backend:`, error.message);
    throw error;
  }
};

// Fetch data from the backend API
const fetchDataFromBackend = async () => {
  try {
    const response = await axios.get(BACKEND_URL);
    console.log("Data successfully fetched from backend");
    return response.data;
  } catch (error) {
    console.error("Error fetching data from backend:", error.message);
    throw error;
  }
};

// Process the data with Gemini AI
const processDataWithGemini = async (data) => {
  try {
    const model = initGeminiModel();
    
    // Prepare prompt based on the data
    const prompt = `
      Analyze the following data and provide insights:
      ${JSON.stringify(data, null, 2)}
      
      Please provide a summary of key points and any recommendations.
    `;
    
    // Generate content with Gemini
    const result = await model.generateContent(prompt);
    const text = result.response?.text();
    
    return text;
  } catch (error) {
    console.error("Error processing data with Gemini:", error.message);
    throw error;
  }
};

// Function to ask questions to Gemini directly from console
const askGemini = async (question) => {
  try {
    console.log(`Asking Gemini: "${question}"`);
    const model = initGeminiModel();
    
    // Send the question directly to Gemini
    const result = await model.generateContent(question);
    const response = result.response?.text();
    
    console.log("\n--- Gemini Response ---");
    console.log(response);
    console.log("--- End of Response ---\n");
    
    return response;
  } catch (error) {
    console.error("Error communicating with Gemini:", error.message);
    throw error;
  }
};

// Main function to execute the flow
const main = async () => {
  try {
    console.log("Starting to fetch data from backend...");
    
    // For testing purposes, use mock data if the backend is not available
    let data;
    try {
      data = await fetchDataFromBackend();
    } catch (error) {
      console.warn("Could not connect to backend, using mock data instead");
      data = {
        id: "mock-data-1",
        title: "Sample CDC Document",
        sections: [
          { name: "Introduction", content: "This is a sample introduction section" },
          { name: "Objectives", content: "The project aims to improve document processing" }
        ],
        createdAt: new Date().toISOString()
      };
    }
    
    console.log("Processing data with Gemini AI...");
    const insights = await processDataWithGemini(data);
    
    console.log("\n--- Gemini AI Analysis ---");
    console.log(insights);
    console.log("--- End of Analysis ---\n");
    
    return insights;
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
};

// Execute the main function
main();

// Export the functions for potential use in other files
export { fetchDataFromBackend, processDataWithGemini, askGemini, main, initGeminiModel, fetchAllCDCs, fetchCDCById };