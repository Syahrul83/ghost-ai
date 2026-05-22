"use client"

import { useCallback, useEffect, useRef } from "react"
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

interface RenameProjectDialogProps {
  open: boolean
  projectName: string
  currentProjectName: string
  isLoading: boolean
  onProjectNameChange: (name: string) => void
  onRename: () => void
  onClose: () => void
}

export function RenameProjectDialog({
  open,
  projectName,
  currentProjectName,
  isLoading,
  onProjectNameChange,
  onRename,
  onClose,
}: RenameProjectDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      // Small delay to ensure dialog is mounted
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && projectName.trim()) {
        onRename()
      }
    },
    [onRename, projectName]
  )

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Renaming <span className="text-text-secondary font-medium">{currentProjectName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-text-muted">
            Project Name
          </label>
          <Input
            ref={inputRef}
            placeholder="Project name"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onRename}
            disabled={!projectName.trim() || isLoading}
          >
            {isLoading ? "Renaming…" : "Rename"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}