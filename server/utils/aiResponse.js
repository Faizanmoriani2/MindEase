export function generateAIResponse(userMessage, mood) {
    const responses = {
      happy: "I'm glad you're feeling good today! Want to talk about what made your day great?",
      sad: "I'm here for you. Do you want to talk about what’s been bothering you?",
      neutral: "Thanks for sharing. Would you like to reflect on your day a bit more?",
      angry: "It's okay to feel angry sometimes. Would you like to vent or calm down?",
      anxious: "Take a deep breath. Want to try a grounding exercise together?",
    };
  
    return responses[mood] || "I'm here to support you however I can.";
  }
  