"use client"

import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditorNavbarProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function EditorNavbar({ sidebarOpen, onToggleSidebar }: EditorNavbarProps) {
  return (
    <header className="flex h-12 shrink-0 items-center border-b border-border-default bg-base px-4">
      {/* Left section */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="size-4" />
          ) : (
            <PanelLeftOpen className="size-4" />
          )}
        </Button>
      </div>

      {/* Center section — empty for now */}
      <div className="flex flex-1 items-center justify-center" />

      {/* Right section — empty for now */}
      <div className="flex items-center gap-2" />
    </header>
  )
}