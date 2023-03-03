import React from "react";
import MusicListMenu from "./MusicListMenu/MusicListMenu";

function MusicList({ musicList, setPlayingMusic, playingMusic }) {
  return (
    <div>
      <MusicListMenu
        musicList={musicList}
        playingMusic={playingMusic}
        setPlayingMusic={setPlayingMusic}
      />
    </div>
  );
}

export default MusicList;
