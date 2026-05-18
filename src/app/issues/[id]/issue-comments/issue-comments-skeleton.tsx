export function IssueCommentsSkeleton() {
  return (
    <div className="mt-3 space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <its fine because its a static list of skeletons>
          key={index}
          className="flex gap-3 rounded-xl bg-navy-700/50 p-4"
        >
          <div className="size-10 rounded-full bg-navy-600 shrink-0" />

          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 rounded bg-navy-600" />

            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-navy-600" />
              <div className="h-3 w-[92%] rounded bg-navy-600" />
              <div className="h-3 w-[70%] rounded bg-navy-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
