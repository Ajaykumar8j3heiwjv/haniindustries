import Hero from "./Hero"
import FeaturedProducts from "./FeatureProducts"
import WhyChooseUs from "./WhyChooseUs"
import QualitySection from "./QualitySection"
import NewsletterSignup from "./NewsletterSignup"
import Contact from "./Contact"

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <QualitySection />
      {/* <NewsletterSignup /> */}
      <Contact />
    </div>
  )
}

export default HomePage
