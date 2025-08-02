import { BrowserRouter,Route,Routes } from "react-router-dom"
import React,{ lazy} from 'react';
const Landing = React.lazy(()=>import("./pages/landing"));
const Signup = React.lazy(()=>import("./pages/signup"));
const Login = React.lazy(()=>import("./pages/login"));
const Dashboard = React.lazy(()=>import("./pages/dashboard"));
const Send = React.lazy(()=>import("./pages/transfer"));
const Confirmation = React.lazy(()=>import("./pages/confirmation"));
const How = React.lazy(()=>import("./pages/how"));
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/send" element={<Send/>}/>
      <Route path="/send/confirmation" element={<Confirmation/>} />
      <Route path="/howitworks" element={<How/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
