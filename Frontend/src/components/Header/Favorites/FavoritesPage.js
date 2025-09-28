import React, { useState, useEffect } from 'react';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState({
    fashionTips: [],
    healthTips: [],
    skinCareTips: [],
    dailyRoutineTips: []
  });

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = {
      fashionTips: JSON.parse(localStorage.getItem('fashionFavorites') || '[]'),
      healthTips: JSON.parse(localStorage.getItem('healthFavorites') || '[]'),
      skinCareTips: JSON.parse(localStorage.getItem('skinCareFavorites') || '[]'),
      dailyRoutineTips: JSON.parse(localStorage.getItem('dailyRoutineFavorites') || '[]')
    };
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (category, index) => {
    const newFavorites = { ...favorites };
    newFavorites[category].splice(index, 1);
    setFavorites(newFavorites);
    
    // Update localStorage
    const storageKey = category === 'fashionTips' ? 'fashionFavorites' :
                      category === 'healthTips' ? 'healthFavorites' :
                      category === 'skinCareTips' ? 'skinCareFavorites' :
                      'dailyRoutineFavorites';
    localStorage.setItem(storageKey, JSON.stringify(newFavorites[category]));
  };

  const totalFavorites = Object.values(favorites).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>❤️ My Favorites</h1>
        <p>Your saved tips and recommendations ({totalFavorites} items)</p>
      </div>

      {totalFavorites === 0 ? (
        <div className="no-favorites">
          <div className="no-favorites-icon">💭</div>
          <h3>No favorites yet!</h3>
          <p>Start using our services to save your favorite tips and recommendations.</p>
        </div>
      ) : (
        <div className="favorites-sections">
          {favorites.fashionTips.length > 0 && (
            <div className="favorites-section">
              <h2>👗 Fashion Tips</h2>
              <div className="favorites-grid">
                {favorites.fashionTips.map((tip, index) => (
                  <div key={index} className="favorite-item">
                    <p>{tip}</p>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFavorite('fashionTips', index)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {favorites.healthTips.length > 0 && (
            <div className="favorites-section">
              <h2>🧘‍♀ Health Tips</h2>
              <div className="favorites-grid">
                {favorites.healthTips.map((tip, index) => (
                  <div key={index} className="favorite-item">
                    <p>{tip}</p>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFavorite('healthTips', index)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {favorites.skinCareTips.length > 0 && (
            <div className="favorites-section">
              <h2>💆‍♀ Skin & Hair Care Tips</h2>
              <div className="favorites-grid">
                {favorites.skinCareTips.map((tip, index) => (
                  <div key={index} className="favorite-item">
                    <p>{tip}</p>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFavorite('skinCareTips', index)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {favorites.dailyRoutineTips.length > 0 && (
            <div className="favorites-section">
              <h2>📅 Daily Routine Tips</h2>
              <div className="favorites-grid">
                {favorites.dailyRoutineTips.map((tip, index) => (
                  <div key={index} className="favorite-item">
                    <p>{tip}</p>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFavorite('dailyRoutineTips', index)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;