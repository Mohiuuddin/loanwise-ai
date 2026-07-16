import { groq } from "@/lib/groq";
import { EmploymentType } from "@/generated/prisma/enums";
import { aiPredictionSchema } from "@/schemas/ai-prediction.schema";

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
You are a senior bank loan underwriter working for a digital bank.

Your task is to evaluate a loan application using standard banking principles.

Evaluation Criteria:
1. Credit Score
2. Debt-to-Income Ratio
3. Monthly Income Stability
4. Existing Loan Obligations
5. Savings Buffer
6. Employment Stability
7. Requested Loan Amount
8. Loan Term

Scoring:
- Risk Score: 0-100
  0 = Very Low Risk
  100 = Extremely High Risk

Confidence Score:
0-100

Recommended Amount:
Return the maximum amount you believe is safe.

Reasoning:
Provide 4-8 sentences explaining WHY you made the decision.

Return ONLY valid JSON.

{
  "eligible": true,
  "riskScore": 20,
  "confidenceScore": 90,
  "recommendedAmount": 50000,
  "reasoning": ""
}

Loan Information

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

  const content = response.choices[0].message.content!;
  const prediction = aiPredictionSchema.parse(JSON.parse(content));

  return prediction;
}
