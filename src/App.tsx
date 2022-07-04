import Chart from "./app/components/Chart";
import NewsContainer from "./app/components/NewsContainer";
import SpotPrice from "./app/components/SpotPrice";

function App() {
  return (
    <div>
      <SpotPrice />
      <Chart />
      <NewsContainer />
    </div>
  );
}

export default App;
