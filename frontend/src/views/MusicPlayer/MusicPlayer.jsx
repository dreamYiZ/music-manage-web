import React, { useRef, useEffect, useState } from "react";
import { getMusic } from "../../api/api";
import classes from "./MusicPlayer.module.sass";
import AudioPlayer from "./AudioPlayer";

function MusicPlayer({
  playingMusic,
  playPrevMusic,
  playNextMusic,
  deleteMusic,
}) {
  console.log("playingMusic", playingMusic);

  const [mPlayingMusic, mSetPlayingMusic] = useState();
  const audioRef = useRef();

  useEffect(() => {
    // let isFirstLoad = true;

    const fetchData = async () => {
      const playingMusicUrl = await getMusic(playingMusic);
      console.log("playingMusicUrl", playingMusicUrl);
      // if (isFirstLoad) {
      mSetPlayingMusic(playingMusicUrl);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load();
        audioRef.current.play();
      }
      // }
    };

    fetchData().catch(console.error);

    return () => {
      // isFirstLoad = false;
    };
  }, [playingMusic]);

  useEffect(() => {
    audioRef.current.addEventListener("ended", playNextMusic);

    return () => {
      audioRef.current.removeEventListener("ended", playNextMusic);
    };
  }, [playNextMusic]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, []);

  const playCurrentMusic = () => {
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.play();
  };

  return (
    <div className={classes.MusicPlayer}>
      <div>{mPlayingMusic}</div>
      <div>
        <div className={classes.MusicTitleBox}>
          <h1 className={classes.MusicPlayAudioTitle}>{playingMusic}</h1>
        </div>

        <AudioPlayer key={mPlayingMusic} ref={audioRef} mPlayingMusic={mPlayingMusic} />
      </div>
      <div className={classes.ButtonGroup}>
        <button
          className={`${classes.PlayButton} ${classes.Button}`}
          onClick={playCurrentMusic}
        >
          play
        </button>
        <button
          className={`${classes.PrevButton} ${classes.Button}`}
          onClick={playPrevMusic}
        >
          preview
        </button>
        <button
          className={`${classes.NextButton} ${classes.Button}`}
          onClick={playNextMusic}
        >
          next
        </button>

        <button
          className={`${classes.DeleteButton} ${classes.Button}`}
          onClick={deleteMusic}
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
