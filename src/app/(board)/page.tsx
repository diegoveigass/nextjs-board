import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react"
import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { Section } from "@/components/section"

interface BoardProps {
  searchParams: Promise<{ q?: string }>
}

export default async function Board({ searchParams }: BoardProps) {
  const { q } = await searchParams

  return (
    <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            Backlog
          </Section.Title>
          <Section.IssueCount>32</Section.IssueCount>
        </Section.Header>
        <Section.Content>
          <Card.Root>
            <Card.Header>
              <Card.Number>BOARDAPPV1-001</Card.Number>
              <Card.Title>
                Implementar cartão de crédito na plataforma
              </Card.Title>
            </Card.Header>
            <Card.Footer>
              <Button>
                <ThumbsUpIcon className="size-3" />
                <span className="text-sm">12</span>
              </Button>

              <Button>
                <MessageCircleIcon className="size-3" />
                <span className="text-sm">3</span>
              </Button>
            </Card.Footer>
          </Card.Root>
          <div>card 2</div>
          <div>card 3</div>
        </Section.Content>
      </Section.Root>
    </main>
  )
}
