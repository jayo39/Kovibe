import React, { useState, useContext } from 'react'
import Header from "./components/header.jsx"
import LatestUpdate from './components/latestUpdate.jsx'
import MainBanner from './components/mainBanner.jsx'
import Content from './components/content.jsx'
import RankingTable from './components/rankingTable.jsx'
import Footer from './components/footer.jsx'
import { UserContext } from "./provider/userProvider";
import PostPage from './pages/post.jsx'

function App() {
  const {user} = useContext(UserContext);
  const isLoggedIn = !!user;

  return (
      <div>
        <Header></Header>
        {isLoggedIn ? (
             <PostPage/>) : 
             (  <>
                  <LatestUpdate />
                  <MainBanner />
                  <RankingTable />
                  <Content />
                </>
              )}
        <Footer></Footer>
      </div>
  )
}

export default App
