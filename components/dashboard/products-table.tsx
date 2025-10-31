import { Button } from "@/components/ui/button"

export function ProductsTable() {
  const products = [
    { id: 1, name: "Batik Sarong", status: "Listed", price: "45 SOL", sales: 23 },
    { id: 2, name: "Wayang Puppet", status: "Listed", price: "120 SOL", sales: 8 },
    { id: 3, name: "Songket Cloth", status: "Pending Review", price: "180 SOL", sales: 0 },
  ]

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Product</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Sales</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-foreground">{product.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === "Listed" ? "bg-success/10 text-success" : "bg-accent/10 text-primary"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-foreground">{product.price}</td>
                <td className="px-6 py-4 text-foreground">{product.sales}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </Button>
                    <Button size="sm" variant="ghost">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </Button>
                    <Button size="sm" variant="ghost">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 4 21 4" />
                        <path d="M19 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4M10 9v6M14 9v6" />
                      </svg>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
