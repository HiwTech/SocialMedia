import { useContext } from 'react';
import './stories.scss'
import React from 'react'
import { AuthContext } from "../../context/authContext"
import loginImg from "../../img/login.png";

function Stories() {
    const {currentUser} = useContext(AuthContext)
    console.log(currentUser)
    const stories = [
      {
        id: 1,
        name: "Joe Doe",
        img:
          "https://cdn.pixabay.com/photo/2022/12/21/08/38/conifer-7669435_1280.jpg",
      },
      {
        id: 2,
        name: "Joe Lee",
        img:
          "https://cdn.pixabay.com/photo/2024/01/25/12/30/forest-8531787_1280.jpg",
      },
      {
        id: 3,
        name: "Harry Doe",
        img:
          "https://cdn.pixabay.com/photo/2024/01/15/19/40/animal-8510775_1280.jpg",
      },
      {
        id: 4,
        name: "Joe Doe",
        img:
          "https://cdn.pixabay.com/photo/2022/09/20/10/11/street-7467503_1280.jpg",
      },
    ]

    const profileImageUrl = currentUser?.profilePic?.startsWith("http")
      ? currentUser.profilePic
      : `http://localhost:8880/upload/${currentUser.profilePic}`;

  return (
    <div className="stories">
      <div className="story">
        <img
          src={profileImageUrl}
          alt="User"
          onError={(e) => (e.target.src = loginImg)}
        />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>

      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Stories
