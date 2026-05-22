"use client"

import { useState, useMemo, useCallback } from "react"

export interface Project {
  id: string
  name: string
  slug: string
  isOwner: boolean
}

export type DialogType = "create" | "rename" | "delete" | null

const MOCK_PROJECTS: Project[] = [
  { id: "1", name: "My Architecture", slug: "my-architecture", isOwner: true },
  { id: "2", name: "E-commerce Design", slug: "e-commerce-design", isOwner: true },
  { id: "3", name: "Shared Project", slug: "shared-project", isOwner: false },
]

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function useProjectDialogs() {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [isLoading, setIsLoading] = useState(false)
  const [projectName, setProjectName] = useState("")

  const slugPreview = useMemo(() => slugify(projectName), [projectName])

  const openCreateDialog = useCallback(() => {
    setProjectName("")
    setSelectedProject(null)
    setActiveDialog("create")
  }, [])

  const openRenameDialog = useCallback((project: Project) => {
    setSelectedProject(project)
    setProjectName(project.name)
    setActiveDialog("rename")
  }, [])

  const openDeleteDialog = useCallback((project: Project) => {
    setSelectedProject(project)
    setActiveDialog("delete")
  }, [])

  const closeDialog = useCallback(() => {
    setActiveDialog(null)
    setSelectedProject(null)
    setProjectName("")
  }, [])

  const handleCreate = useCallback(() => {
    const trimmed = projectName.trim()
    if (!trimmed) return

    setIsLoading(true)
    const newProject: Project = {
      id: String(Date.now()),
      name: trimmed,
      slug: slugPreview,
      isOwner: true,
    }
    // Simulate async
    setTimeout(() => {
      setProjects((prev) => [...prev, newProject])
      setIsLoading(false)
      closeDialog()
    }, 300)
  }, [projectName, slugPreview, closeDialog])

  const handleRename = useCallback(() => {
    if (!selectedProject || !projectName.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id
            ? { ...p, name: projectName.trim(), slug: slugify(projectName.trim()) }
            : p
        )
      )
      setIsLoading(false)
      closeDialog()
    }, 300)
  }, [selectedProject, projectName, closeDialog])

  const handleDelete = useCallback(() => {
    if (!selectedProject) return

    setIsLoading(true)
    setTimeout(() => {
      setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id))
      setIsLoading(false)
      closeDialog()
    }, 300)
  }, [selectedProject, closeDialog])

  return {
    // State
    activeDialog,
    selectedProject,
    projects,
    isLoading,
    projectName,
    slugPreview,

    // Actions
    setProjectName,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete,
  }
}