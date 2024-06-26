import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import {
  Layout,
  Home,
  About,
  ShuttleRun,
  Solitaire,
  Klusters,
  Resume,
  Unreal,
} from "./components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home showHeader={false} />} />
          <Route path="shuttlerun" element={<ShuttleRun />} />
          <Route path="solitaire" element={<Solitaire />} />
          <Route path="klusters" element={<Klusters />} />
          <Route path="resume" element={<Resume />} />
          <Route path="unreal" element={<Unreal />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Home showHeader={false} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
