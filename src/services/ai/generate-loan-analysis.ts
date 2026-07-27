import { groq } from "@/lib/groq";

import { EmploymentType, LoanPurpose } from "@/generated/prisma/enums";

import { aiPredictionSchema } from "@/schemas/ai-prediction.schema";

interface LoanAnalysisInput {
  loanAmount: number;
  interestRate: number;
  loanPurpose: LoanPurpose;

  monthlyIncome: number;
  monthlyExpenses: number;
  existingLoanEmi: number;

  savings: number;

  creditScore: number;

  employmentType: EmploymentType;

  collateralValue: number;
}

export async function generateLoanAnalysis(input: LoanAnalysisInput) {
  const prompt = `
You are a senior commercial bank loan underwriter.

Your responsibility is to evaluate a loan application exactly like a real bank credit officer.

The applicant has ALREADY selected:

• Loan Amount
• Interest Rate

DO NOT change the interest rate.

Instead determine:

• Whether the loan should be approved
• Maximum safe loan amount
• Best repayment term
• Estimated monthly EMI
• Maximum affordable EMI
• Disposable income
• Overall recommendation

Evaluate ALL of these factors together.

1. Credit Score
2. Monthly Income
3. Monthly Expenses
4. Existing Loan Obligations
5. Debt-to-Income Ratio
6. Savings
7. Employment Type
8. Loan Purpose
9. Requested Loan Amount
10. Interest Rate
11. Collateral Value

Employment Guidelines

FULL_TIME
Very Stable

PART_TIME
Moderately Stable

BUSINESS
Moderately Stable

SELF_EMPLOYED
Moderate Risk

STUDENT
High Risk unless income exists

UNEMPLOYED
Very High Risk

RETIRED
Depends on savings and pension

Loan Purpose Guidelines

PERSONAL
Usually unsecured

HOME
Lower risk when collateral exists

AUTO
Vehicle can be collateral

BUSINESS
Evaluate repayment capacity carefully

SME
Business cash flow is important

EDUCATION
Student profile and future earning potential matter

AGRICULTURE
Consider seasonal income

SOD
Normally secured by deposits or collateral

Collateral Guidelines

Large collateral lowers lending risk.

Little or no collateral increases lending risk.

The recommended amount should never exceed the applicant's repayment capacity.

A student requesting a very large loan without income should normally be rejected.

Return ONLY valid JSON.

{
  "eligible": true,
  "riskScore": 22,
  "confidenceScore": 93,

  "recommendedAmount": 50000,

  "recommendedRepaymentTermMonths": 48,

  "estimatedMonthlyEMI": 1180,

  "maximumAffordableEMI": 1450,

  "disposableIncome": 2300,

  "overallRecommendation": "Approve",

  "reasoning": "Explain your reasoning in 4 to 8 professional sentences.",

  "creditAssessment": "Good",

  "affordability": "Good",

  "employmentRisk": "Low",

  "savingsStrength": "Strong",

  "debtRatio": "28%"
}

Applicant Information

Requested Loan Amount:
${input.loanAmount}

Interest Rate:
${input.interestRate} %

Loan Purpose:
${input.loanPurpose}

Employment Type:
${input.employmentType}

Monthly Income:
${input.monthlyIncome}

Monthly Expenses:
${input.monthlyExpenses}

Existing Loan EMI:
${input.existingLoanEmi}

Savings:
${input.savings}

Collateral Value:
${input.collateralValue}

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
        content:
          "You are an experienced commercial bank loan underwriter. Return ONLY valid JSON matching the requested schema.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.choices[0].message.content!;

  return aiPredictionSchema.parse(JSON.parse(content));
}
