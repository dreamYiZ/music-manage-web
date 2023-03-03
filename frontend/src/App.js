import { useState, useEffect } from 'react';
import './App.css';
import './App.sass'
import MusicList from './views/MusicList'
import MusicPlayer from './views/MusicPlayer'
import { getMusicList } from "./api/api";



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
          setPlayingMusic(data.data[0]);
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


  const playPrevMusic = () => {
    const idx = musicList.findIndex(i => i === playingMusic)
    const len = musicList.length
    if (idx > 0) {
      setPlayingMusic(musicList[idx - 1])
    } else {
      setPlayingMusic(musicList[len - 1])
    }
  };

  const playNextMusic = () => {

    const idx = musicList.findIndex(i => i === playingMusic)
    const len = musicList.length
    if (idx < (len - 1)) {
      setPlayingMusic(musicList[idx + 1])
    } else {
      setPlayingMusic(musicList[0])
    }
  };

  const deleteMusic = () => { };

  return (
    <div className="App">
      <MusicList musicList={musicList} setPlayingMusic={setPlayingMusic} playingMusic={playingMusic} />
      <MusicPlayer
        playPrevMusic={playPrevMusic}
        playNextMusic={playNextMusic}
        deleteMusic={deleteMusic}
        setPlayingMusic={setPlayingMusic} playingMusic={playingMusic} />
    </div>
  );
}

export default App;
