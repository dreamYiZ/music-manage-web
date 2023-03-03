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
        if(data.data&& data.data.length){
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


  return (
    <div className="App">
      <MusicList musicList={musicList} setPlayingMusic={setPlayingMusic} playingMusic={playingMusic} />
      <MusicPlayer setPlayingMusic={setPlayingMusic} playingMusic={playingMusic} />
    </div>
  );
}

export default App;
