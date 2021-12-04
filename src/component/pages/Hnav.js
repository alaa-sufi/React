import React  ,{useState} from 'react'
import logo from "../../asset/images/logo2.svg";
import toggleImg from "../../asset/images/toggle.svg"
import {  Link , useHistory } from "react-router-dom";
import {logoutApi} from "../Functions/ApiFunc"
export default function Hnav() {
    const [toggle , setToggle] = useState(false)
    const history = useHistory();

    const logout = ()=>{
        logoutApi("/api/admin/auth/logout").then(response =>{
           console.log(response.data);
           localStorage.clear("token");
           history.push("/");
            })
    }
    return (
        <>
      <div
      className={`${
        window.location.pathname.split("/")[1] ==  "admin"
          ? `user h-home-nav ${toggle && "open"}`
          : "h-home-nav"
      }`}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-sm-8 col-9">
             <img className="h-nav-toggle" src={toggleImg} alt="toggler" width="50" onClick={()=>{setToggle(!toggle)}}/>
          </div>
          <div className="col-sm-4 col-3">
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-nav-ul-parent" onClick={()=>{setToggle(!toggle)}}>
        <ul className="h-nav-ul">
         <li><Link to="/admin/types">الأصناف</Link></li>
         <li><Link to="/admin/order-book">طلبات الحجوزات</Link></li>
         <li><Link to="/admin/order-driver">طلبات التوصيل</Link></li>
         <li><Link to="/admin/drivers"> السائقين</Link></li>
         <li><Link to="/admin/notification"> الاشعارات</Link></li>
         <li><Link to="/admin/barren"> الجرد</Link></li>
         <li><Link to="/admin/setting">الإعدادات</Link></li>
         <li><a href="#" onClick={(e) =>{e.preventDefault(); logout()}}>تسجيل الخروج</a></li>
     </ul>
        </div>
    </div>
  
         
    
         
        </>
       
    )
}
