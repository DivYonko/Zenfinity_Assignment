# Zenfinity Energy - Battery Analytics Dashboard

A comprehensive web-based dashboard for visualizing battery cycle data and analytics from Zenfinity Energy's Battery Snapshots API.

## Features

- **Cycle Navigation**: Intuitive slider, dropdown, and navigation buttons to browse through different cycles
- **Cycle Statistics**: Key metrics including cycle number, start/end times, duration, and SOH drop
- **Performance Metrics**: Visualizations for average speed, max speed, and total distance
- **Temperature Distribution**: Interactive histogram showing time spent in different temperature ranges with toggleable sampling rates (5°C, 10°C, 15°C, 20°C)
- **Battery Health**: SOC (State of Charge) and SOH (State of Health) visualizations with trend analysis
- **Alerts & Safety**: Clear display of warnings and protection events
- **Charging Insights**: Charging event statistics and voltage metrics
- **Long-term Trends**: Advanced analysis showing how battery metrics change across all cycles (SOH degradation, SOC trends, performance patterns)

## Tech Stack

- **React 18** with TypeScript
- **Recharts** for data visualization
- **Axios** for API calls
- Modern CSS with responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd battery-analytics-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build` folder that can be deployed to any static hosting service.

## Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run `netlify deploy` for a draft deployment or `netlify deploy --prod` for production
3. Or connect your GitHub repository to Netlify for automatic deployments

## API Information

- **Base URL**: `https://zenfinity-intern-api-104290304048.europe-west1.run.app`
- **Authorized IMEIs**: 
  - `865044073967657`
  - `865044073949366`

### Available Endpoints

- `GET /api/snapshots/summary` - Get summary of all batteries
- `GET /api/snapshots?imei={imei}&limit={limit}&offset={offset}` - Get cycle snapshots
- `GET /api/snapshots/{imei}/latest` - Get latest cycle snapshot
- `GET /api/snapshots/{imei}/cycles/{cycle_number}` - Get specific cycle data

## Project Structure

```
battery-analytics-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CycleNavigation.tsx
│   │   ├── CycleStatistics.tsx
│   │   ├── PerformanceMetrics.tsx
│   │   ├── TemperatureDistribution.tsx
│   │   ├── BatteryHealth.tsx
│   │   ├── AlertsSafety.tsx
│   │   ├── ChargingInsights.tsx
│   │   └── LongTermTrends.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## Features in Detail

### Cycle Navigation
- Slider for quick navigation
- Dropdown for direct cycle selection
- Previous/Next buttons
- Displays current cycle number and total cycles

### Temperature Distribution
- Toggle between 5°C, 10°C, 15°C, and 20°C sampling rates
- Bar chart showing time spent in each temperature range
- Interactive tooltips

### Battery Health
- SOC visualization with min, average, and max values
- SOH degradation tracking
- Cumulative SOH drop analysis across cycles

### Long-term Trends
- SOH degradation curve
- SOC and temperature trends over cycles
- Performance metrics evolution
- Charging pattern analysis

## License

This project is created for Zenfinity Energy internship assessment.

## Author

Created as part of the Zenfinity Energy Frontend Intern Assignment.

