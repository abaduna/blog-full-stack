import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
  import Home from "./../pages/Home"
  import BLog from "./../pages/BLog"
  const RoutesPrincial =()=>{
    return(
        <Router>
            <Routes>
                
                  <Route path="/" element={<Home/>}/>
                  <Route path="/blog/:id" element={<BLog/>}/>
                  <Route
                path="*"
                element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    )
  }

export default RoutesPrincial