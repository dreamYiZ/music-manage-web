import { useState, useEffect } from 'react';
import './App.css';
import './App.sass'
import MusicList from './views/MusicList'
import MusicPlayer from './views/MusicPlayer'
import { safeFilename, getMusicList, deleteMusic as deleteMusicApi } from "./api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import MenuButton from './views/MenuButton/MenuButton'


library.add(fas)


function App() {

  const [playingMusic, setPlayingMusic] = useState();


  const [musicList, setMusicList] = useState();

  useEffect(() => {
    let isFirstLoad = true;

    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await getMusicList();
      // convert the data to json
      // const json = await response.json();
      console.log("data", data);
      // set state with the result if `isFirstLoad` is true
      if (isFirstLoad) {
        setMusicList(data.data);
        if (data.data && data.data.length) {
          // setPlayingMusic(data.data[0]);
        }
        // setData(json);
      }
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

    // cancel any future `setData`
    return () => (isFirstLoad = false);
  }, []);


  const scrollAnimation = () => {
    setTimeout(() => {
      document.querySelector('.IsPlayingMenu').scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }, 100)
  }

  const playPrevMusic = () => {
    const idx = musicList.findIndex(i => i === playingMusic)
    const len = musicList.length
    if (idx > 0) {
      setPlayingMusic(musicList[idx - 1])
    } else {
      setPlayingMusic(musicList[len - 1])
    }

    scrollAnimation()
  };

  const playNextMusic = () => {

    const idx = musicList.findIndex(i => i === playingMusic)
    const len = musicList.length
    if (idx < (len - 1)) {
      setPlayingMusic(musicList[idx + 1])
    } else {
      setPlayingMusic(musicList[0])
    }

    scrollAnimation()
  };

  const deleteMusic = () => {
    playingMusic && deleteMusicApi(playingMusic).then((delRes) => {
      console.log('delRes', delRes)
      playNextMusic()
      const newMusicList = musicList.filter(i => i !== playingMusic)
      setMusicList(newMusicList)
    })
  };


  const makeFilenameSafe = () => {
    safeFilename().then(res => {
      console.log('safeFilename res-->', res)
    })
  }

  return (
    <div className="App">
      <div className='ControlPanel'>



        <MenuButton onClick={makeFilenameSafe} icon={<FontAwesomeIcon icon="fa-solid fa-truck-fast" />}>
          safe filename
        </MenuButton>


      </div>
      <main className='MusicBox'>
        <MusicList playingMusic={playingMusic} musicList={musicList} setPlayingMusic={setPlayingMusic} playingMusic={playingMusic} />
        <MusicPlayer
          playPrevMusic={playPrevMusic}
          playNextMusic={playNextMusic}
          deleteMusic={deleteMusic}
          setPlayingMusic={setPlayingMusic} playingMusic={playingMusic} />
      </main>


    </div>
  );
}

export default App;
