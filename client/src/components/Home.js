import React from 'react'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import WhyChooseUs from './WhyChooseUs'
import BlogAndNews from '../pages/BlogAndNews'
import TestimonialsAndCaseStudies from '../pages/TestimonialPage'
import AboutUsSummary from '../pages/AboutusSummery'
import ServiceSummary from './ServiceSumery'
import MetricsSection from './MetricSection'
import backgroundImage from '../assets/admin1.jpg'

const Home = () => {
  return (
    <div    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "780vh",
      width: "100%",
    }}>
      <Navbar/>
      <Dashboard/>
      <AboutUsSummary/>
      <WhyChooseUs/>
      <MetricsSection/>
      <ServiceSummary/>
      <TestimonialsAndCaseStudies/>
      <BlogAndNews/>
    </div>
  )
}

export default Home
