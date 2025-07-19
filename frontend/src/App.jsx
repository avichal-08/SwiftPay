import { BrowserRouter,Route,Routes } from "react-router-dom"
import React,{ lazy} from 'react';
const Landing = React.lazy(()=>import("./components/landing"));
const Signup = React.lazy(()=>import("./components/signup"));
const Login = React.lazy(()=>import("./components/login"));
const Dashboard = React.lazy(()=>import("./components/dashboard"));
const Send = React.lazy(()=>import("./components/transfer"));
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/send" element={<Send/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
