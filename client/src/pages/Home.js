import React, { useContext, useState } from 'react'
import Music from '../components/music'
import Navbar from '../components/Navbar'
import "./Home.css"
import musicPlayer from '../components/musicPlayer'
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { UserContext } from '../context/userContext'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar } from '@mui/material'

const Home = () => {
  const [state] = useContext(UserContext)
  const [musicId, setMusicId] = useState("");
  console.log(musicId);
  let navigate = useNavigate()

  let {data : musics} = useQuery ("musicsCache", async()=>{
    const response = await API.get("/musics")
    return response.data.data.musics
  })
  let audioList = musics?.map((item, index)=>{
    return {
      name: item.title,
      singer: item.artis?.nama,
      cover: item.thumbnail,
      musicSrc: item.attache
    }
  })


  return (
    <div style={{backgroundColor:"#161616"}}>
        <div className='Background'>
            <Navbar/>
            <div className='headline'>
            <div style={{color:"white", fontWeight:400, fontSize:"48px", textAlign:"center"}}>
            Connect on DumbSound
            </div >
            <div style={{color:"white", fontWeight:400, fontSize:"24px", textAlign:"center"}}>Discovery, Stream, and share a constantly expanding mix of music <br/>from emerging and major artists around the world</div>
            </div>
        </div>
        <div style={{marginTop:"30px"}}>
          <div style={{color:"#EE4622", fontWeight:700, fontSize:"24px", textAlign:"center"}}>Dengarkan Dan Rasakan</div>
        </div>
        <div className='container-fluid ' style={{marginTop:"30px"}}>
          <div className='d-flex row ms-3'>
            {musics?.map((item,index)=>{
              return <Music setMusicId={setMusicId} key={index} item={item}/>
            })}
          </div>
        </div>
        {musicId === "" ? (
          <></>
        ) : (
          <AppBar>
            <Toolbar>
              <div>Gaass</div>
              <div>
                <p>{musicId?.title} - {musicId?.artis.name}</p>
            </div>
            <AudioPlayer autoPlay src={musicId?.attache} layout="horizontal" className="player" />
            </Toolbar>
          </AppBar>
        )}
    </div>
  )
}

export default Home