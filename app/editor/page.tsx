"use client"

import { useState } from "react";
import { Plus } from "lucide-react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { CreateProjectDialog } from "@/components/editor/dialogs/create-project-dialog";
import { RenameProjectDialog } from "@/components/editor/dialogs/rename-project-dialog";
import { DeleteProjectDialog } from "@/components/editor/dialogs/delete-project-dialog";
import { Button } from "@/components/ui/button";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

export default function EditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dialogs = useProjectDialogs();

  return (
    <div className="flex h-screen flex-col bg-base">
      <EditorNavbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        projects={dialogs.projects}
        onOpenCreate={dialogs.openCreateDialog}
        onOpenRename={dialogs.openRenameDialog}
        onOpenDelete={dialogs.openDeleteDialog}
      />
      <main className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-lg font-medium text-text-secondary">
            Create a project or open an existing one
          </h1>
          <p className="max-w-sm text-sm text-text-muted">
            Start a new architecture workspace, or choose a project from the sidebar.
          </p>
          <Button className="gap-2 mt-2" onClick={dialogs.openCreateDialog}>
            <Plus className="size-4" />
            New Project
          </Button>
        </div>
      </main>

      {/* Dialogs */}
      <CreateProjectDialog
        open={dialogs.activeDialog === "create"}
        projectName={dialogs.projectName}
        slugPreview={dialogs.slugPreview}
        isLoading={dialogs.isLoading}
        onProjectNameChange={dialogs.setProjectName}
        onCreate={dialogs.handleCreate}
        onClose={dialogs.closeDialog}
      />

      <RenameProjectDialog
        open={dialogs.activeDialog === "rename"}
        projectName={dialogs.projectName}
        currentProjectName={dialogs.selectedProject?.name ?? ""}
        isLoading={dialogs.isLoading}
        onProjectNameChange={dialogs.setProjectName}
        onRename={dialogs.handleRename}
        onClose={dialogs.closeDialog}
      />

      <DeleteProjectDialog
        open={dialogs.activeDialog === "delete"}
        projectName={dialogs.selectedProject?.name ?? ""}
        isLoading={dialogs.isLoading}
        onDelete={dialogs.handleDelete}
        onClose={dialogs.closeDialog}
      />
    </div>
  );
}