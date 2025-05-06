"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Minus, X } from "lucide-react"

const faqs = [
  {
    question: "How long does it take to receive my transcript?",
    answer:
      "Transcripts are typically processed within 3-5 business days after your request is submitted. For expedited processing, please select the rush service option during checkout.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and other secure payment methods. You can choose your preferred method during checkout.",
  },
  {
    question: "Can I update my information after submitting the form?",
    answer:
      "Yes, you can update your information after submitting the form. Please contact our customer support team with your request ID, and they will assist you with making the necessary changes.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Yes, all payments are processed through secure, encrypted connections. We use industry-standard security protocols to ensure your financial information remains protected.",
  },
  {
    question: "How do I download my transcript after payment?",
    answer:
      "After your payment is processed, you will receive an email with a secure download link. You can also access your transcript by logging into your account and navigating to the 'My Documents' section.",
  },
]

export default function Faq() {
  const [openItem, setOpenItem] = useState<number | null>(0)

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <div className="w-full space-y-4">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          faq={faq}
          isOpen={openItem === index}
          onClick={() => toggleItem(index)}
          index={index}
        />
      ))}
    </div>
  )
}

function AccordionItem({ faq, isOpen, onClick, index }: { faq: { question: string; answer: string }; isOpen: boolean; onClick: () => void; index: number }) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.height = contentRef.current.scrollHeight + "px"
      } else {
        contentRef.current.style.height = "0px"
      }
    }
  }, [isOpen])

  return (
   <div className=""> 

    <div className="border-b border-gray-200 overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left font-medium text-lg"
      >
        <span>{faq.question}</span>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? (
            index === 1 ? (
              <X className="h-5 w-5 text-gray-500" />
            ) : (
              <Minus className="h-5 w-5 text-gray-500" />
            )
          ) : (
            <Plus className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out text-gray-600"
        style={{ height: "0px" }}
      >
        <div className="pb-6 pt-2 px-1">
          {faq.answer}
        </div>
      </div>
    </div>

    </div>
  )
}
