export default function IssueLoading() {
  return (
    <main className="max-w-225 mx-auto w-full flex flex-col gap-4 p-6 bg-navy-800 border-[8.5px] border-navy-500 rounded-xl animate-pulse">
      {/* Back button */}
      <div className="flex items-center gap-2">
        <div className="size-4 rounded bg-navy-600" />
        <div className="h-3 w-24 rounded bg-navy-600" />
      </div>

      {/* Status + votes */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-28 rounded-lg bg-navy-700" />
        <div className="h-8 w-16 rounded-lg bg-navy-700" />
      </div>

      {/* Title + description */}
      <div className="space-y-3">
        <div className="h-8 w-3/4 rounded bg-navy-600" />

        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-navy-700" />
          <div className="h-4 w-[95%] rounded bg-navy-700" />
          <div className="h-4 w-[85%] rounded bg-navy-700" />
          <div className="h-4 w-[70%] rounded bg-navy-700" />
        </div>
      </div>

      {/* Comments */}
      <div className="flex flex-col gap-3">
        <div className="h-5 w-24 rounded bg-navy-600" />

        {/* Comments list */}
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
      </div>
    </main>
  )
}
