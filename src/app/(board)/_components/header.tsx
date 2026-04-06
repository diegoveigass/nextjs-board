import { Input } from "@/components/input"
import { LogInIcon, SearchIcon } from "lucide-react"

export function Header() {
  return (
    <div className="max-w-225 mx-auto w-full flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="font-semibold text-xl">Product Roadmap</h1>
        <p className="text-sm text-navy-100">
          Follow the progress of our product development and stay updated with
          the latest features and improvements. Our roadmap outlines the
          upcoming milestones and releases, giving you a clear view of what's in
          store for our product. Stay tuned for exciting updates and
          enhancements!
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <SearchIcon className="size-4 text-navy-200 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search for features..."
            className="w-67.5 pl-8"
          />
        </div>

        <button
          type="button"
          className="bg-navy-700 size-8 rounded-full border border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150"
        >
          <LogInIcon className="size-3.5 text-navy-200" />
        </button>
      </div>
    </div>
  )
}
