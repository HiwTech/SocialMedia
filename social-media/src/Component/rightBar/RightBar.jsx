import React from 'react'
import "./rightbar.scss";
import loginImg from "../../img/login.png";

function Rightbar() {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggested for you</span>
          <div className="user">
            <div className="userInfo">
              <img src={loginImg} alt="" />
              <span>Hiwot</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={loginImg} alt="" />
              <span>Hiwot</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Recent activities</span>

          <div className="user">
            <div className="userInfo">
              <img src={loginImg} alt="" />

              <p>
                <span>Hiwot</span> changed profile picture
              </p>
            </div>
            <span>1 min ago </span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={loginImg} alt="" />

              <p>
                <span>Minaleshewa</span> changed profile picture
              </p>
            </div>
            <span>3 min ago </span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={loginImg} alt="" />

              <p>
                <span>Minaleshewa</span> changed profile picture
              </p>
            </div>
            <span>3 min ago </span>
          </div>
        </div>
        <div className="item">
          <span>Friends online</span>

          <div className="user">
            <div className="userInfo">
              <img src={loginImg} alt="" />
              <span>Hiwot</span>
              <div className="online"></div>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={loginImg} alt="" />
              <span>Minaleshewa</span>
              <div className="online"></div>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={loginImg} alt="" />
              <span>Minaleshewa</span>
              <div className="online"></div>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={loginImg} alt="" />
              <span>Minaleshewa</span>
              <div className="online"></div>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={loginImg} alt="" />
              <span>Minaleshewa</span>
              <div className="online"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightbar