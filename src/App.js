
import './App.css';
import LoadingBar from 'react-top-loading-bar'
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App =(props)=> {
  const [progress, setprogress] = useState(0)
  const setProgress =(pro)=>{
    setprogress(pro)
  }
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
        color='#f11946'
        progress={progress}
        
      />
          <Switch>
            <Route exact path="/"><News setProgress={setProgress}  key='general' pagesize={5} country='in' category='general' /></Route>
            <Route exact path="/business"><News setProgress={setProgress}  key='business' pagesize={5} country='in' category='business' /></Route>
            <Route exact path="/entertainment"><News setProgress={setProgress}  key='entertainment' pagesize={5} country='in' category='entertainment' /></Route>
            <Route exact path="/general"><News setProgress={setProgress}  key='genera2' pagesize={5} country='in' category='general' /></Route>
            <Route exact path="/health"><News setProgress={setProgress}  key='health' pagesize={5} country='in' category='health' /></Route>
            <Route exact path="/science"><News setProgress={setProgress}  key='science' pagesize={5} country='in' category='science' /></Route>
            <Route exact path="/sports"><News setProgress={setProgress}  key='sports' pagesize={5} country='in' category='sports' /></Route>
            <Route exact path="/technology"><News setProgress={setProgress}  key='technology' pagesize={5} country='in' category='technology' /></Route>
          </Switch>
        </Router>
      </div>
    )
  
}
export default App