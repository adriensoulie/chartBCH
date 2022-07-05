import Chart from "./app/components/Chart";
import Footer from "./app/components/Footer";
import NewsContainer from "./app/components/NewsContainer";
import SpotPrice from "./app/components/SpotPrice";

function App() {
  return (
    <div>
      <Chart />
      <SpotPrice />
      <NewsContainer />
      <Footer />
    </div>
  );
}

export default App;
