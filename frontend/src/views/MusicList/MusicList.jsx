import React,{useState, useEffect} from "react";
import MusicListMenu from "./MusicListMenu/MusicListMenu";
import classes from "./MusicList.module.sass";

function MusicList({ filter,setFilter, filteredList, setFilteredList,musicList, setPlayingMusic, playingMusic }) {

  return (
    <div>
      <input className={classes.Filter}  onChange={(e)=>setFilter(e.target.value)} />
      <MusicListMenu
        musicList={filteredList}
        playingMusic={playingMusic}
        setPlayingMusic={setPlayingMusic}
      />
    </div>
  );
}

export default MusicList;
