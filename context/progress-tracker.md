# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state
changes.

## Current Phase

- Active: Feature implementation

## Current Goal

- Implement project dialogs and editor home screen (04-project-dialogs.md)

## Completed

- Design system scaffolding: shadcn/ui init, lucide-react install, `lib/utils.ts` with `cn()` helper, and 7 base components (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea).
- `globals.css` updated with project dark theme tokens from the UI context.
- Build verified: all components import without errors, `cn()` works properly, no default light styling appears.
- Editor Navbar (`components/editor/editor-navbar.tsx`) — fixed-height top navbar with left (sidebar toggle using `PanelLeftOpen`/`PanelLeftClose`), center, and right sections.
- Project Sidebar (`components/editor/project-sidebar.tsx`) — floating sidebar that slides in from left without pushing content, accepts `isOpen` prop, header with "Projects" title + close button, shadcn Tabs (My Projects / Shared) both with empty placeholder state, and a full-width "New Project" button with `Plus` icon at the bottom.
- Dialog pattern (`components/ui/dialog.tsx`) ready for future use with title, description, and footer action slots.
- TypeScript build passes cleanly — no new errors.
- Auth feature (`03-auth.md`) implemented:
  - Installed `@clerk/ui` for bundled Clerk UI components and `@clerk/ui/themes` dark theme.
  - `proxy.ts` at project root — protected-first middleware: blocks all routes except `/`, `/sign-in`, `/sign-up`.
  - `ClerkProvider` wraps root layout with `ui={ui}` and dark theme using CSS variable overrides.
  - Sign-in page (`app/sign-in/[[...sign-in]]/page.tsx`) — two-panel layout: left branding panel (hidden on small screens), right Clerk form.
  - Sign-up page (`app/sign-up/[[...sign-up]]/page.tsx`) — same layout pattern.
  - Home page (`app/page.tsx`) — redirects authenticated users to `/editor`, unauthenticated to `/sign-in`.
  - Editor navbar — `UserButton` added to right section with dark-themed popover styling.
  - `next build` passes with zero errors.
- Project dialogs and editor home screen (04-project-dialogs.md):
  - `useProjectDialogs` hook — manages dialog state, form state, loading state, and mock project data.
  - Create Project dialog — project name input with live slug preview.
  - Rename Project dialog — prefilled name, auto-focus, Enter-to-submit.
  - Delete Project dialog — destructive confirmation, no input.
  - Editor home screen — centered heading, description, and "New Project" button wired to Create dialog.
  - Sidebar — project list with My Projects / Shared tabs, rename (Pencil icon) and delete (Trash2 icon) actions on hover for owned projects only.
  - Mobile — backdrop scrim clicking closes sidebar.
  - Build verified: `next build` passes with zero TypeScript or lint errors.

## In Progress

- Project dialogs and editor home screen (04-project-dialogs.md) — completed, build verified zero errors.
