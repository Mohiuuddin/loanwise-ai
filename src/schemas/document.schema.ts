import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const fileSchema = z
  .instanceof(File, {
    message: "File is required",
  })
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    "File size must not exceed 5 MB",
  )
  .refine(
    (file) => ALLOWED_FILE_TYPES.includes(file.type),
    "Only PDF, JPG, JPEG and PNG files are allowed",
  );

export const documentSchema = z.object({
  nationalId: fileSchema,

  salarySlip: fileSchema,

  bankStatement: fileSchema,
});

export type DocumentValues = z.infer<typeof documentSchema>;
