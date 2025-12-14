import axios from 'axios';
import { BatterySummary, CycleSnapshot } from '../types';

const API_BASE_URL = 'https://zenfinity-intern-api-104290304048.europe-west1.run.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const batteryApi = {
  getSummary: async (imei?: string): Promise<BatterySummary[]> => {
    const params = imei ? { imei } : {};
    const response = await api.get<BatterySummary[]>('/api/snapshots/summary', { params });
    return response.data;
  },

  getSnapshots: async (
    imei: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<CycleSnapshot[]> => {
    const response = await api.get<CycleSnapshot[]>('/api/snapshots', {
      params: { imei, limit, offset },
    });
    return response.data;
  },

  getLatestSnapshot: async (imei: string): Promise<CycleSnapshot> => {
    const response = await api.get<CycleSnapshot>(`/api/snapshots/${imei}/latest`);
    return response.data;
  },

  getCycleSnapshot: async (imei: string, cycleNumber: number): Promise<CycleSnapshot> => {
    const response = await api.get<CycleSnapshot>(
      `/api/snapshots/${imei}/cycles/${cycleNumber}`
    );
    return response.data;
  },
};

