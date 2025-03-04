import React, {useContext} from 'react'
import loginImg from "../../img/login.png";
import gallery from "../../img/art-gallery.jpg";
import courses from "../../img/courses.jpg";
import fund from "../../img/dollar.jpg"
import friend from "../../img/friend.jpg";
import game from "../../img/game.jpg";

import group from "../../img/groups.jpg";
import market from "../../img/market.jpg";
import message from "../../img/mail.jpg";
import memory from "../../img/memory.jpg";
import video from "../../img/video.jpg";
import tutorial from "../../img/tutorial.jpg";
import youtube from "../../img/youtube.jpg";
import events from '../../img/eventsplanning.jpg'
import  './leftbar.scss'
import { AuthContext } from '../../context/authContext';

function Leftbar() {
  const { currentUser, login } = useContext(AuthContext);
  console.log(currentUser)
 
 const profileImageUrl = currentUser?.profilePic?.startsWith("http")
   ? currentUser.profilePic
   : `http://localhost:8880/upload/${currentUser.profilePic}`;

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={profileImageUrl}
              alt="User"
              onError={(e) => (e.target.src = loginImg)}
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={group} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={market} alt="" />
            <span>Market Place</span>
          </div>
          <div className="item">
            <img src={youtube} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={memory} alt="" />
            <span>Memory</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={game} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={video} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={message} alt="" />
            <span>Message</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Other</span>
          <div className="item">
            <img src={fund} alt="" />
            <span>Fundraising</span>
          </div>
          <div className="item">
            <img src={tutorial} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftbar