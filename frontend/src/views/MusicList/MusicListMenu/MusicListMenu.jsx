import classes from "./MusicListMenu.module.sass";
import MusicListItem from "../MusicListItem/MusicListItem";

function MusicListMenu({ musicList, setPlayingMusic }) {
  // console.log("musicList", musicList);
  //   return "MusicListMenu";
  return (
    <div className={classes.MusicListMenu}>
      {(musicList || []).map((music) => {
        return (
          <MusicListItem
            key={music}
            music={music}
            setPlayingMusic={setPlayingMusic}
          />
        );
      })}
    </div>
  );
}

export default MusicListMenu;
