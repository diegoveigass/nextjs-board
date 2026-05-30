"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, MessageCirclePlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import { Input } from "@/components/input"

const createCommentSchema = z.object({
  text: z.string().min(1, "Comment cannot be empty"),
})

type CreateCommentData = z.infer<typeof createCommentSchema>

interface IssueCommentFormProps {
  onCreateComment: (text: string) => Promise<void>
  isAuthenticated: boolean
}

export function IssueCommentForm({
  onCreateComment,
  isAuthenticated,
}: IssueCommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCommentData>({
    resolver: zodResolver(createCommentSchema),
  })

  async function handleCreateComment(data: CreateCommentData) {
    await onCreateComment(data.text)

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateComment)}
      className="relative w-full"
    >
      <Input
        placeholder={
          !isAuthenticated
            ? "You must be logged in to comment"
            : "Write a comment..."
        }
        disabled={isSubmitting || !isAuthenticated}
        className="bg-navy-900 h-11 pr-24 w-full"
        {...register("text")}
      />
      {errors.text && (
        <span className="text-xs text-red-500 mt-1">{errors.text.message}</span>
      )}
      <button
        type="submit"
        disabled={isSubmitting || !isAuthenticated}
        className="flex items-center gap-2 text-indigo-400 absolute right-3 top-1/2 -translate-y-1/2 hover:text-indigo-300 cursor-pointer disabled:opacity-50"
      >
        Publish
        {isSubmitting ? (
          <Loader2 className="size-3 animate-spin" />
        ) : (
          <MessageCirclePlusIcon className="size-3" />
        )}
      </button>
    </form>
  )
}
