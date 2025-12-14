import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CycleSnapshot } from '../types';
import './PerformanceMetrics.css';

interface PerformanceMetricsProps {
  snapshot: CycleSnapshot;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ snapshot }) => {
  const performanceData = [
    {
      name: 'Average Speed',
      value: snapshot.average_speed,
      unit: 'km/h',
    },
    {
      name: 'Max Speed',
      value: snapshot.max_speed,
      unit: 'km/h',
    },
    {
      name: 'Total Distance',
      value: snapshot.total_distance,
      unit: 'km',
    },
  ];

  return (
    <div className="performance-metrics">
      <h2>Performance Metrics</h2>
      <div className="metrics-content">
        <div className="metrics-cards">
          {performanceData.map((metric) => (
            <div key={metric.name} className="metric-card">
              <div className="metric-label">{metric.name}</div>
              <div className="metric-value">
                {metric.value.toFixed(2)} <span className="metric-unit">{metric.unit}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="metrics-chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#667eea" name="Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;

