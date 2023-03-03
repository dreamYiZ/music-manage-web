import classes from "./MusicListMenu.module.sass";
import MusicListItem from "../MusicListItem/MusicListItem";

function MusicListMenu({ musicList }) {
  // console.log("musicList", musicList);
  //   return "MusicListMenu";
  return (
    <div className={classes.MusicListMenu}>
      {(musicList || []).map((music) => {
        return <MusicListItem key={music} music={music} />;
      })}
    </div>
  );
}

export default MusicListMenu;
