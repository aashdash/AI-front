import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../components/context";
import axios from "axios";

const Video = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const [videoInfo, setVideoInfo] = useState([]);
  const {updateFlag, setUpdateFlag, toggleScript, setActiveScript} = useAppContext() 

  useEffect(() => {
    const openDB = indexedDB.open("VideoDB", 1);
    openDB.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("videos")) {
        db.createObjectStore("videos", { keyPath: "name" });
      }
    };
    openDB.onsuccess = () => {
      const db = openDB.result;
      const transaction = db.transaction("videos", "readonly");
      const store = transaction.objectStore("videos");
      const request = store.getAll();
      request.onsuccess = () => setVideoInfo(request.result);
    };
  }, []);

  const storeVideoMetadata = (metadata) => {
    const openDB = indexedDB.open("VideoDB", 1);
    openDB.onsuccess = () => {
      const db = openDB.result;
      const transaction = db.transaction("videos", "readwrite");
      const store = transaction.objectStore("videos");
      
      store.put(metadata).onsuccess = () => {
        const fetchTransaction = db.transaction("videos", "readonly");
        const fetchStore = fetchTransaction.objectStore("videos");
        const request = fetchStore.getAll();
        request.onsuccess = () => {
          setVideoInfo(request.result); 
        }
      }
    }
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setIsVideoPlaying(true);
  
      const videoElement = document.createElement("video");
      videoElement.src = url;
  
      videoElement.onloadedmetadata = () => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const blob = new Blob([reader.result], { type: file.type });
  
          const newMetadata = {
            name: file.name,
            lastopened: Date.now(),
            size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
            location: "Local",
            blob: blob, 
          }
  
          setVideoInfo((prev) => {
            const filterVideos = prev.filter((video) => video.name !== file.name);
            return [newMetadata, ...filterVideos];
          })
          setUpdateFlag(!updateFlag);
          storeVideoMetadata(newMetadata);
        };
      };
    }
  };
  
  

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  useEffect(() => {
    if (videoUrl) {
      handleFullScreen(); 
    }
  }, [videoUrl]);

  
  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsVideoPlaying(false);
        setVideoUrl(null);
        stopScript("handyvideo");
        stopScript("voicevideo");
      }
    }
  
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);
  
  const handleKeyPress = async (event) => {
    if (event.key === "Escape") {
      await stopScript("handyvideo");
      await stopScript("voicevideo");
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setIsVideoPlaying(false);
      setVideoUrl(null)
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      
    };
  }, []);

  const stopScript = async (scriptType) => {
    await axios.post('http://localhost:5000/toggle-gesture', {
      toggle: false,
      scriptType,
    });
    setActiveScript(null);
    console.log(`Stopped ${scriptType}`);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl ">
      {!isVideoPlaying && (
        <>
        <input
          type="file"
          accept="video/mp4,video/webm,video/ogg,video/x-matroska"
          onChange={handleFileChange}
          className="w-[350px] h-64 border opacity-0 z-10 border-gray-900 rounded-2xl cursor-pointer"
        />
        {/* <div className="absolute w-[350px] h-64 inset- flex items-center justify-center bg-gray-300 text-gray-700 rounded-2xl">
        </div> */}
        </>
      )}

      {videoUrl && isVideoPlaying && (
        <div className="relative bg-black">
          <video
            ref={videoRef}
            controls
            autoPlay
            className='w-full h-full'
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/ogg" />
            <source src={videoUrl} type="video/x-matroska" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default Video;
