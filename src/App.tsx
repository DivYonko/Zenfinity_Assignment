import React, { useState, useEffect } from 'react';
import './App.css';
import { batteryApi } from './services/api';
import { CycleSnapshot, BatterySummary } from './types';
import CycleNavigation from './components/CycleNavigation';
import CycleStatistics from './components/CycleStatistics';
import PerformanceMetrics from './components/PerformanceMetrics';
import TemperatureDistribution from './components/TemperatureDistribution';
import BatteryHealth from './components/BatteryHealth';
import AlertsSafety from './components/AlertsSafety';
import ChargingInsights from './components/ChargingInsights';
import LongTermTrends from './components/LongTermTrends';

const ALLOWED_IMEIS = ['865044073967657', '865044073949366'];

function App() {
  const [selectedImei, setSelectedImei] = useState<string>(ALLOWED_IMEIS[0]);
  const [summaries, setSummaries] = useState<BatterySummary[]>([]);
  const [snapshots, setSnapshots] = useState<CycleSnapshot[]>([]);
  const [currentCycle, setCurrentCycle] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [selectedImei]);

  useEffect(() => {
    if (snapshots.length > 0) {
      const maxCycle = Math.max(...snapshots.map((s) => s.cycle_number));
      if (currentCycle > maxCycle) {
        setCurrentCycle(maxCycle);
      }
    }
  }, [snapshots, currentCycle]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryData, snapshotData] = await Promise.all([
        batteryApi.getSummary(),
        batteryApi.getSnapshots(selectedImei, 1000, 0),
      ]);
      setSummaries(summaryData);
      setSnapshots(snapshotData);
      if (snapshotData.length > 0) {
        const maxCycle = Math.max(...snapshotData.map((s) => s.cycle_number));
        setCurrentCycle(maxCycle);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data from API');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentSnapshot = snapshots.find((s) => s.cycle_number === currentCycle);

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading battery data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <div className="error-message">Error: {error}</div>
          <button className="retry-button" onClick={fetchData}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalCycles = snapshots.length > 0 
    ? Math.max(...snapshots.map((s) => s.cycle_number))
    : 1;

  return (
    <div className="app">
      <div className="app-header">
        <h1>🔋 Zenfinity Energy</h1>
        <p>Battery Analytics Dashboard</p>
        <div style={{ marginTop: '20px' }}>
          <label style={{ marginRight: '10px', color: 'white' }}>Select Battery IMEI: </label>
          <select
            value={selectedImei}
            onChange={(e) => {
              setSelectedImei(e.target.value);
              setCurrentCycle(1);
            }}
            style={{
              padding: '8px 15px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            {ALLOWED_IMEIS.map((imei) => (
              <option key={imei} value={imei}>
                {imei}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="dashboard-container">
        {currentSnapshot ? (
          <>
            <CycleNavigation
              currentCycle={currentCycle}
              totalCycles={totalCycles}
              onCycleChange={setCurrentCycle}
            />
            <CycleStatistics snapshot={currentSnapshot} />
            <PerformanceMetrics snapshot={currentSnapshot} />
            <TemperatureDistribution snapshot={currentSnapshot} />
            <BatteryHealth
              currentSnapshot={currentSnapshot}
              allSnapshots={snapshots}
            />
            <AlertsSafety snapshot={currentSnapshot} />
            <ChargingInsights snapshot={currentSnapshot} />
            {snapshots.length > 1 && (
              <LongTermTrends allSnapshots={snapshots} />
            )}
          </>
        ) : (
          <div className="error-container">
            <div className="error-message">No data available for the selected cycle</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

