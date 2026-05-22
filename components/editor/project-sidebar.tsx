"use client"

import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <>
      {/* Backdrop when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        data-open={isOpen}
        className="fixed top-0 left-0 z-50 flex h-full w-80 flex-col border-r border-border-default bg-surface transition-transform duration-200 data-open:translate-x-0 -translate-x-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-default px-4 py-3">
          <h2 className="text-sm font-medium text-text-secondary">Projects</h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="my-projects" className="flex flex-1 flex-col">
          <TabsList className="mx-3 mt-3">
            <TabsTrigger value="my-projects" className="flex-1">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">
              Shared
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-projects" className="flex flex-1 flex-col px-4 py-6">
            <EmptyState message="No projects yet" />
          </TabsContent>

          <TabsContent value="shared" className="flex flex-1 flex-col px-4 py-6">
            <EmptyState message="No shared projects" />
          </TabsContent>
        </Tabs>

        {/* New Project button */}
        <div className="border-t border-border-default p-4">
          <Button className="w-full gap-2">
            <Plus className="size-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  )
}