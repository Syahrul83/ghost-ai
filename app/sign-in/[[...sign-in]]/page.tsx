import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding side (hidden on small screens) */}
      <div className="hidden flex-1 flex-col justify-center gap-6 bg-surface px-16 lg:flex">
        <div>
          <h1 className="text-2xl font-bold text-text-secondary">ghost AI</h1>
          <p className="mt-2 text-sm text-text-muted">
            Design systems, reimagined.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-text-muted">
          <li>AI-powered design generation</li>
          <li>Real-time collaborative canvas</li>
          <li>Export-ready design specs</li>
        </ul>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center bg-base px-6">
        <SignIn
          appearance={{
            theme: [dark],
            variables: {
              colorBackground: "var(--bg-surface)",
              colorNeutral: "var(--text-secondary)",
              colorPrimary: "var(--accent-primary)",
              colorPrimaryForeground: "#080809",
              colorForeground: "var(--text-secondary)",
              colorInputForeground: "var(--text-secondary)",
              colorInput: "var(--bg-subtle)",
            },
            elements: {
              card: "shadow-none w-full",
              headerTitle: "text-text-secondary",
              headerSubtitle: "text-text-muted",
              socialButtonsBlockButton:
                "border-border-default bg-surface hover:bg-elevated text-text-secondary",
              dividerLine: "bg-border-default",
              dividerText: "text-text-faint",
              formFieldLabel: "text-text-muted",
              formFieldInput:
                "bg-subtle border-border-default text-text-secondary",
              footerActionText: "text-text-muted",
              footerActionLink: "text-accent-primary hover:text-brand",
              formButtonPrimary:
                "bg-brand text-[#080809] hover:opacity-90",
            },
          }}
        />
      </div>
    </div>
  );
}