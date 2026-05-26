function LightningMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8 text-amber-300/80"
      fill="currentColor"
      aria-hidden
    >
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

export function TeamAvatarPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-xl border border-cyan-400/30 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#1a1030] shadow-inner"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(251,191,36,0.12),transparent_45%)]" />
      <div className="absolute inset-[1px] rounded-[0.65rem] border border-blue-400/10" />
      <div className="relative flex h-full flex-col items-center justify-center gap-3 p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/25 bg-blue-500/10 glow-gold">
          <LightningMark />
        </div>
        <p className="text-center text-[11px] font-medium uppercase tracking-wider text-blue-200/50">
          {label}
        </p>
      </div>
    </div>
  );
}
