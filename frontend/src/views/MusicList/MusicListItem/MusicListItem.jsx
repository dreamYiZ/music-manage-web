import "./MusicListItem.sass";

function MusicListItem({ music }) {
  // console.log("music", music);
  return (
    <div>
      <button className="MusicListItem">{music}</button>
    </div>
  );
}

export default MusicListItem;
