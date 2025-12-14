import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { CycleSnapshot } from '../types';
import './BatteryHealth.css';

interface BatteryHealthProps {
  currentSnapshot: CycleSnapshot;
  allSnapshots?: CycleSnapshot[];
}

const BatteryHealth: React.FC<BatteryHealthProps> = ({ currentSnapshot, allSnapshots = [] }) => {
  const socData = [
    { name: 'Min SOC', value: currentSnapshot.min_soc },
    { name: 'Average SOC', value: currentSnapshot.average_soc },
    { name: 'Max SOC', value: currentSnapshot.max_soc },
  ];

  const sohTrendData = allSnapshots.length > 0
    ? allSnapshots
        .sort((a, b) => a.cycle_number - b.cycle_number)
        .map((snapshot, index) => ({
          cycle: snapshot.cycle_number,
          sohDrop: snapshot.soh_drop,
          cumulativeSoh: allSnapshots
            .slice(0, index + 1)
            .reduce((sum, s) => sum + s.soh_drop, 0),
        }))
    : [];

  return (
    <div className="battery-health">
      <h2>Battery Health (SOC & SOH)</h2>
      <div className="health-content">
        <div className="soc-section">
          <h3>State of Charge (SOC) - Current Cycle</h3>
          <div className="soc-cards">
            {socData.map((item) => (
              <div key={item.name} className="soc-card">
                <div className="soc-label">{item.name}</div>
                <div className="soc-value">{item.value.toFixed(2)}%</div>
                <div className="soc-bar">
                  <div
                    className="soc-bar-fill"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="soh-section">
          <h3>State of Health (SOH) Trends</h3>
          {sohTrendData.length > 0 ? (
            <div className="soh-chart">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={sohTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="cycle" 
                    label={{ value: 'Cycle Number', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    label={{ value: 'SOH Drop (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="sohDrop"
                    stroke="#667eea"
                    fill="#667eea"
                    fillOpacity={0.6}
                    name="SOH Drop per Cycle"
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeSoh"
                    stroke="#e74c3c"
                    strokeWidth={2}
                    name="Cumulative SOH Drop"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="current-soh">
              <div className="soh-card">
                <div className="soh-label">SOH Drop (Current Cycle)</div>
                <div className="soh-value">{currentSnapshot.soh_drop.toFixed(4)}%</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatteryHealth;

