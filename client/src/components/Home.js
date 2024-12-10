import React from 'react'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import WhyChooseUs from './WhyChooseUs'
import BlogAndNews from '../pages/BlogAndNews'
import TestimonialsAndCaseStudies from '../pages/TestimonialPage'
import AboutUsSummary from '../pages/AboutusSummery'
import ServiceSummary from './ServiceSumery'
import MetricsSection from './MetricSection'


const Home = () => {
  return (
    <div>
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
