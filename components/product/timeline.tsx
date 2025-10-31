export function TimelineItem({ title, description, date, isFirst, isLast }: any) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-success">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        {!isLast && <div className="w-1 h-16 bg-border mt-2" />}
      </div>
      <div className="pb-8">
        <h4 className="font-bold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <p className="text-xs text-muted-foreground mt-2">{date}</p>
      </div>
    </div>
  )
}
