"use client"

import { Pencil, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Project } from "@/hooks/use-project-dialogs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
  onOpenCreate: () => void
  onOpenRename: (project: Project) => void
  onOpenDelete: (project: Project) => void
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onOpenCreate,
  onOpenRename,
  onOpenDelete,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((p) => p.isOwner)
  const sharedProjects = projects.filter((p) => !p.isOwner)

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

          <TabsContent value="my-projects" className="flex flex-1 flex-col px-3 py-4">
            {ownedProjects.length === 0 ? (
              <EmptyState message="No projects yet" />
            ) : (
              <ul className="space-y-1">
                {ownedProjects.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    onRename={onOpenRename}
                    onDelete={onOpenDelete}
                  />
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="shared" className="flex flex-1 flex-col px-3 py-4">
            {sharedProjects.length === 0 ? (
              <EmptyState message="No shared projects" />
            ) : (
              <ul className="space-y-1">
                {sharedProjects.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    onRename={onOpenRename}
                    onDelete={onOpenDelete}
                  />
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>

        {/* New Project button */}
        <div className="border-t border-border-default p-4">
          <Button className="w-full gap-2" onClick={onOpenCreate}>
            <Plus className="size-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}

interface ProjectItemProps {
  project: Project
  onRename: (project: Project) => void
  onDelete: (project: Project) => void
}

function ProjectItem({ project, onRename, onDelete }: ProjectItemProps) {
  return (
    <li className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-subtle hover:text-text-secondary transition-colors">
      <span className="truncate">{project.name}</span>
      {project.isOwner && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onRename(project)}
            aria-label={`Rename ${project.name}`}
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onDelete(project)}
            aria-label={`Delete ${project.name}`}
          >
            <Trash2 className="size-3.5 text-state-error" />
          </Button>
        </div>
      )}
    </li>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  )
}