import { createComment } from "@/http/create-comment"
import { getIssue } from "@/http/get-issue"
import { authClient } from "@/lib/auth-client"
import { ArchiveIcon, MoveLeftIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { IssueCommentForm } from "./issue-comment-form"
import { IssueCommentsList } from "./issue-comments/issue-comments-list"
import { IssueCommentsSkeleton } from "./issue-comments/issue-comments-skeleton"
import { IssueLikeButton } from "./issue-like-button"
import { headers } from "next/headers"

interface IssuePageProps {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params,
}: IssuePageProps): Promise<Metadata> => {
  const { id } = await params

  const issue = await getIssue({ id })
  return {
    title: `Issue ${issue.title}`,
  }
}

const statusLabels = {
  backlog: "Backlog",
  in_progress: "In Progress",
  done: "Done",
  todo: "To Do",
} as const

export default async function IssuePage({ params }: IssuePageProps) {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })

  const { id } = await params

  const issue = await getIssue({ id })

  async function handleCreateComment(text: string) {
    "use server"

    await createComment({ issueId: id, text })
  }

  const isAuthenticated = !!session?.user

  return (
    <main className="max-w-225 mx-auto w-full flex flex-col gap-4 p-6 bg-navy-800 border-[8.5px] border-navy-500 rounded-xl">
      <Link
        href="/"
        className="flex items-center gap-2 text-navy-200 hover:text-navy-100"
      >
        <MoveLeftIcon className="size-4" />
        <span className="text-xs">Back to board</span>
      </Link>

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
            <IssueCommentsList issueId={id} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
