"use client"

export function ArtisanHeader({ artisan }: { artisan: any }) {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-3xl font-bold text-background">{artisan.name[0]}</span>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-serif font-bold text-foreground">{artisan.name}</h1>
            <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.006a3.066 3.066 0 01-3.062 3.062H5.5a3.066 3.066 0 01-3.062-3.062V6.517a3.066 3.066 0 012.812-3.062zm9.01 7.46H9.604a1 1 0 100 2h5.673a1 1 0 100-2H15.277z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-muted-foreground mb-3">{artisan.specialty}</p>
          <div className="flex items-center gap-1 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-foreground ml-1">4.9 ({artisan.reviews} reviews)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-accent text-foreground font-medium rounded-lg hover:bg-accent-dark transition-colors text-sm">
              Follow
            </button>
            <button className="px-4 py-2 bg-muted text-foreground font-medium rounded-lg hover:bg-muted transition-colors text-sm border border-border">
              Message
            </button>
            <button className="px-4 py-2 bg-muted text-foreground font-medium rounded-lg hover:bg-muted transition-colors text-sm border border-border">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
