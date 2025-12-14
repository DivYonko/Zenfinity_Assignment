import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CycleSnapshot } from '../types';
import './TemperatureDistribution.css';

interface TemperatureDistributionProps {
  snapshot: CycleSnapshot;
}

type DistributionType = '5deg' | '10deg' | '15deg' | '20deg';

const TemperatureDistribution: React.FC<TemperatureDistributionProps> = ({ snapshot }) => {
  const [distributionType, setDistributionType] = useState<DistributionType>('5deg');

  const getDistributionData = () => {
    const dist = snapshot[`temperature_dist_${distributionType}` as keyof CycleSnapshot] as {
      [key: string]: number;
    };
    
    if (!dist) return [];

    return Object.entries(dist)
      .map(([range, minutes]) => ({
        range,
        minutes: parseFloat(minutes.toFixed(2)),
      }))
      .sort((a, b) => {
        const aStart = parseInt(a.range.split('-')[0]);
        const bStart = parseInt(b.range.split('-')[0]);
        return aStart - bStart;
      });
  };

  const chartData = getDistributionData();

  return (
    <div className="temperature-distribution">
      <div className="temperature-header">
        <h2>Temperature Distribution</h2>
        <div className="distribution-toggle">
          <label>Sampling Rate:</label>
          <div className="toggle-buttons">
            {(['5deg', '10deg', '15deg', '20deg'] as DistributionType[]).map((type) => (
              <button
                key={type}
                onClick={() => setDistributionType(type)}
                className={distributionType === type ? 'active' : ''}
              >
                {type.replace('deg', '°C')}
              </button>
            ))}
          </div>
        </div>
      </div>
      {chartData.length > 0 ? (
        <div className="temperature-chart">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="range" 
                label={{ value: 'Temperature Range (°C)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: 'Time (minutes)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number) => [`${value} minutes`, 'Time Spent']}
                labelFormatter={(label) => `Range: ${label}°C`}
              />
              <Legend />
              <Bar dataKey="minutes" fill="#e74c3c" name="Time Spent (minutes)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="no-data">No temperature distribution data available</div>
      )}
    </div>
  );
};

export default TemperatureDistribution;

