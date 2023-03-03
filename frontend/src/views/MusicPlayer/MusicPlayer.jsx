import React, { useRef, useEffect, useState } from "react";
import { getMusic } from "../../api/api";
import classes from "./MusicPlayer.module.sass";

function MusicPlayer({ playingMusic }) {
  console.log("playingMusic", playingMusic);

  const [mPlayingMusic, mSetPlayingMusic] = useState();
  const audioRef = useRef();

  useEffect(() => {
    let isFirstLoad = true;

    const fetchData = async () => {
      const playingMusicUrl = await getMusic(playingMusic);
      console.log("playingMusicUrl", playingMusicUrl);
      if (isFirstLoad) {
        mSetPlayingMusic(playingMusicUrl);

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.load();
          audioRef.current.play();
        }
      }
    };

    fetchData().catch(console.error);

    return () => (isFirstLoad = false);
  }, [playingMusic]);

  const playCurrentMusic = () => {
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.play();
  };

  const playPrevMusic = () => {};

  const playNextMusic = () => {};

  return (
    <div className={classes.MusicPlayer}>
      <div>
        <h1 className={classes.MusicPlayAudioTitle}>{playingMusic}</h1>
        <audio className={classes.MusicPlayAudio} controls ref={audioRef}>
          <source src={mPlayingMusic} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
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
      </div>
    </div>
  );
}

export default MusicPlayer;
