import { FeatureSection } from "./FeatureSection"


export default function ChooseusPage () {


  const features = [
    {
      title: "Fast Processing",
      description: "Get your transcript in minutes with our streamlined process.",
      variant: "default" as const,
    },
    {
      title: "Official and Verified Transcripts",
      description: "Trustworthy and authentic transcripts, verified for official use.",
      variant: "secondary" as const,
    },
    {
      title: "Customer support available 24/7",
      description: "Reach out anytime for assistance. We're here to help, day or night.",
      variant: "default" as const,
    },
    {
      title: "Customizable Transcript Layout",
      description: "Choose from various formats to match your academic requirements.",
      variant: "secondary" as const,
    },
  ]



  return (
    <section className="" >
      <FeatureSection
        badge="Why choose"
        title="Why Choose us"
        subtitle="List the benefits and features of your service:"
        features={features}
      />
    </section>
  )
}
