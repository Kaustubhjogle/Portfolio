interface EntryMetadataProps {
  fields: { label: string; value?: string | null }[];
}

export default function EntryMetadata({ fields }: EntryMetadataProps) {
  const populatedFields = fields.filter(({ value }) => value?.trim());

  if (populatedFields.length === 0) return null;

  return (
    <span className="portfolio-entry-meta">
      {populatedFields.map(({ label, value }) => (
        <span key={label}><span className="sr-only">{label}: </span>{value?.trim()}</span>
      ))}
    </span>
  );
}
