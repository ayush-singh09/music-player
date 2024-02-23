import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import Content from "./Components/Content";
import Player from "./Components/Player";
import MobilePlayer from "./Components/MobilePlayer";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  return (
    <div className="bg-zinc-900 w-full h-screen p-3 flex flex-col gap-3 overflow-hidden">
      <NavBar />
      <Content/>
      
      {width>600?<Player/>:<MobilePlayer/>}
    </div>
  );
}

export default App;
