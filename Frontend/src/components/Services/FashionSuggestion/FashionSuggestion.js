import React, { useState, useEffect } from 'react';
import './FashionSuggestion.css';

const FashionSuggestion = () => {
  const [currentView, setCurrentView] = useState('main');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizStep, setQuizStep] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [styleResult, setStyleResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const quizQuestions = [
    {
      question: "What's your preferred style?",
      options: ["Casual & Comfortable", "Formal & Professional", "Trendy & Fashion-forward", "Classic & Timeless"]
    },
    {
      question: "What colors do you gravitate towards?",
      options: ["Neutral (Black, White, Gray)", "Earth Tones (Brown, Beige)", "Bold & Bright", "Pastels & Soft Colors"]
    },
    {
      question: "What's your lifestyle like?",
      options: ["Work from Home", "Office Professional", "Active & Outdoorsy", "Social & Event-oriented"]
    },
    {
      question: "What's your budget preference?",
      options: ["Budget-friendly", "Mid-range", "High-end", "Mix of all"]
    }
  ];

  const styleTypes = {
    "Casual & Comfortable": {
      name: "Comfort Chic",
      description: "You love looking put-together while feeling comfortable. Perfect for everyday wear!",
      tips: [
        "Invest in high-quality basics like well-fitted jeans and soft t-shirts",
        "Layer with cardigans or light jackets for versatility",
        "Choose comfortable shoes like white sneakers or loafers",
        "Accessorize with simple jewelry and a structured bag"
      ]
    },
    "Formal & Professional": {
      name: "Professional Power",
      description: "You command respect with polished, sophisticated looks that mean business.",
      tips: [
        "Build a capsule wardrobe with blazers, tailored pants, and button-down shirts",
        "Invest in quality dress shoes and a professional handbag",
        "Stick to neutral colors that mix and match easily",
        "Add subtle accessories like watches and pearl earrings"
      ]
    },
    "Trendy & Fashion-forward": {
      name: "Trend Setter",
      description: "You're always ahead of the curve, embracing new styles with confidence.",
      tips: [
        "Follow fashion influencers and magazines for latest trends",
        "Mix high-street finds with statement pieces",
        "Experiment with bold patterns and unique silhouettes",
        "Don't be afraid to try new color combinations"
      ]
    },
    "Classic & Timeless": {
      name: "Timeless Elegance",
      description: "You appreciate quality pieces that never go out of style.",
      tips: [
        "Invest in timeless pieces like a little black dress and trench coat",
        "Choose quality over quantity - build a curated wardrobe",
        "Stick to classic patterns like stripes, polka dots, and plaids",
        "Focus on fit and tailoring for a polished look"
      ]
    }
  };

  useEffect(() => {
    // Initialize chat with welcome message
    setChatMessages([
      {
        type: 'bot',
        message: "👋 Hi! I'm your fashion assistant! Ask me anything about style, outfit ideas, or fashion trends. How can I help you look amazing today?"
      }
    ]);
  }, []);

  const handleQuizAnswer = (answer) => {
    const newAnswers = { ...quizAnswers, [quizStep]: answer };
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Quiz completed, determine style
      const primaryStyle = answer; // Use the last answer as primary style
      setStyleResult(styleTypes[primaryStyle]);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizStep(0);
    setStyleResult(null);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setIsLoading(true);

    // Add user message
    setChatMessages(prev => [...prev, { type: 'user', message: userMessage }]);

    // Simulate AI response (In real implementation, you would call Gemini API)
    setTimeout(() => {
      const botResponse = generateFashionResponse(userMessage);
      setChatMessages(prev => [...prev, { type: 'bot', message: botResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  const generateFashionResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('color') || lowerInput.includes('colours')) {
      return "🎨 Great question about colors! For a versatile wardrobe, I recommend starting with neutrals like navy, white, and beige. These work well with everything. For pops of color, try jewel tones like emerald or sapphire - they're flattering on most skin tones!";
    } else if (lowerInput.includes('work') || lowerInput.includes('office')) {
      return "💼 For work attire, focus on well-fitted blazers, tailored trousers, and quality button-down shirts. A little black dress is perfect for meetings. Don't forget comfortable yet professional shoes - your feet will thank you!";
    } else if (lowerInput.includes('casual') || lowerInput.includes('weekend')) {
      return "👕 For casual looks, try the classic combo of well-fitted jeans with a nice top. Layer with a cardigan or denim jacket. White sneakers are super versatile and go with almost everything. Add a crossbody bag for a put-together casual vibe!";
    } else if (lowerInput.includes('date') || lowerInput.includes('dinner')) {
      return "💕 For a date night, choose something that makes you feel confident! A midi dress with heels is always elegant, or try dark jeans with a silk blouse and statement jewelry. The key is to feel comfortable and authentically you!";
    } else {
      return "✨ That's a great fashion question! Remember, the best outfit is one that makes you feel confident and comfortable. Focus on fit, choose colors that complement your skin tone, and don't be afraid to express your personality through your style choices!";
    }
  };

  const saveTipToFavorites = (tip) => {
    const favorites = JSON.parse(localStorage.getItem('fashionFavorites') || '[]');
    if (!favorites.includes(tip)) {
      favorites.push(tip);
      localStorage.setItem('fashionFavorites', JSON.stringify(favorites));
      alert('Tip saved to favorites! ❤️');
    } else {
      alert('This tip is already in your favorites! 😊');
    }
  };

  return (
    <div className="fashion-suggestion">
      <div className="fashion-header">
        <h1>👗 Fashion Suggestion</h1>
        <p>Discover your personal style and get fashion advice</p>
      </div>

      <div className="fashion-nav">
        <button 
          className={currentView === 'main' ? 'active' : ''}
          onClick={() => setCurrentView('main')}
        >
          🏠 Overview
        </button>
        <button 
          className={currentView === 'quiz' ? 'active' : ''}
          onClick={() => setCurrentView('quiz')}
        >
          📋 Style Quiz
        </button>
        <button 
          className={currentView === 'chat' ? 'active' : ''}
          onClick={() => setCurrentView('chat')}
        >
          💬 Fashion Chat
        </button>
      </div>

      {currentView === 'main' && (
        <div className="main-view">
          <div className="feature-cards">
            <div className="feature-card" onClick={() => setCurrentView('quiz')}>
              <div className="feature-icon">🎯</div>
              <h3>Discover Your Style</h3>
              <p>Take our quiz to find your perfect fashion personality</p>
            </div>
            
            <div className="feature-card" onClick={() => setCurrentView('chat')}>
              <div className="feature-icon">🤖</div>
              <h3>AI Fashion Assistant</h3>
              <p>Chat with our AI for personalized outfit recommendations</p>
            </div>
          </div>

          <div className="daily-tips">
            <h3>💡 Today's Fashion Tips</h3>
            <div className="tips-grid">
              <div className="tip-card">
                <p>"Mix textures for visual interest - try pairing a silk blouse with denim or leather."</p>
                <button onClick={() => saveTipToFavorites("Mix textures for visual interest - try pairing a silk blouse with denim or leather.")}>
                  ❤️ Save
                </button>
              </div>
              <div className="tip-card">
                <p>"The rule of three: stick to maximum 3 colors in one outfit for a cohesive look."</p>
                <button onClick={() => saveTipToFavorites("The rule of three: stick to maximum 3 colors in one outfit for a cohesive look.")}>
                  ❤️ Save
                </button>
              </div>
              <div className="tip-card">
                <p>"When in doubt, add a belt - it defines your waist and elevates any outfit."</p>
                <button onClick={() => saveTipToFavorites("When in doubt, add a belt - it defines your waist and elevates any outfit.")}>
                  ❤️ Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'quiz' && (
        <div className="quiz-view">
          {!styleResult ? (
            <div className="quiz-container">
              <div className="quiz-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
                <span>Question {quizStep + 1} of {quizQuestions.length}</span>
              </div>

              <div className="question-card">
                <h3>{quizQuestions[quizStep].question}</h3>
                <div className="options">
                  {quizQuestions[quizStep].options.map((option, index) => (
                    <button 
                      key={index}
                      className="option-btn"
                      onClick={() => handleQuizAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="result-container">
              <div className="result-header">
                <h2>🎉 Your Style Type: {styleResult.name}</h2>
                <p>{styleResult.description}</p>
              </div>

              <div className="style-tips">
                <h3>✨ Your Personal Style Tips</h3>
                <div className="tips-list">
                  {styleResult.tips.map((tip, index) => (
                    <div key={index} className="tip-item">
                      <p>{tip}</p>
                      <button onClick={() => saveTipToFavorites(tip)}>
                        ❤️ Save
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className="retry-btn" onClick={resetQuiz}>
                🔄 Take Quiz Again
              </button>
            </div>
          )}
        </div>
      )}

      {currentView === 'chat' && (
        <div className="chat-view">
          <div className="chat-container">
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  <div className="message-content">
                    {msg.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message bot">
                  <div className="message-content loading">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form className="chat-input-form" onSubmit={handleChatSubmit}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me about fashion, outfits, or style tips..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !chatInput.trim()}>
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionSuggestion;
    