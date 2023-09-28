import { useState } from "react";
import LightWeightChart from "./Components/LightWeightChart/LightWeightChart";
function App() {
  const [dataPoints, setDataPoints] = useState([]);
  return (
    <div>
      <LightWeightChart dataPoints={dataPoints} setDataPoints={setDataPoints} />
    </div>
  );
}

export default App;
