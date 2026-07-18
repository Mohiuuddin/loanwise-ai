import prisma from "@/lib/prisma";

export async function getRiskDistribution(userId: string) {
  const predictions = await prisma.aIPrediction.findMany({
    where: {
      application: {
        userId,
      },
    },

    select: {
      riskScore: true,
    },
  });

  let low = 0;
  let medium = 0;
  let high = 0;

  predictions.forEach((prediction) => {
    if (prediction.riskScore <= 30) {
      low++;
    } else if (prediction.riskScore <= 60) {
      medium++;
    } else {
      high++;
    }
  });

  return [
    { name: "Low", value: low },
    { name: "Medium", value: medium },
    { name: "High", value: high },
  ];
}
