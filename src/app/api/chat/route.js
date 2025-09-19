import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

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

    Student message: "${message}"

    Respond as a caring mental health companion:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Fallback response
    const fallbackResponse = "I'm here to listen and support you. It seems I'm having trouble connecting right now, but please know that your feelings are important. If you're in crisis, please reach out to the 988 Suicide & Crisis Lifeline or contact emergency services.";
    
    return NextResponse.json({ response: fallbackResponse });
  }
}