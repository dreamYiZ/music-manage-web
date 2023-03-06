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

  const [playMode, setPlayMode] = useState();




  // load all music from disk music folder
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


  // scroll to playing music
  const scrollAnimation = () => {
    setTimeout(() => {
      document.querySelector('.IsPlayingMenu').scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }, 100)
  }



  // play previous music  
  const playPrevMusic = () => {
    const _musicList = filteredList
    const idx = _musicList.findIndex(i => i === playingMusic)
    const len = _musicList.length
    if (idx > 0) {
      setPlayingMusic(_musicList[idx - 1])
    } else {
      setPlayingMusic(_musicList[len - 1])
    }

    scrollAnimation()
  };

  // play next music 
  const playNextMusic = () => {
    const _musicList = filteredList
    const idx = _musicList.findIndex(i => i === playingMusic)
    const len = _musicList.length
    if (idx < (len - 1)) {
      setPlayingMusic(_musicList[idx + 1])
    } else {
      setPlayingMusic(_musicList[0])
    }

    scrollAnimation()
  };

  // delete one music from disk
  const deleteMusic = () => {
    playingMusic && deleteMusicApi(playingMusic).then((delRes) => {
      console.log('delRes', delRes)
      playNextMusic()
      const newMusicList = musicList.filter(i => i !== playingMusic)
      setMusicList(newMusicList)
    })
  };



  // change all file names to safe paths
  const makeFilenameSafe = () => {
    safeFilename().then(res => {
      console.log('safeFilename res-->', res)
    })
  }



  //  search filter
  const [filter, setFilter] = useState('')
  const [filteredList, setFilteredList] = useState(musicList)


  //  search filter
  useEffect(() => {
    const _filteredList = musicList?.filter(i => i.includes(filter));
    setFilteredList(_filteredList)
  }, [filter, musicList])


  return (
    <div className="App">
      <div className='ControlPanel'>
        <MenuButton onClick={makeFilenameSafe} icon={<FontAwesomeIcon icon="fa-solid fa-truck-fast" />}>
          safe filename
        </MenuButton>

      </div>
      <main className='MusicBox'>
        <MusicList filter={filter} setFilter={setFilter} filteredList={filteredList} setFilteredList={setFilteredList} playingMusic={playingMusic} musicList={musicList} setPlayingMusic={setPlayingMusic} playingMusic={playingMusic} />
        <MusicPlayer
          playPrevMusic={playPrevMusic}
          playNextMusic={playNextMusic}
          deleteMusic={deleteMusic}
          setPlayMode={setPlayMode}
          playMode={playMode}
          setPlayingMusic={setPlayingMusic} playingMusic={playingMusic} />
      </main>


    </div>
  );
}

export default App;
