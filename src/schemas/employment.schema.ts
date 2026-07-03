import { z } from "zod";

export const employmentSchema = z.object({
  employmentStatus: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "SELF_EMPLOYED",
    "UNEMPLOYED",
    "STUDENT",
    "RETIRED",
  ]),

  employerName: z.string().min(2, "Employer name is required"),

  monthlyIncome: z.number().min(0, "Monthly income must be at least 0"),

  yearsEmployed: z.number().min(0).max(50),
});

export type EmploymentValues = z.infer<typeof employmentSchema>;
