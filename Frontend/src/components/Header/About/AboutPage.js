import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>💛 About Self-Care Assistant</h1>
          <p className="hero-subtitle">Your personal wellness companion for a better, healthier life</p>
        </div>
      </div>

      <div className="about-content">
        <section className="mission-section">
          <h2>🌟 Our Mission</h2>
          <p>
            At Self-Care Assistant, we believe that everyone deserves to live their best life. 
            Our mission is to provide you with personalized, accessible, and practical tools 
            to enhance your daily wellness routine and help you achieve your self-care goals.
          </p>
        </section>

        <section className="features-section">
          <h2>✨ What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👗</div>
              <h3>Fashion Guidance</h3>
              <p>Get personalized style recommendations and discover your unique fashion sense with our AI-powered chatbot and style quizzes.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🧘‍♀</div>
              <h3>Health & Wellness</h3>
              <p>Receive customized health tips, yoga recommendations, and wellness guidance based on your personal health profile.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Daily Planning</h3>
              <p>Organize your day with personalized routine suggestions and smart planning tools to maximize your productivity.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💆‍♀</div>
              <h3>Beauty Care</h3>
              <p>Discover the perfect skincare and haircare routine tailored to your specific needs and preferences.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Task Management</h3>
              <p>Stay organized with our intuitive to-do list feature that helps you track and accomplish your daily goals.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Smart Reminders</h3>
              <p>Never miss important self-care activities with our intelligent reminder system that keeps you on track.</p>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>💝 Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>🎯 Personalization</h3>
              <p>We believe that self-care is personal. Our tools adapt to your unique needs and preferences.</p>
            </div>
            <div className="value-item">
              <h3>🌱 Growth</h3>
              <p>We're committed to helping you grow and evolve on your wellness journey, one day at a time.</p>
            </div>
            <div className="value-item">
              <h3>🤝 Accessibility</h3>
              <p>Self-care should be accessible to everyone. Our platform is designed to be user-friendly and inclusive.</p>
            </div>
            <div className="value-item">
              <h3>💡 Innovation</h3>
              <p>We continuously innovate to bring you the latest in wellness technology and self-care practices.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>👥 Our Story</h2>
          <p>
            Self-Care Assistant was born from the understanding that in our busy lives, 
            we often neglect the most important person - ourselves. Our team of wellness 
            enthusiasts, developers, and health experts came together to create a 
            comprehensive platform that makes self-care simple, enjoyable, and sustainable.
          </p>
          <p>
            We're passionate about empowering individuals to prioritize their well-being 
            and make self-care a natural part of their daily routine. Through continuous 
            innovation and user feedback, we strive to create the most helpful and 
            intuitive wellness companion available.
          </p>
        </section>

        <section className="contact-section">
          <h2>📞 Get in Touch</h2>
          <p>
            Have questions, suggestions, or just want to share your self-care journey with us? 
            We'd love to hear from you! Feel free to reach out through our contact page or 
            connect with us on social media.
          </p>
          <div className="contact-buttons">
            <a href="/contact" className="contact-btn">Contact Us</a>
            <a href="mailto:hello@selfcareassistant.com" className="contact-btn secondary">Send Email</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;