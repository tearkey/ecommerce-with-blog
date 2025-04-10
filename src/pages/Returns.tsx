
import PageLayout from "@/components/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Returns = () => {
  const faqs = [
    {
      question: "How do I return a product?",
      answer: "To initiate a return, log into your account, go to your order history, select the order containing the item you wish to return, and click the 'Return Item' button. Follow the instructions to complete your return request."
    },
    {
      question: "What is the return period?",
      answer: "We accept returns within 30 days of delivery for most products. Certain categories like computer components may have different return windows, which will be specified on the product page."
    },
    {
      question: "Do I have to pay for return shipping?",
      answer: "For defective items or if we made a mistake, return shipping is free. For change-of-mind returns, a shipping fee may be deducted from your refund unless you have a TechStore Premium membership."
    },
    {
      question: "How long does it take to process a refund?",
      answer: "Once we receive your return, it typically takes 3-5 business days to inspect and process. After approval, refunds usually appear in your account within 5-10 business days, depending on your payment provider."
    },
    {
      question: "Can I exchange instead of return?",
      answer: "Yes, you can request an exchange for another size, color, or even a different product of equal or higher value (paying the difference). Use the 'Exchange' option when initiating your return."
    }
  ];

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">Returns & Refunds Policy</h1>
      
      <div className="prose max-w-none mb-10">
        <p className="text-lg mb-6">
          At TechStore, we want you to be completely satisfied with your purchase. If you're not, we're happy to help with returns or exchanges.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Return Policy Overview</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>30-day return period for most items</li>
          <li>Items must be in original condition with all packaging and accessories</li>
          <li>Some products (like software, custom configurations) may have special return restrictions</li>
          <li>Defective items can be returned for replacement or refund</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Process</h2>
        <p>
          Refunds are issued to the original payment method. Processing times vary depending on your payment provider:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Credit/Debit Cards: 5-10 business days</li>
          <li>PayPal: 3-5 business days</li>
          <li>Store Credit: Immediately after approval</li>
        </ul>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </PageLayout>
  );
};

export default Returns;
