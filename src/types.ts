export interface BatterySummary {
  imei: string;
  total_cycles: number;
  avg_health: number;
  last_cycle_number: number;
}

export interface TemperatureDistribution {
  [key: string]: number;
}

export interface AlertDetails {
  warnings: string[];
  protections: string[];
}

export interface CycleSnapshot {
  imei: string;
  cycle_number: number;
  cycle_start_time: string;
  cycle_end_time: string;
  cycle_duration_hours: number;
  soh_drop: number;
  average_soc: number;
  min_soc: number;
  max_soc: number;
  average_temperature: number;
  temperature_dist_5deg: TemperatureDistribution;
  temperature_dist_10deg: TemperatureDistribution;
  temperature_dist_15deg: TemperatureDistribution;
  temperature_dist_20deg: TemperatureDistribution;
  total_distance: number;
  average_speed: number;
  max_speed: number;
  charging_instances_count: number;
  average_charge_start_soc: number;
  voltage_avg: number;
  voltage_min: number;
  voltage_max: number;
  alert_details: AlertDetails;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

