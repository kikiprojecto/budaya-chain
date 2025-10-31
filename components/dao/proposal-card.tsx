"use client"

import { useState } from "react"

interface ProposalCardProps {
  id: number
  title: string
  proposedBy: string
  description: string
  forVotes: number
  againstVotes: number
  endsIn: string
}

const mockProposals: ProposalCardProps[] = [
  {
    id: 1,
    title: "Fund Batik Workshop in Yogyakarta",
    proposedBy: "7xK9mPqR3vL8nQ2kJ9dF3H2",
    description:
      "Support traditional batik training program for 50 young artisans in Yogyakarta, including materials and mentorship.",
    forVotes: 1234,
    againstVotes: 345,
    endsIn: "3 days 12 hours",
  },
  {
    id: 2,
    title: "Partnership with Museum Nasional",
    proposedBy: "9mL3aBc8kD5eF1nG7jH9sK2",
    description:
      "Collaborate with Museum Nasional to create digital exhibition of Indonesian cultural heritage on BUDAYA CHAIN.",
    forVotes: 892,
    againstVotes: 478,
    endsIn: "5 days 2 hours",
  },
  {
    id: 3,
    title: "Grant Program for Young Artisans",
    proposedBy: "2nO7pR4sT6uV8wX9yZ1aB3",
    description:
      "Establish micro-grant program (100-500 SOL) for artisans under 30 years old to support their business growth.",
    forVotes: 2145,
    againstVotes: 258,
    endsIn: "1 day 8 hours",
  },
  {
    id: 4,
    title: "Marketing Campaign for Wayang Kulit",
    proposedBy: "5cD9eF2gH4iJ6kL8mN0oP1",
    description:
      "Global marketing campaign promoting Wayang Kulit shadow puppet theater through social media and partnerships.",
    forVotes: 756,
    againstVotes: 916,
    endsIn: "7 days 5 hours",
  },
  {
    id: 5,
    title: "Platform Fee Reduction Proposal",
    proposedBy: "3qR5sT7uV9wX1yZ2aB4cD6",
    description: "Reduce platform commission from 5% to 3% for artisans with over 100 verified products.",
    forVotes: 3421,
    againstVotes: 289,
    endsIn: "2 days 10 hours",
  },
]

export function ProposalCard({ proposal = mockProposals[0] }: { proposal?: ProposalCardProps }) {
  const [votedFor, setVotedFor] = useState(false)
  const [votedAgainst, setVotedAgainst] = useState(false)

  const totalVotes = proposal.forVotes + proposal.againstVotes
  const forPercentage = Math.round((proposal.forVotes / totalVotes) * 100)
  const againstPercentage = 100 - forPercentage

  const handleVoteFor = () => {
    setVotedFor(!votedFor)
    setVotedAgainst(false)
  }

  const handleVoteAgainst = () => {
    setVotedAgainst(!votedAgainst)
    setVotedFor(false)
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-foreground">{proposal.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">Proposed by: {proposal.proposedBy.slice(0, 10)}...</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-primary">Active</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">{proposal.description}</p>
      </div>

      {/* Voting Progress */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">Voting Progress</span>
            <span className="text-xs text-muted-foreground">Ends in {proposal.endsIn}</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success" style={{ width: `${forPercentage}%` }} />
            </div>
            <span className="text-xs font-semibold text-success">{forPercentage}%</span>
          </div>
        </div>

        {/* Vote Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">For</p>
            <p className="text-2xl font-bold text-success">{proposal.forVotes.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Against</p>
            <p className="text-2xl font-bold text-destructive">{proposal.againstVotes.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Vote Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleVoteFor}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
            votedFor ? "bg-success text-white" : "bg-success/10 text-success hover:bg-success hover:text-white"
          }`}
        >
          Vote For
        </button>
        <button
          onClick={handleVoteAgainst}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
            votedAgainst
              ? "bg-destructive text-white"
              : "bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"
          }`}
        >
          Vote Against
        </button>
      </div>
    </div>
  )
}

export function ProposalsList() {
  return (
    <div className="space-y-6">
      {mockProposals.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
  )
}
