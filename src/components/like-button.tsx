import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ThumbsUpIcon } from "lucide-react"
import type { ComponentProps } from "react"
import type z from "zod"
import type { IssueInteractionsResponseSchema } from "@/api/routes/schemas/issue-interactions"
import { toggleLike } from "@/http/toggle-like"
import { Button } from "./button"

interface LikeButtonProps extends ComponentProps<"button"> {
  issueId: string
  initialLikes: number
  initialLiked?: boolean
}

type IssueInteractionsResponse = z.infer<typeof IssueInteractionsResponseSchema>

export function LikeButton({
  issueId,
  initialLikes,
  initialLiked,
  disabled,
  ...props
}: LikeButtonProps) {
  const queryClient = useQueryClient()

  const { mutate: handleToggleLike, isPending } = useMutation({
    mutationFn: () => toggleLike({ issueId }),
    onMutate: async () => {
      const previousData = queryClient.getQueryData<IssueInteractionsResponse>([
        "issue-likes",
        issueId,
      ])

      queryClient.setQueryData<IssueInteractionsResponse>(
        ["issue-likes", issueId],
        (oldData) => {
          if (!oldData) {
            return undefined
          }

          return {
            ...oldData,
            interactions: oldData.interactions.map((interaction) => {
              if (interaction.issueId === issueId) {
                return {
                  ...interaction,
                  isLiked: !interaction.isLiked,
                  likesCount: interaction.isLiked
                    ? interaction.likesCount - 1
                    : interaction.likesCount + 1,
                }
              }
              return interaction
            }),
          }
        },
      )

      return { previousData }
    },
    onError: async (err, _params, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["issue-likes", issueId], context.previousData)
      }
    },
  })

  const liked = initialLiked

  return (
    <Button
      data-liked={liked}
      {...props}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:text-white data-[liked=true]:hover:bg-indigo-500"
      aria-label={liked ? "unlike" : "like"}
      disabled={isPending}
      onClick={() => handleToggleLike()}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  )
}
