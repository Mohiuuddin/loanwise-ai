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
You are a senior loan underwriter working for a commercial bank.

Your job is to evaluate loan applications using professional banking standards.

Evaluate the applicant based on:

1. Credit Score
2. Debt-to-Income Ratio
3. Monthly Income
4. Existing Loan Obligations
5. Savings Buffer
6. Employment Stability
7. Requested Loan Amount
8. Loan Term

Guidelines:

Credit Assessment:
- Excellent
- Good
- Fair
- Poor

Affordability:
- Excellent
- Good
- Moderate
- Poor

Employment Risk:
- Low
- Medium
- High

Savings Strength:
- Strong
- Moderate
- Weak

Debt Ratio:
Return a percentage such as "24%"

Risk Score:
Return an integer from 0-100.
0 = Lowest Risk
100 = Highest Risk

Confidence Score:
Return an integer from 0-100.

Recommended Amount:
Return the maximum safe loan amount.

Reasoning:
Write 4-8 concise sentences explaining the decision.

Return ONLY valid JSON.

{
  "eligible": true,
  "riskScore": 18,
  "confidenceScore": 94,
  "recommendedAmount": 50000,
  "reasoning": "Detailed explanation.",

  "creditAssessment": "Excellent",
  "affordability": "Good",
  "employmentRisk": "Low",
  "savingsStrength": "Strong",
  "debtRatio": "22%"
}

Applicant Information

Loan Amount:
${input.loanAmount}

Loan Term:
${input.loanTermMonths} months

Employment Type:
${input.employmentType}

Monthly Income:
${input.monthlyIncome}

Monthly Expenses:
${input.monthlyExpenses}

Existing EMI:
${input.existingLoanEmi}

Savings:
${input.savings}

Credit Score:
${input.creditScore}
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
