import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CycleSnapshot } from '../types';
import './ChargingInsights.css';

interface ChargingInsightsProps {
  snapshot: CycleSnapshot;
}

const ChargingInsights: React.FC<ChargingInsightsProps> = ({ snapshot }) => {
  const chargingData = [
    {
      name: 'Charging Instances',
      value: snapshot.charging_instances_count,
    },
    {
      name: 'Avg Charge Start SOC',
      value: snapshot.average_charge_start_soc,
    },
  ];

  const voltageData = [
    {
      name: 'Average Voltage',
      value: snapshot.voltage_avg,
      unit: 'V',
    },
    {
      name: 'Min Voltage',
      value: snapshot.voltage_min,
      unit: 'V',
    },
    {
      name: 'Max Voltage',
      value: snapshot.voltage_max,
      unit: 'V',
    },
  ];

  return (
    <div className="charging-insights">
      <h2>Charging Insights</h2>
      <div className="insights-content">
        <div className="charging-stats">
          <div className="stat-item">
            <div className="stat-label">Charging Instances</div>
            <div className="stat-value">{snapshot.charging_instances_count}</div>
            <div className="stat-description">Number of charging events in this cycle</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Average Charge Start SOC</div>
            <div className="stat-value">{snapshot.average_charge_start_soc.toFixed(2)}%</div>
            <div className="stat-description">Average SOC when charging began</div>
          </div>
        </div>

        <div className="voltage-section">
          <h3>Voltage Metrics</h3>
          <div className="voltage-cards">
            {voltageData.map((item) => (
              <div key={item.name} className="voltage-card">
                <div className="voltage-label">{item.name}</div>
                <div className="voltage-value">
                  {item.value.toFixed(2)} <span className="voltage-unit">{item.unit}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="voltage-chart">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={voltageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value.toFixed(2)} V`, 'Voltage']} />
                <Legend />
                <Bar dataKey="value" fill="#27ae60" name="Voltage (V)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargingInsights;

