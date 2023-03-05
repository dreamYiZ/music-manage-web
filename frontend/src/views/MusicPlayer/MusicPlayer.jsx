import React, { useRef, useEffect, useState } from "react";
import { getMusic } from "../../api/api";
import classes from "./MusicPlayer.module.sass";
import AudioPlayer from "./AudioPlayer";

const MODE_PLAY = {
  SINGLE_LOOP: "single-loop",
  ORDER: "order",
};

function MusicPlayer({
  playingMusic,
  playPrevMusic,
  playNextMusic,
  deleteMusic,
  setPlayMode,
  playMode,
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

  const playCurrentAgain = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  useEffect(() => {
    if (playMode === MODE_PLAY.SINGLE_LOOP) {
      audioRef.current.addEventListener("ended", playCurrentAgain);

      return;
    }
    audioRef.current.addEventListener("ended", playNextMusic);

    return () => {
      if (playMode === MODE_PLAY.SINGLE_LOOP) {
        audioRef.current.removeEventListener("ended", playCurrentAgain);

        return;
      }
      audioRef.current.removeEventListener("ended", playNextMusic);
    };
  }, [playNextMusic, playMode, mPlayingMusic]);

  const playCurrentMusic = () => {
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.play();
  };

  return (
    <div className={classes.MusicPlayer}>
      <div>
        <div className={classes.MusicTitleBox}>
          <h1 className={classes.MusicPlayAudioTitle}>{playingMusic}</h1>
        </div>

        <AudioPlayer
          key={mPlayingMusic}
          ref={audioRef}
          mPlayingMusic={mPlayingMusic}
        />
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

        <button
          className={`${classes.ChangePlayModeButton} ${classes.Button}`}
          onClick={() => {
            if (playMode === MODE_PLAY.SINGLE_LOOP) {
              setPlayMode(MODE_PLAY.ORDER);
            } else {
              setPlayMode(MODE_PLAY.SINGLE_LOOP);
            }
          }}
        >
          {playMode === MODE_PLAY.SINGLE_LOOP ? `one loop` : `order`}
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
