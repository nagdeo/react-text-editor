import logo from "./logo.svg";
import "./App.css";
import ReactTextEditor from "./ReactTextEditor/ReactTextEditor";

function App() {
  let options=["bold","italic","underline","orderList","unorderList","img","file","emoji"];
  return (
    <div>
      <ReactTextEditor  options={options}/>
    </div>
  );
}

export default App;
