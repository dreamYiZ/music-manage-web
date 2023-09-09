import { useState, useEffect, useRef } from 'react';
import './App.css';
import './App.sass'
import MusicList from './views/MusicList'
import MusicPlayer from './views/MusicPlayer'
import { safeFilename, getMusicList, deleteMusic as deleteMusicApi } from "./api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import MenuButton from './views/MenuButton/MenuButton'
import ShortCutKey from "./views/ShortCutKey/ShortCutKey"

library.add(fas)


function App() {

  const [playingMusic, _setPlayingMusic] = useState();

  const [musicList, setMusicList] = useState();

  const [playMode, setPlayMode] = useState();


  //  search filter
  const [filter, setFilter] = useState('')
  const [filteredList, _setFilteredList] = useState(musicList)
  const musicPlayerRef = useRef();


  const filteredListRef = useRef();
  const setFilteredList = (d) => {
    _setFilteredList(d);
    filteredListRef.current = d;
  }

  const playingMusicRef = useRef(playingMusic);

  const setPlayingMusic = (d) => {
    _setPlayingMusic(d);
    playingMusicRef.current = d;
  }

  const getMusicRefCurrent = () => {
    return [filteredListRef.current, playingMusicRef.current];
  }

  //  search filter
  useEffect(() => {
    const _filteredList = musicList?.filter(i => i.includes(filter));

    console.log('111_filteredList', _filteredList)
    setFilteredList(_filteredList)
  }, [filter, musicList])


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
    const _musicList = filteredListRef.current;

    const playingMusic = playingMusicRef.current;

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
    const _musicList = filteredListRef.current;
    const playingMusic = playingMusicRef.current;

    console.log('filteredList', filteredList)
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

    const [musicList, playingMusic] = getMusicRefCurrent();
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


  const stopPlay = () => {
    musicPlayerRef.current.stopAudio();
  }

  const togglePlay = () => {
    musicPlayerRef.current.togglePlay();
  }


  const jumpTo = (n) => {
    musicPlayerRef.current.jumpTo(n);
  }

  useEffect(() => {
    const keyPress = (event) => {
      const name = event.key;
      const code = event.code;


      const KEY_ARROW_LEFT = "ArrowLeft";
      const KEY_ARROW_RIGHT = "ArrowRight";
      const KEY_SPACE = 'Space';
      const KEY_DELETE = 'Delete';

      if (code === KEY_ARROW_LEFT) {
        playPrevMusic();
      }

      if (code === KEY_ARROW_RIGHT) {
        playNextMusic();
      }


      if (code === KEY_SPACE) {
        togglePlay();
      }

      if (code === KEY_DELETE) {
        deleteMusic();
      }

      if (Array.from(Array(10).keys()).map(i => `Digit${i}`).includes(code)) {

        jumpTo(
          Array.from(code).pop()
        )

      }


      // Alert the key name and key code on keydown
      console.log(`key name: ${name}, key code: ${code}`);
      // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    }
    document.addEventListener("keydown", keyPress)
    return () => {
      document.removeEventListener("keydown", keyPress);
    }
  }, [])


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
          setPlayingMusic={setPlayingMusic} playingMusic={playingMusic}
          ref={musicPlayerRef} />
      </main>

      <ShortCutKey />
    </div>
  );
}

export default App;
