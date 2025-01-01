import React from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import WhyChooseUs from './WhyChooseUs';
import BlogAndNews from '../pages/BlogAndNews';
import TestimonialsAndCaseStudies from '../pages/TestimonialPage';
import AboutUsSummary from '../pages/AboutusSummery';
import ServiceSummary from './ServiceSumery';
import MetricsSection from './MetricSection';
import backgroundImage from '../assets/admin1.jpg';

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Navbar />
      <Dashboard />
      <AboutUsSummary />
      <WhyChooseUs />
      <MetricsSection />
      <ServiceSummary />
      <TestimonialsAndCaseStudies />
      <BlogAndNews />
    </div>
  );
};

export default Home;
