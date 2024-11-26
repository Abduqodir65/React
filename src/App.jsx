// App.js
import { Card1, Card2 } from "./components/cards";
import "./output.css";



function App() {
  return (
    <div className="grid lg:grid-cols-2 gap-5 place-items-center">
      <Card1/>
      <Card2/>

    </div>
  );
}

export default App;
