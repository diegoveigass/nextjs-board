import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react"
import { Section } from "@/components/section"
import { Card } from "@/components/card"
import { Button } from "@/components/button"

export default function Home() {
  return (
    <div className="max-w-405 w-full mx-auto p-10 flex flex-col gap-8 h-dvh">
      <div />

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
    </div>
  )
}
