import { getIssue } from "@/http/get-issue"
import { ArchiveIcon, MessageCirclePlusIcon, MoveLeftIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { IssueCommentsList } from "./issue-comments/issue-comments-list"
import { IssueCommentsSkeleton } from "./issue-comments/issue-comments-skeleton"
import { IssueLikeButton } from "./issue-like-button"

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
  const { id } = await params

  const issue = await getIssue({ id })

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

        <Suspense
          fallback={
            <div className="h-7 w-16 animate-pulse rounded bg-navy-600" />
          }
        >
          <IssueLikeButton issueId={issue.id} />
        </Suspense>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{issue.title}</h1>
        <p className="text-sm text-navy-100 leading-relaxed">
          {issue.description}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold">Comments</span>

        <form className="relative w-full">
          <input
            type="text"
            placeholder="Leave a comment.."
            className="bg-navy-900 h-11 pl-3 pr-24 w-full"
          />
          <button
            type="submit"
            className="flex items-center gap-2 text-indigo-400 absolute right-3 top-1/2 -translate-y-1/2 hover:text-indigo-300 cursor-pointer disabled:opacity-50"
          >
            Publish
            <MessageCirclePlusIcon className="size-3" />
          </button>
        </form>

        <div className="mt-3">
          <Suspense fallback={<IssueCommentsSkeleton />}>
            <IssueCommentsList issueId={id} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
