import React from 'react';
import { CycleSnapshot } from '../types';
import './AlertsSafety.css';

interface AlertsSafetyProps {
  snapshot: CycleSnapshot;
}

const AlertsSafety: React.FC<AlertsSafetyProps> = ({ snapshot }) => {
  const { warnings, protections } = snapshot.alert_details || { warnings: [], protections: [] };

  return (
    <div className="alerts-safety">
      <h2>Alerts & Safety</h2>
      <div className="alerts-content">
        <div className="alerts-section">
          <h3>
            <span className="icon">⚠️</span> Warnings
          </h3>
          {warnings.length > 0 ? (
            <ul className="alerts-list warnings">
              {warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          ) : (
            <div className="no-alerts">No warnings detected</div>
          )}
        </div>
        <div className="alerts-section">
          <h3>
            <span className="icon">🛡️</span> Protections
          </h3>
          {protections.length > 0 ? (
            <ul className="alerts-list protections">
              {protections.map((protection, index) => (
                <li key={index}>{protection}</li>
              ))}
            </ul>
          ) : (
            <div className="no-alerts">No protection events triggered</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsSafety;

