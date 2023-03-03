import classes from "./AudioPlayer.module.sass";
import { useEffect, forwardRef } from "react";

const AudioPlayerForwardRef = forwardRef(function AudioPlayer(
  { mPlayingMusic },
  ref
) {
  useEffect(() => {
    ref.current.pause();
    ref.current.load();
    ref.current.play();
  }, []);
  return (
    <audio className={classes.MusicPlayAudio} controls ref={ref}>
      <source src={mPlayingMusic} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
});

export default AudioPlayerForwardRef;
