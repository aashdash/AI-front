import React, { useEffect } from "react";
import { useAppContext } from "../components/context";

const VideoPlayer = ({ videoUrl, onClose }) => {
  const {toggleScript} = useAppContext()
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        toggleScript("handyvideo")
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <video
        controls
        autoPlay
        className="w-full h-full"
        src={videoUrl}
        onEnded={onClose}
      />
    </div>
  );
};

export default VideoPlayer;