import { getLoanById } from "@/data/loan/get-loan-by-id";

import { formatCurrency, formatEnum } from "@/utils/format";

interface CollateralCardProps {
  collateral: NonNullable<
    Awaited<ReturnType<typeof getLoanById>>
  >["collateral"];
}

export default function CollateralCard({ collateral }: CollateralCardProps) {
  if (!collateral.length) {
    return (
      <section className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Collateral</h2>

        <p>No collateral information.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Collateral</h2>

      <div className="space-y-4">
        {collateral.map((item) => (
          <div key={item.id} className="rounded-md border p-4">
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Type:</strong>{" "}
                {item.type === "OTHER"
                  ? item.customType
                  : formatEnum(item.type)}
              </p>

              <p>
                <strong>Estimated Value:</strong>{" "}
                {formatCurrency(item.estimatedValue)}
              </p>

              <p className="col-span-2">
                <strong>Description:</strong> {item.description || "-"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
