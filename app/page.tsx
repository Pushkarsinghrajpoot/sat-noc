"use client"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import PricingCards from "@/components/pricing-cards"
import FeatureShowcase from "@/components/feature-showcase"
import ProductivitySection from "@/components/productivity-section"
import LearningSection from "@/components/learning-section"
import AgentsSection from "@/components/agents-section"
import ComparisonTable from "@/components/comparison-table"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <PricingCards />
      <FeatureShowcase />
      <ProductivitySection />
      <LearningSection />
      <AgentsSection />
      <ComparisonTable />
      <FAQ />
      <Footer />
    </main>
  )
}
