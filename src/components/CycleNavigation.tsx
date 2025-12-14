import React from 'react';
import './CycleNavigation.css';

interface CycleNavigationProps {
  currentCycle: number;
  totalCycles: number;
  onCycleChange: (cycle: number) => void;
}

const CycleNavigation: React.FC<CycleNavigationProps> = ({
  currentCycle,
  totalCycles,
  onCycleChange,
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCycleChange(parseInt(e.target.value));
  };

  const handlePrevious = () => {
    if (currentCycle > 1) {
      onCycleChange(currentCycle - 1);
    }
  };

  const handleNext = () => {
    if (currentCycle < totalCycles) {
      onCycleChange(currentCycle + 1);
    }
  };

  return (
    <div className="cycle-navigation">
      <h2>Cycle Navigation</h2>
      <div className="navigation-controls">
        <button
          onClick={handlePrevious}
          disabled={currentCycle === 1}
          className="nav-button"
        >
          ← Previous
        </button>
        <div className="slider-container">
          <label>
            Cycle {currentCycle} of {totalCycles}
          </label>
          <input
            type="range"
            min="1"
            max={totalCycles}
            value={currentCycle}
            onChange={handleSliderChange}
            className="cycle-slider"
          />
          <div className="cycle-selector">
            <select
              value={currentCycle}
              onChange={(e) => onCycleChange(parseInt(e.target.value))}
              className="cycle-dropdown"
            >
              {Array.from({ length: totalCycles }, (_, i) => i + 1).map((cycle) => (
                <option key={cycle} value={cycle}>
                  Cycle {cycle}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleNext}
          disabled={currentCycle === totalCycles}
          className="nav-button"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default CycleNavigation;

