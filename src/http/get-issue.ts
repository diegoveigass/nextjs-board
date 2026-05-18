import { setTimeout } from "node:timers/promises"
import { IssueSchema } from "@/api/routes/get-issue"
import { clientEnv } from "@/env"

interface GetIssueParams {
  id?: string
}

export async function getIssue({ id }: GetIssueParams) {
  await setTimeout(2000)

  const url = new URL(`/api/issues/${id}`, clientEnv.NEXT_PUBLIC_API_URL)

  const response = await fetch(url)
  const data = await response.json()

  const issue = IssueSchema.parse(data)

  return issue
}
