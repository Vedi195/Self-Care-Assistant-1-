import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import ContactPage from './components/Header/Contact/ContactPage';
import FavoritesPage from './components/Header/Favorites/FavoritesPage';
import AboutPage from './components/Header/About/AboutPage';

import Hero from './components/Hero/Hero';
import ServiceCards from './components/ServiceCards/ServiceCards';
import QuoteBox from './components/QuoteBox/QuoteBox';
import Footer from './components/Footer/Footer';
import FeedbackTable from './components/Admin/FeedbackTable';

// Service Components
import FashionSuggestion from './components/Services/FashionSuggestion/FashionSuggestion';
import HealthTips from './components/Services/HealthTips/HealthTips';
import DailyRoutine from './components/Services/DailyRoutine/DailyRoutine';
import SkinHairCare from './components/Services/SkinHairCare/SkinHairCare';
import TodoList from './components/Services/TodoList/TodoList';
import Reminders from './components/Services/Reminders/Reminders';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <ServiceCards />
                  <QuoteBox />
                </>
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin/feedback" element={<FeedbackTable />} />
            
            {/* Service Routes */}
            <Route path="/fashion-suggestion" element={<FashionSuggestion />} />
            <Route path="/health-tips" element={<HealthTips />} />
            <Route path="/daily-routine" element={<DailyRoutine />} />
            <Route path="/skin-hair-care" element={<SkinHairCare />} />
            <Route path="/todo-list" element={<TodoList />} />
            <Route path="/reminders" element={<Reminders />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;