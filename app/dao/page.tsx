"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TreasuryCard } from "@/components/dao/treasury-card"
import { ProposalsList } from "@/components/dao/proposal-card"
import { CreateProposalForm } from "@/components/dao/create-proposal-form"
import { FundedProjects } from "@/components/dao/funded-projects"

export default function DAOPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-2">Home / DAO Governance</p>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">DAO Governance</h1>
          <p className="text-muted-foreground">
            Participate in BUDAYA CHAIN community decisions and shape the future of cultural heritage preservation
          </p>
        </div>

        {/* Treasury Overview */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Treasury Overview</h2>
          <TreasuryCard />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="bg-card border border-border w-full justify-start">
            <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-background">
              Active Proposals
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-primary data-[state=active]:text-background"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-primary data-[state=active]:text-background">
              Create Proposal
            </TabsTrigger>
            <TabsTrigger value="funded" className="data-[state=active]:bg-primary data-[state=active]:text-background">
              Funded Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6 mt-8">
            <ProposalsList />
          </TabsContent>

          <TabsContent value="completed" className="mt-8">
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <p className="text-muted-foreground mb-4">No completed proposals yet</p>
              <button className="px-6 py-2 rounded-lg bg-primary text-background font-semibold hover:bg-primary-dark transition-colors">
                Create First Proposal
              </button>
            </div>
          </TabsContent>

          <TabsContent value="create" className="mt-8">
            <CreateProposalForm />
          </TabsContent>

          <TabsContent value="funded" className="mt-8">
            <FundedProjects />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
