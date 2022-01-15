import logo from "./logo.svg";
import "./App.css";
import ReactTextEditor from "./ReactTextEditor/ReactTextEditor";

function App() {
  let options=["bold","italic","underline","orderList","unorderList","img","file","emoji","table","link"];
  let allowedFileTypes=["ppt","doc","excel","pdf"];
  let allowedImageTypes=["gif","jpeg","png","jpg",];
  return (
    <div>
      <ReactTextEditor  options={options} lable={"Detail"}/>
    </div>
  );
}

export default App;
