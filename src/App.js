import React, { useState } from 'react';
import './App.css';
import AQIChart from './Components/AQIChart';
import AQITable from './Components/AQITable';
import AQICityChart from './Components/AQICityChart';
import useAQI from './Hooks/useAQI';
import { RequestStatus } from './Utils/utils';

const initialData = {
  status: RequestStatus.LOADING,
  data: {},
  selectedCities: [],
  selectCities: () => { },
  showCities: false,
  showBarChart: false
};

export const AQIContext = React.createContext(initialData);

function App() {
  const apiData = useAQI();

  const [showBarChart, toggleBarChart] = useState(false);
  const [cities, selectCities] = useState([]);
  const [showCities, toggleCities] = useState(false);

  const ctxData = {
    ...apiData,
    selectedCities: cities,
    selectCities,
    showCities,
    showBarChart
  };

  if (apiData.status === RequestStatus.ERROR) {
    return <div className="App">
      <p>Unable to Load AQM service. Try again later</p>
    </div>;
  }

  if (apiData.status === RequestStatus.LOADING) {
    return <div className="App">
      <p>Loading...</p>
    </div>;
  }

  return (
    <AQIContext.Provider value={ctxData}>
      <div className="App">

        {/* Buttons */}
        <div className="chart-buttons">
          {!showCities && <button onClick={() => toggleBarChart(!showBarChart)}>
            {showBarChart ? 'Hide Chart' : 'Show Chart'}
          </button>}
          {!showBarChart && <button onClick={() => toggleCities(!showCities)} disabled={cities.length === 0}>
            {showCities ? 'Hide Selected Cities' : 'Show Selected Cities'}
          </button>}
        </div>
        {/* Table */}
        {!showBarChart && !showCities && <AQITable />}

        {/* Charts */}
        <div style={{ width: '100%' }}>
          {showBarChart && <AQIChart />}
          {showCities && <AQICityChart cities={cities} />}
        </div>


      </div>
    </AQIContext.Provider>
  );
}

export default App;
