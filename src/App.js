import { useState } from 'react';
import './App.css';

function App() {
  const [hoverCount, setHoverCount] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ top: '55%', left: '50%' });

  const handleButtonHover = () => {
    if (hoverCount >= 3) {
      return;
    }

    setButtonPosition({
      top: `${10 + Math.random() * 80}%`,
      left: `${10 + Math.random() * 80}%`,
    });
    setHoverCount((prev) => prev + 1);
  };

  return (
    <div className="app">
      <h1>Конструктор вішлиста</h1>

      {hoverCount < 3 ? (
        <div className="question-area">
          <p className="question-text">Хочеш подарунок?</p>
          <button
            type="button"
            className="runaway-button"
            style={buttonPosition}
            onMouseEnter={handleButtonHover}
          >
            так
          </button>
        </div>
      ) : (
        <form className="wish-form" aria-label="Форма бажань">
          <label htmlFor="name">Ім&apos;я</label>
          <input id="name" name="name" type="text" />

          <label htmlFor="link">Посилання</label>
          <input id="link" name="link" type="url" />

          <label htmlFor="priority">Пріоритет</label>
          <select id="priority" name="priority" defaultValue="">
            <option value="" disabled>
              Оберіть пріоритет
            </option>
            <option value="високий">Високий</option>
            <option value="середній">Середній</option>
            <option value="низький">Низький</option>
          </select>
        </form>
      )}
    </div>
  );
}

export default App;
