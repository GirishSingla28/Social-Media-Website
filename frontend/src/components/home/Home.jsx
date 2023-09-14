import React from 'react'
import "./home.scss";
import Stories from '../../parts/stories/Stories';
import Posts from '../../parts/posts/Posts';
import Share from '../../parts/share/Share';

function Home() {
  return (
    <div className="home">
    <Stories />
    <Share />
    <Posts />
    </div>
  )
}

export default Home;
