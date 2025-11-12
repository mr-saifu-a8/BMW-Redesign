import React from 'react'

const Video = () => {
  return (
    <div className="w-full h-[70vh]">
      <video
        src="/src/assets/video/light-01-stage-hd_compressed (1) - Compressed with FlexClip.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      ></video>
    </div>
  );
}

export default Video
