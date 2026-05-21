import { ThumbsUpIcon } from "lucide-react"
import { Button } from "./button"
import type { ComponentProps } from "react"

interface LikeButtonProps extends ComponentProps<"button"> {
  issueId: string
  initialLikes: number
  initialLiked?: boolean
}

export function LikeButton({
  issueId,
  initialLikes,
  initialLiked,
  disabled,
  ...props
}: LikeButtonProps) {
  const liked = initialLiked

  return (
    <Button
      data-liked={liked}
      {...props}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:text-white data-[liked=true]:hover:bg-indigo-500"
      aria-label={liked ? "unlike" : "like"}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  )
}
