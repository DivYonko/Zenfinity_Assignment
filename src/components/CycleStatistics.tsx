import React from 'react';
import { CycleSnapshot } from '../types';
import './CycleStatistics.css';

interface CycleStatisticsProps {
  snapshot: CycleSnapshot;
}

const CycleStatistics: React.FC<CycleStatisticsProps> = ({ snapshot }) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="cycle-statistics">
      <h2>Cycle Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Cycle Number</div>
          <div className="stat-value">{snapshot.cycle_number}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Start Time</div>
          <div className="stat-value">{formatDateTime(snapshot.cycle_start_time)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">End Time</div>
          <div className="stat-value">{formatDateTime(snapshot.cycle_end_time)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Duration</div>
          <div className="stat-value">{formatDuration(snapshot.cycle_duration_hours)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">SOH Drop</div>
          <div className="stat-value">{snapshot.soh_drop.toFixed(3)}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average Temperature</div>
          <div className="stat-value">{snapshot.average_temperature.toFixed(1)}°C</div>
        </div>
      </div>
    </div>
  );
};

export default CycleStatistics;

