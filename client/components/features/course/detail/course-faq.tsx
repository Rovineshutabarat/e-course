import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Faq } from '@/types/entity/faq'

type CourseFaqProps = {
    faqs: Faq[]
}

const CourseFaq = ({ faqs }: CourseFaqProps) => {
    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold tracking-tight">
                    Frequently asked questions
                </h2>
                <p className="text-sm text-muted-foreground">
                    Everything you need to know before starting.
                </p>
            </div>
            <Accordion
                type="single"
                collapsible
                className="overflow-hidden rounded-md shadow bg-card px-5"
            >
                {faqs.map((faq: Faq) => (
                    <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                        <AccordionTrigger className="py-4 text-left text-sm font-semibold hover:no-underline">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-sm leading-6 text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}

export default CourseFaq