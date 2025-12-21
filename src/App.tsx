import { useState, useEffect, useCallback } from 'react';
import { femaleOptions, maleOptions } from './data';

function App() {
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [femaleIndex, setFemaleIndex] = useState<number>(0);
  const [maleIndex, setMaleIndex] = useState<number>(0);

  const currentOptions = gender === 'female' ? femaleOptions : maleOptions;
  const selectedIndex = gender === 'female' ? femaleIndex : maleIndex;
  const setSelectedIndex = gender === 'female' ? setFemaleIndex : setMaleIndex;

  const currentImage = currentOptions[selectedIndex]?.value;

  const handleGenderChange = (newGender: 'female' | 'male') => {
    setGender(newGender);
  };

  const handleAgeChange = (index: number) => {
    setSelectedIndex(index);
  };

  // Preload images
  useEffect(() => {
    const allOptions = [...femaleOptions, ...maleOptions];
    allOptions.forEach((option) => {
      const img = new Image();
      img.src = option.value;
    });
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        setGender('female');
        break;
      case 'ArrowRight':
        event.preventDefault();
        setGender('male');
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(0, prev - 1));
        break;
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, currentOptions.length - 1));
        break;
      default:
        break;
    }
  }, [currentOptions.length, setSelectedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="masthead mt-4 mb-4">
          <h2 className="text-muted">Bone Age Reference</h2>
        </div>

        <div className="row">
          <div className="col-lg-2 col-md-3">
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button
                  className={`nav-link ${gender === 'female' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('female')}
                  role="tab"
                  aria-selected={gender === 'female'}
                >
                  Female
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${gender === 'male' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('male')}
                  role="tab"
                  aria-selected={gender === 'male'}
                >
                  Male
                </button>
              </li>
            </ul>

            <div className="tab-content">
              <div className="d-flex flex-column">
                {currentOptions.map((option, index) => (
                  <div className="form-check" key={option.label}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="ageRadios"
                      id={`radio-${index}`}
                      value={option.value}
                      checked={selectedIndex === index}
                      onChange={() => handleAgeChange(index)}
                    />
                    <label className="form-check-label" htmlFor={`radio-${index}`}>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-10 col-md-9 well">
            <div id="bone-age-img" className="mt-3 mt-md-0">
               {currentImage && <img src={currentImage} alt={`Bone age for ${gender} ${currentOptions[selectedIndex].label}`} className="img-fluid fade-in" />}
            </div>
          </div>
        </div>
      </div>
      <div className="footer mt-auto">
          <div className="container">
              <p className="text-muted credit mb-0">&copy; tsaiid@VGHKS 2013</p>
          </div>
      </div>
    </div>
  );
}

export default App;
