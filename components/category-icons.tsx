export function CategoryIcon({ id, className }: { id: string; className?: string }) {
  switch (id) {
    case "mojito":
      return <MojitoIcon className={className} />;
    case "blends":
      return <BlenderIcon className={className} />;
    case "cocktail":
      return <MartiniIcon className={className} />;
    case "milkshake":
      return <MilkshakeIcon className={className} />;
    case "juices":
      return <CitrusIcon className={className} />;
    case "sweets":
      return <CakeIcon className={className} />;
    case "qashtouta":
      return <DessertIcon className={className} />;
    default:
      return <MilkshakeIcon className={className} />;
  }
}

function MojitoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 3c1.2 1.4 1.4 3.2.6 4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 9h10l-1.2 11H8.2L7 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.5 13h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BlenderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 4h8l1 7H7L8 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7 11h10v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-7Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MartiniIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 5h14L12 13 5 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 13v7M9 20h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="15.5" cy="7.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function MilkshakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 9h8l-1 10H9L8 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 9c0-2 1.2-4 3-4s3 2 3 4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 5c.8-1.2 2.2-1.6 3.2-.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CitrusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 4.5v15M4.5 12h15M7 7l10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 11c2.2-1.6 4.4-1.6 7 0s4.8 1.6 7 0v8H5v-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M5 15h14" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function DessertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 14c0-3.3 2.7-6 6-6s6 2.7 6 6v1H6v-1Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 15h14v2a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-2Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
