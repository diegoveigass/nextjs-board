import { ArchiveIcon } from "lucide-react"
import { headers } from "next/headers"
import { Suspense } from "react"
import { createComment } from "@/http/create-comment"
import { getIssue } from "@/http/get-issue"
import { authClient } from "@/lib/auth-client"
import { IssueCommentForm } from "./issue-comment-form"
import { IssueCommentsList } from "./issue-comments/issue-comments-list"
import { IssueCommentsSkeleton } from "./issue-comments/issue-comments-skeleton"
import { IssueLikeButton } from "./issue-like-button"

interface IssueDetailsProps {
  issueId: string
}

const statusLabels = {
  backlog: "Backlog",
  in_progress: "In Progress",
  done: "Done",
  todo: "To Do",
} as const

export async function IssueDetails({ issueId }: IssueDetailsProps) {
  const issue = await getIssue({ id: issueId })

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })

  async function handleCreateComment(text: string) {
    "use server"

    await createComment({ issueId, text })
  }

  const isAuthenticated = !!session?.user

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="bg-navy-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs">
          <ArchiveIcon className="size-3" />
          {statusLabels[issue.status]}
        </span>

        <IssueLikeButton issueId={issue.id} />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{issue.title}</h1>
        <p className="text-sm text-navy-100 leading-relaxed">
          {issue.description}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold">Comments</span>

        <IssueCommentForm
          onCreateComment={handleCreateComment}
          isAuthenticated={isAuthenticated}
        />

        <div className="mt-3">
          <Suspense fallback={<IssueCommentsSkeleton />}>
            <IssueCommentsList issueId={issueId} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
