"use client";

import React from "react";
import videoFile from "../assets/video/light-01-stage-hd_compressed (1) - Compressed with FlexClip.mp4";

const Video = () => {
  return (
    <div className="w-full h-screen pt-15">
      <video
        src={videoFile}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      ></video>
    </div>
  );
};

export default Video;
