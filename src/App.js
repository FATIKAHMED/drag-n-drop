import logo from "./logo.svg";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragNDrop from "./component/DragNDrop";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <DragNDrop />
      </div>
    </DndProvider>
  );
}

export default App;
