import { groq } from "@/lib/groq";
import { EmploymentType } from "@/generated/prisma/enums";

interface LoanAnalysisInput {
  loanAmount: number;
  loanTermMonths: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  existingLoanEmi: number;
  savings: number;
  creditScore: number;
  employmentType: EmploymentType;
}

export async function generateLoanAnalysis(input: LoanAnalysisInput) {
  const prompt = `
You are a senior loan underwriter.

Analyze the following loan application.

Return ONLY valid JSON.

{
  "eligible": true,
  "riskScore": 0,
  "confidenceScore": 0,
  "recommendedAmount": 0,
  "reasoning": ""
}

Loan Details

Requested Amount: ${input.loanAmount}

Loan Term: ${input.loanTermMonths} months

Employment Type: ${input.employmentType}

Monthly Income: ${input.monthlyIncome}

Monthly Expenses: ${input.monthlyExpenses}

Existing EMI: ${input.existingLoanEmi}

Savings: ${input.savings}

Credit Score: ${input.creditScore}
`;

  const response = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL!,
    temperature: 0.2,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: "You are an expert loan underwriting AI. Return only JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!);
}
