import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return NextResponse.json({
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: "I'm sorry, but my AI service is not properly configured. Please contact support."
      });
    }

    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    // Get the latest user message
    const userMessage = messages[messages.length - 1].content;

    // List of models to try (free tier compatible)
    const modelsToTry = [
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest', 
      'gemini-pro',
      'models/gemini-1.5-flash'
    ];

    let result;
    let lastError;

    // Mental health focused prompt
    const prompt = `You are a compassionate AI mental health companion for college students. Your role is to:
    - Provide emotional support and active listening
    - Offer coping strategies and stress management techniques
    - Encourage seeking professional help when appropriate
    - Detect signs of crisis and provide emergency resources
    - Be empathetic, non-judgmental, and supportive

    IMPORTANT GUIDELINES:
    - Always acknowledge the person's feelings as valid
    - If someone mentions self-harm, suicide, or crisis, immediately provide crisis resources (988 Suicide & Crisis Lifeline)
    - Keep responses conversational, warm, and under 200 words
    - Suggest professional therapy or counseling when appropriate
    - Don't diagnose or provide medical advice
    - Focus on emotional support and coping strategies

    Student message: "${userMessage}"

    Respond as a caring mental health companion:`;

    // Try different models until one works
    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        console.log('Calling Gemini API with user message:', userMessage);
        result = await model.generateContent(prompt);
        
        // If we get here, the model worked
        console.log('Successfully got response from model:', modelName);
        break;
        
      } catch (error) {
        console.log(`Model ${modelName} failed:`, error.message);
        lastError = error;
        continue;
      }
    }

    // If no model worked, throw the last error
    if (!result) {
      console.error('All models failed. Last error:', lastError);
      throw lastError || new Error('All models failed');
    }
    
    const response = await result.response;
    const text = response.text();

    console.log('Gemini API response received successfully:', text.substring(0, 100) + '...');

    // Return in the format expected by useChat hook
    return NextResponse.json({
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: text
    });

  } catch (error) {
    console.error('Detailed error calling Gemini API:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // More specific fallback response based on error type
    let fallbackMessage = "I'm here to listen and support you. It seems I'm having trouble connecting right now, but please know that your feelings are important. If you're in crisis, please reach out to the 988 Suicide & Crisis Lifeline or contact emergency services.";
    
    if (error.message?.includes('API_KEY')) {
      fallbackMessage = "I'm experiencing a configuration issue. Please try again in a moment or contact support if the problem persists.";
    } else if (error.message?.includes('quota')) {
      fallbackMessage = "I'm temporarily unavailable due to high usage. Please try again in a few minutes.";
    }
    
    return NextResponse.json({
      id: `msg-${Date.now()}`,
      role: 'assistant', 
      content: fallbackMessage
    });
  }
}