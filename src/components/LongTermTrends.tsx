import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Bar } from 'recharts';
import { CycleSnapshot } from '../types';
import './LongTermTrends.css';

interface LongTermTrendsProps {
  allSnapshots: CycleSnapshot[];
}

const LongTermTrends: React.FC<LongTermTrendsProps> = ({ allSnapshots }) => {
  if (allSnapshots.length === 0) {
    return null;
  }

  const sortedSnapshots = [...allSnapshots].sort((a, b) => a.cycle_number - b.cycle_number);

  const trendsData = sortedSnapshots.map((snapshot) => ({
    cycle: snapshot.cycle_number,
    sohDrop: snapshot.soh_drop,
    avgSoc: snapshot.average_soc,
    avgTemp: snapshot.average_temperature,
    totalDistance: snapshot.total_distance,
    avgSpeed: snapshot.average_speed,
    chargingInstances: snapshot.charging_instances_count,
  }));

  const cumulativeSoh = sortedSnapshots.reduce((acc, snapshot, index) => {
    const prev = index > 0 ? acc[index - 1] : 0;
    acc.push(prev + snapshot.soh_drop);
    return acc;
  }, [] as number[]);

  const trendsDataWithCumulative = trendsData.map((data, index) => ({
    ...data,
    cumulativeSoh: cumulativeSoh[index],
  }));

  return (
    <div className="long-term-trends">
      <h2>Long-term Trends Analysis</h2>
      <div className="trends-content">
        <div className="trend-section">
          <h3>SOH Degradation Over Cycles</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendsDataWithCumulative}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="cycle" 
                label={{ value: 'Cycle Number', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                yAxisId="left"
                label={{ value: 'SOH Drop (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sohDrop"
                stroke="#e74c3c"
                strokeWidth={2}
                name="SOH Drop per Cycle"
                dot={{ r: 4 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="cumulativeSoh"
                stroke="#667eea"
                strokeWidth={2}
                name="Cumulative SOH Drop"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="trend-section">
          <h3>Average SOC & Temperature Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="cycle" 
                label={{ value: 'Cycle Number', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                yAxisId="left"
                label={{ value: 'SOC (%)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                label={{ value: 'Temperature (°C)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="avgSoc"
                stroke="#667eea"
                strokeWidth={2}
                name="Average SOC (%)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgTemp"
                stroke="#e74c3c"
                strokeWidth={2}
                name="Average Temperature (°C)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="trend-section">
          <h3>Performance Metrics Over Cycles</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="cycle" 
                label={{ value: 'Cycle Number', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                yAxisId="left"
                label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                label={{ value: 'Speed (km/h)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="totalDistance"
                fill="#27ae60"
                name="Total Distance (km)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgSpeed"
                stroke="#667eea"
                strokeWidth={2}
                name="Average Speed (km/h)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="trend-section">
          <h3>Charging Patterns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="cycle" 
                label={{ value: 'Cycle Number', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: 'Charging Instances', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="chargingInstances" fill="#f39c12" name="Charging Instances" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LongTermTrends;

