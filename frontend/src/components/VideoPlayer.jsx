import { useEffect, useRef } from 'react';
import Plyr from "plyr";
import 'plyr/dist/plyr.css';
import PropTypes from 'prop-types';

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'settings',
          'fullscreen'
        ],
        settings: ['quality', 'speed'],
        quality: {
          default: 1080,
          options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
        },
        speed: {
          selected: 1,
          options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
        }
      });

      return () => {
        player.destroy();
      };
    }
  }, [videoRef]);

  return (
    <div className="w-full aspect-video">
      <video ref={videoRef} className="plyr w-full h-auto" controls autoPlay>
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

VideoPlayer.propTypes = {
    videoUrl: PropTypes.string.isRequired,
}

export default VideoPlayer;