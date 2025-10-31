"use client"

import { useState } from "react"

interface Verification {
  id: number
  name: string
  craft: string
  region: string
  submittedDate: string
  status: "pending" | "approved" | "rejected"
}

const mockVerifications: Verification[] = [
  {
    id: 1,
    name: "Siti Aminah",
    craft: "Batik",
    region: "Yogyakarta",
    submittedDate: "Oct 25, 2025",
    status: "pending",
  },
  {
    id: 2,
    name: "Budi Santoso",
    craft: "Songket",
    region: "Palembang",
    submittedDate: "Oct 24, 2025",
    status: "pending",
  },
  {
    id: 3,
    name: "Dewi Lestari",
    craft: "Ulos",
    region: "North Sumatra",
    submittedDate: "Oct 23, 2025",
    status: "pending",
  },
  {
    id: 4,
    name: "Ahmad Wijaya",
    craft: "Woodcarving",
    region: "Bali",
    submittedDate: "Oct 22, 2025",
    status: "pending",
  },
  {
    id: 5,
    name: "Eka Putri",
    craft: "Wayang Kulit",
    region: "Central Java",
    submittedDate: "Oct 21, 2025",
    status: "pending",
  },
]

export function VerificationQueue() {
  const [verifications, setVerifications] = useState<Verification[]>(mockVerifications)

  const handleApprove = (id: number) => {
    setVerifications(verifications.map((v) => (v.id === id ? { ...v, status: "approved" as const } : v)))
  }

  const handleReject = (id: number) => {
    setVerifications(verifications.map((v) => (v.id === id ? { ...v, status: "rejected" as const } : v)))
  }

  const pendingCount = verifications.filter((v) => v.status === "pending").length

  return (
    <div className="space-y-4">
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
        <p className="text-sm text-foreground">
          <span className="font-semibold">{pendingCount} pending verifications</span> awaiting review
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Artisan Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Craft Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Region</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Submitted</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {verifications.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-foreground">{item.name}</td>
                  <td className="px-6 py-4 text-foreground">{item.craft}</td>
                  <td className="px-6 py-4 text-foreground">{item.region}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{item.submittedDate}</td>
                  <td className="px-6 py-4">
                    {item.status === "pending" && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-primary">
                        Pending
                      </span>
                    )}
                    {item.status === "approved" && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success">
                        Approved
                      </span>
                    )}
                    {item.status === "rejected" && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-destructive/10 text-destructive">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {item.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="px-3 py-1 rounded-lg bg-success text-white text-xs font-semibold hover:bg-success/80 transition-colors flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="px-3 py-1 rounded-lg bg-destructive text-white text-xs font-semibold hover:bg-destructive/80 transition-colors flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
