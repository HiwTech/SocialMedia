import React from 'react'
import "./home.scss";
import Stories from '../../Component/Stories/Stories';
import Posts from '../../Component/Posts/Posts';
import Share from '../../Component/Share/Share';


function Home() {
  return (
    <div className='home'>
      <Stories/>
      <Share/>
    
      <Posts/>
      
    </div>
  );
}

export default Home