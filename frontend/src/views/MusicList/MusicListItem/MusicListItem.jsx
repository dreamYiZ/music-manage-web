import classes from "./MusicListItem.module.sass";

function MusicListItem({ music, setPlayingMusic, isPlaying }) {
  
  return (
    <div>
      <button
        className={`${classes.MusicListItem} ${
          isPlaying ? classes.IsPlaying : ""
        } ${isPlaying ? 'IsPlayingMenu' : ""}`}
        onClick={() => {
          setPlayingMusic(music);
        }}
      >
        {music}
      </button>
    </div>
  );
}

export default MusicListItem;
