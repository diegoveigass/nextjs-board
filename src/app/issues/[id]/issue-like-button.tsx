"use client"

import { useQuery } from "@tanstack/react-query"
import { LikeButton } from "@/components/like-button"
import { getIssueInteractions } from "@/http/get-issue-interactions"

interface IssueLikeButtonProps {
  issueId: string
}

export function IssueLikeButton({ issueId }: IssueLikeButtonProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["issue-likes", issueId],
    queryFn: () => getIssueInteractions({ issueIds: [issueId] }),
  })

  if (isLoading) {
    return <div className="h-7 w-16 animate-pulse rounded bg-navy-600" />
  }

  const interaction = data?.interactions[0]

  return (
    <LikeButton
      issueId={issueId}
      initialLikes={interaction?.likesCount ?? 0}
      initialLiked={interaction?.isLiked ?? false}
    />
  )
}
