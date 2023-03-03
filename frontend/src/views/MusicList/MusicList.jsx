import React from "react";
import MusicListMenu from "./MusicListMenu/MusicListMenu";

function MusicList({ musicList }) {
  return (
    <div>
      <MusicListMenu musicList={musicList} />
    </div>
  );
}

export default MusicList;
