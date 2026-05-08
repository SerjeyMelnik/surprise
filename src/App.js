import { useState } from 'react';
import './App.css';

const MAX_HOVER_COUNT = 3;

const createEmptyFormData = () => ({
  name: '',
  links: ['', '', ''],
  priority: '',
});

function App() {
  const [hoverCount, setHoverCount] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ top: '55%', left: '50%' });
  const [wishes, setWishes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingWishId, setEditingWishId] = useState(null);
  const [formData, setFormData] = useState(createEmptyFormData());

  const handleButtonHover = () => {
    if (hoverCount >= MAX_HOVER_COUNT) {
      return;
    }

    setButtonPosition({
      top: `${10 + Math.random() * 80}%`,
      left: `${10 + Math.random() * 80}%`,
    });
    setHoverCount((prev) => prev + 1);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...formData.links];
    newLinks[index] = value;
    setFormData((prev) => ({
      ...prev,
      links: newLinks,
    }));
  };

  const handleAddOrUpdateWish = () => {
    if (formData.name.trim() === '' || formData.priority === '') {
      alert('Будь ласка, заповніть ім\'я та пріоритет');
      return;
    }

    const wishData = {
      id: Date.now(),
      name: formData.name,
      links: formData.links.filter((link) => link.trim() !== ''),
      priority: formData.priority,
    };

    if (editingWishId) {
      setWishes((prev) =>
        prev.map((wish) =>
          wish.id === editingWishId
            ? {
                ...wish,
                name: wishData.name,
                links: wishData.links,
                priority: wishData.priority,
              }
            : wish,
        ),
      );
      setEditingWishId(null);
    } else {
      setWishes((prev) => [...prev, wishData]);
    }

    setFormData(createEmptyFormData());
  };

  const handleEditWish = (wishToEdit) => {
    setEditingWishId(wishToEdit.id);
    setFormData({
      name: wishToEdit.name,
      links: [...wishToEdit.links, '', '', ''].slice(0, 3),
      priority: wishToEdit.priority,
    });
  };

  const handleRemoveWish = (wishId) => {
    setWishes((prev) => prev.filter((wish) => wish.id !== wishId));

    if (editingWishId === wishId) {
      setEditingWishId(null);
      setFormData(createEmptyFormData());
    }
  };

  const handleCancelEdit = () => {
    setEditingWishId(null);
    setFormData(createEmptyFormData());
  };

  const handleContinueClicking = () => {
    setShowForm(true);
  };

  return (
    <div className="app">
      <h1>Конструктор вішлиста</h1>

      {hoverCount < MAX_HOVER_COUNT && !showForm ? (
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
      ) : !showForm ? (
        <div className="caught-message">
          <p className="caught-text">Попалась! 🎉</p>
          <button
            type="button"
            className="continue-button"
            onClick={handleContinueClicking}
          >
            ну добре клікай
          </button>
        </div>
      ) : (
        <div className="wishes-container">
          <div className="wish-form" aria-label="Форма бажань">
            <h2>Додай своє бажання</h2>
            <label htmlFor="name">Ім&apos;я подарунку *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleFormInputChange}
              placeholder="Введи назву подарунку"
            />

            <label htmlFor="priority">Пріоритет *</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleFormInputChange}
            >
              <option value="" disabled>
                Оберіть пріоритет
              </option>
              <option value="високий">Високий</option>
              <option value="середній">Середній</option>
              <option value="низький">Низький</option>
            </select>

            <fieldset className="links-fieldset">
              <legend>Посилання (максимум 3)</legend>
              {formData.links.map((link, index) => (
                <input
                  key={index}
                  type="url"
                  value={link}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  placeholder={`Посилання ${index + 1} (опціонально)`}
                />
              ))}
            </fieldset>

            <div className="form-actions">
              <button
                type="button"
                className="add-wish-button"
                onClick={handleAddOrUpdateWish}
              >
                {editingWishId ? 'Зберегти зміни' : 'Додати бажання'}
              </button>

              {editingWishId && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleCancelEdit}
                >
                  Скасувати
                </button>
              )}
            </div>
          </div>

          {wishes.length > 0 && (
            <div className="wishes-list">
              <h2>Мій вішліст ({wishes.length})</h2>
              <ul>
                {wishes.map((wish) => (
                  <li key={wish.id} className={`wish-item priority-${wish.priority}`}>
                    <div className="wish-header">
                      <h3>{wish.name}</h3>
                      <span className="priority-badge">{wish.priority}</span>
                    </div>
                    <div className="wish-actions">
                      <button
                        type="button"
                        className="wish-action-button"
                        onClick={() => handleEditWish(wish)}
                      >
                        Редагувати
                      </button>
                      <button
                        type="button"
                        className="wish-action-button danger"
                        onClick={() => handleRemoveWish(wish.id)}
                      >
                        Видалити
                      </button>
                    </div>
                    {wish.links.length > 0 && (
                      <div className="wish-links">
                        <p className="links-label">Посилання:</p>
                        <ul className="links-list">
                          {wish.links.map((link, index) => (
                            <li key={index}>
                              <a href={link} target="_blank" rel="noopener noreferrer">
                                Посилання {index + 1}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
