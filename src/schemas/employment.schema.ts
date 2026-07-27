import { z } from "zod";

export const employmentSchema = z.object({
  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "SELF_EMPLOYED",
    "BUSINESS",
    "UNEMPLOYED",
    "STUDENT",
    "RETIRED",
  ]),

  companyName: z.string(),

  jobTitle: z.string(),

  monthlySalary: z.number(),

  employmentYears: z.number(),
});

export type EmploymentValues = z.infer<typeof employmentSchema>;
