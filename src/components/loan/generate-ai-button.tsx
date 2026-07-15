"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { generateAIPrediction } from "@/actions/ai/generate-ai-prediction";

import { Button } from "@/components/ui/button";

interface GenerateAIButtonProps {
  applicationId: string;
}

export default function GenerateAIButton({
  applicationId,
}: GenerateAIButtonProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    startTransition(async () => {
      console.log("Calling server action");
      await generateAIPrediction(applicationId);

      console.log("Refreshing page");

      router.refresh();
    });
  };

  return (
    <Button onClick={handleGenerate} disabled={isPending}>
      {isPending ? "Generating..." : "Generate AI Prediction"}
    </Button>
  );
}
