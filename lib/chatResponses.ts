export interface ChatResponse {
  patterns: RegExp[];
  answer: string;
}

export const chatResponses: ChatResponse[] = [
  {
    patterns: [/hours?|open|close|schedule|when/i],
    answer: "Our current office hours vary — please call us at (925) 426-8828 for the most up-to-date schedule. We're always happy to find a time that works for you.",
  },
  {
    patterns: [/location|address|where|directions?|find you|pleasanton/i],
    answer: "We're located in Pleasanton, CA 94566. Call us at (925) 426-8828 and we'll give you exact directions. We're conveniently located for patients throughout the East Bay.",
  },
  {
    patterns: [/phone|call|number|contact/i],
    answer: "You can reach us by phone at (925) 426-8828 or by email at pacificdermatology@yahoo.com. We look forward to hearing from you!",
  },
  {
    patterns: [/email|mail/i],
    answer: "Our email address is pacificdermatology@yahoo.com. For appointment scheduling, calling us directly at (925) 426-8828 is the fastest option.",
  },
  {
    patterns: [/appointment|book|schedule|visit|see.*(doctor|dr|fung)/i],
    answer: "To schedule an appointment with Dr. Fung, please call us at (925) 426-8828. New patients are always welcome — we'd love to meet you!",
  },
  {
    patterns: [/new patient|first.*(visit|appointment|time)|form|paperwork/i],
    answer: "Welcome! New patient registration forms are available to download on our website. Call (925) 426-8828 to schedule your first appointment and we'll walk you through everything.",
  },
  {
    patterns: [/insurance|accept|cover/i],
    answer: "We accept most major insurance plans. Please call us at (925) 426-8828 so we can verify your specific coverage before your visit.",
  },
  {
    patterns: [/medical|acne|eczema|psoriasis|rash|skin.*(cancer|check)|mole|wart|fungal/i],
    answer: "Dr. Fung provides comprehensive medical dermatology including acne treatment, eczema, psoriasis, skin cancer screenings, mole evaluations, and much more. Visit our Services page for the full list, or call (925) 426-8828.",
  },
  {
    patterns: [/cosmetic|botox|filler|laser|peel|rejuv|anti.?aging|wrinkle|aesthetic/i],
    answer: "We offer a full range of cosmetic treatments including Botox, dermal fillers, laser treatments, and chemical peels. Our goal is natural, elegant results. Call (925) 426-8828 to discuss your goals with Dr. Fung.",
  },
  {
    patterns: [/dr\.?\s*fung|doctor|physician|board/i],
    answer: "Dr. Hank Fung is a board-certified dermatologist with over 20 years of experience serving the Pleasanton and East Bay community. He combines deep medical expertise with a patient-centered approach to care.",
  },
  {
    patterns: [/cost|price|how much|fee|pay/i],
    answer: "Pricing varies by service and insurance coverage. Please call us at (925) 426-8828 and our team will provide a clear estimate for your specific needs.",
  },
  {
    patterns: [/hello|hi|hey|good (morning|afternoon|evening)|howdy/i],
    answer: "Hello! Welcome to Pacific Dermatology. I'm here to help answer your questions about our services, Dr. Fung, appointments, and more. What can I help you with today?",
  },
  {
    patterns: [/thank|thanks|thank you/i],
    answer: "You're very welcome! Is there anything else I can help you with? Feel free to call us at (925) 426-8828 anytime.",
  },
];

export function getResponse(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  for (const { patterns, answer } of chatResponses) {
    if (patterns.some((p) => p.test(trimmed))) {
      return answer;
    }
  }

  return "Great question! For the most accurate answer, please call us directly at (925) 426-8828 or email pacificdermatology@yahoo.com. Our team is always happy to help.";
}
