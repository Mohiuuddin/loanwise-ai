import { getLoanById } from "@/data/loan/get-loan-by-id";

import { formatDate, formatEnum, formatFileSize } from "@/utils/format";

interface DocumentsCardProps {
  documents: NonNullable<Awaited<ReturnType<typeof getLoanById>>>["documents"];
}

export default function DocumentsCard({ documents }: DocumentsCardProps) {
  if (documents.length === 0) {
    return (
      <section className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Uploaded Documents</h2>

        <p>No uploaded documents.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Uploaded Documents</h2>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="rounded-md border p-4">
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Document Type:</strong> {formatEnum(doc.type)}
              </p>

              <p>
                <strong>File Name:</strong> {doc.fileName}
              </p>

              <p>
                <strong>File Size:</strong> {formatFileSize(doc.fileSize)}
              </p>

              <p>
                <strong>Uploaded:</strong> {formatDate(doc.createdAt)}
              </p>
            </div>

            <div className="mt-4">
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                View Document
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
