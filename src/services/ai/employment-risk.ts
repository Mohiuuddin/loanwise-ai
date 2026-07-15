import { EmploymentType } from "@/generated/prisma/enums";

export function calculateEmploymentRisk(employmentType: EmploymentType) {
  const rules: Record<EmploymentType, { score: number; reason: string }> = {
    FULL_TIME: {
      score: 0,
      reason: "Stable full-time employment.",
    },
    BUSINESS: {
      score: 5,
      reason: "Business owner.",
    },
    SELF_EMPLOYED: {
      score: 10,
      reason: "Self-employed applicant.",
    },
    RETIRED: {
      score: 15,
      reason: "Retired applicant.",
    },
    PART_TIME: {
      score: 20,
      reason: "Part-time employment.",
    },
    STUDENT: {
      score: 30,
      reason: "Student applicant.",
    },
    UNEMPLOYED: {
      score: 50,
      reason: "Applicant is unemployed.",
    },
  };

  return rules[employmentType];
}
