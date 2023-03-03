import "./MusicListItem.sass";

function MusicListItem({ music, setPlayingMusic }) {
  // console.log("music", music);
  return (
    <div>
      <button
        className="MusicListItem"
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
