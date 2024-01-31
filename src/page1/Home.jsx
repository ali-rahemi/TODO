import React, { useState } from "react";
import App from "../Components/App";
import Title from "../Components/Title";
import "./Home.css";
import { useSelector } from "react-redux";

// ${moment().format('YYYY/MM/DD,h:mm:ss')}


function Home() {
  const app = useSelector(state => state.app.app)

  return (
    <div className="home">
              <video style={{position:'fixed',right:0,left:0,top:0,bottom:0,zIndex:-9999,objectFit:'cover'}} src="/Images/note-background.mov" width='100%' height='100%' autoPlay loop muted/>

          

      {app?.columns.map((column, index) => (
        <div key={index}>
          <Title />
          <App cardColor={column.color} tasks={column.tasks} columnIndex={index} />
     
        </div>
        
      ))}



{/* 
          <button onClick={()=> {app?.columns.push}}>Add Column</button> */}
    </div>
  );
}

export default Home;
