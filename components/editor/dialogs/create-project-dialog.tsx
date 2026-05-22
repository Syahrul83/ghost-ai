"use client"

import { useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CreateProjectDialogProps {
  open: boolean
  projectName: string
  slugPreview: string
  isLoading: boolean
  onProjectNameChange: (name: string) => void
  onCreate: () => void
  onClose: () => void
}

export function CreateProjectDialog({
  open,
  projectName,
  slugPreview,
  isLoading,
  onProjectNameChange,
  onCreate,
  onClose,
}: CreateProjectDialogProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && projectName.trim()) {
        onCreate()
      }
    },
    [onCreate, projectName]
  )

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Give your project a name to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-text-muted">
              Project Name
            </label>
            <Input
              placeholder="e.g. Microservices Design"
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          {projectName.trim() && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-text-muted">Slug</p>
              <p className="text-sm text-text-muted font-mono">
                {slugPreview || "…"}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onCreate}
            disabled={!projectName.trim() || isLoading}
          >
            {isLoading ? "Creating…" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}