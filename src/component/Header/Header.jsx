import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { LuLogOut } from "react-icons/lu";
import "./Header.scss"

const Header = () => {
  const navigate=useNavigate()
  const handleLogout=()=>{
    navigate("/sign-in")
  }
  return (
    <nav className="header-bg">
      <img src="/logo.png"/>
      {/* <div className="nav-items-div">
        <a>Home</a>
        <a>Sign Up</a>
      </div> */}
      <div className="logout-div" onClick={handleLogout}>
        <button>Logout</button>
        <LuLogOut className='icon'/>
      </div>
      <button className="logout-btn" onClick={handleLogout}><LuLogOut className='icon'/></button>
    </nav>
  )
}

export default Header
