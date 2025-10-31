import { Button } from "@/components/ui/button"

export function CreatorCard() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h4 className="font-bold text-foreground mb-4">Creator</h4>
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-foreground">Siti Nurhaliza</p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-success">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">Master Batik Artisan</p>
          <p className="text-xs text-muted-foreground mt-1">Yogyakarta, Java</p>
        </div>
      </div>
      <Button className="w-full mt-4 bg-accent text-foreground hover:bg-accent-dark">View Profile</Button>
    </div>
  )
}
