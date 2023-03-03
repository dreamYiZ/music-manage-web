import React from "react";
import MusicListMenu from "./MusicListMenu/MusicListMenu";

function MusicList({ musicList, setPlayingMusic }) {
  return (
    <div>
      <MusicListMenu musicList={musicList} setPlayingMusic={setPlayingMusic} />
    </div>
  );
}

export default MusicList;
