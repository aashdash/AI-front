import React, { useEffect, useState } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { useAppContext } from "./context";
import axios from "axios";

const Section3 = () => {
  const [videoInfo, setVideoInfo] = useState([]);
  const { updateFlag, setUpdateFlag,toggleScript, setActiveScript, activeScript } = useAppContext();
  const [playingVideo, setPlayingVideo] = useState(null);

  const fetchVideos = () => {
    const openDB = indexedDB.open("VideoDB", 1);

    openDB.onsuccess = () => {
      const db = openDB.result;
      const transaction = db.transaction("videos", "readonly");
      const store = transaction.objectStore("videos");
      const request = store.getAll();

      request.onsuccess = () => {
        const sortedVideos = [...request.result].sort((a, b) => b.lastopened - a.lastopened);
        setVideoInfo([...sortedVideos]);
      };
    };
  };

  useEffect(() => {
    fetchVideos();
  }, [updateFlag]);

  const handleDelete = (name) => {
    const openDB = indexedDB.open("VideoDB", 1);

    openDB.onsuccess = () => {
      const db = openDB.result;
      const transaction = db.transaction("videos", "readwrite");
      const store = transaction.objectStore("videos");
      store.delete(name);

      transaction.oncomplete = () => {
        setUpdateFlag(!updateFlag);
      };
    };
  };

  const handlePlay = (videoName) => {
    const openDB = indexedDB.open("VideoDB", 1);
  
    openDB.onsuccess = () => {
      const db = openDB.result;
      const transaction = db.transaction("videos", "readwrite"); 
      const store = transaction.objectStore("videos");
      const request = store.get(videoName);
  
      request.onsuccess = () => {
        const videoData = request.result;
        if (videoData) {
          videoData.lastopened = Date.now();
          store.put(videoData).onsuccess = () => {
            setUpdateFlag((prev) => !prev)
          }
  
          const blobUrl = URL.createObjectURL(videoData.blob);
          setPlayingVideo(blobUrl);
  
          setTimeout(() => {
            const videoElement = document.getElementById("playingVideo");
            if (videoElement) {
              if (videoElement.requestFullscreen) {
                videoElement.requestFullscreen();
              } else if (videoElement.mozRequestFullScreen) {
                videoElement.mozRequestFullScreen();
              } else if (videoElement.webkitRequestFullscreen) {
                videoElement.webkitRequestFullscreen();
              } else if (videoElement.msRequestFullscreen) {
                videoElement.msRequestFullscreen();
              }
            }
          }, 100);
        }
      };
    };
  };
  
  

  const handleKeyPress = async (event) => {
      if (event.key === "Escape") {
        await stopScript("handyvideo");
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        setPlayingVideo(null)
      }
    }
    useEffect(() => {
      const handleFullScreenChange = () => {
        if (!document.fullscreenElement) {
          setPlayingVideo(null);
        }
      }
    
      document.addEventListener("fullscreenchange", handleFullScreenChange);
      return () => {
        document.removeEventListener("fullscreenchange", handleFullScreenChange);
      };
    }, []);
    
  
    useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
  
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
        
      };
    }, []);

    const formatLastOpened = (timestamp) => {
      const date = new Date(timestamp);
      const now = new Date();
      
      const diffTime = now - date;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
      if (diffDays === 0) {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" , hour12:false})
      } else if (diffDays === 1) {
        return "Yesterday"; 
      } else if (diffDays <= 5) {
        return date.toLocaleDateString([], { weekday: "long" }); 
      } else if (diffDays <= 30) {
        return date.toLocaleDateString([], { month: "short", day: "numeric" })
      } else {
        return date.toLocaleDateString([], { month: "short", year: "numeric" })
      }
    };

  
  const startScript = async (videoName) => {
    
     // Example: assuming `selectedScriptType` is stored in state
    const selectedScript = activeScript; // or get from state/prop
    await setActiveScript(null);
    
    if (!selectedScript) {
      alert("Please choose either 'voiceppt' or 'voicevideo'");
      return;
    }

    if (selectedScript === 'handyppt' || selectedScript === 'voiceppt') {
      await axios.post('http://localhost:5000/toggle-gesture', {
        toggle: false,
        scriptType: selectedScript,
      }).catch(err => console.log(`No ${selectedScript} running`));

      alert("Please choose the correct one -> either 'voiceppt' or 'voicevideo'");
      return;
    }

    // Start voiceppt or voicevideo
    if (selectedScript === 'handyvideo' || selectedScript === 'voicevideo'){
      await axios.post('http://localhost:5000/toggle-gesture', {
        toggle: true,
        scriptType: selectedScript,
      });
      handlePlay(videoName);
      console.log(`Started ${selectedScript}`);
    }
  }

   const stopScript = async (scriptType) => {
    await axios.post('http://localhost:5000/toggle-gesture', {
      toggle: false,
      scriptType,
    });
    setActiveScript(null);
    console.log(`Stopped ${scriptType}`);
  };

  return (
    <div className="h-full w-full bg-green-5  dark:bg-black dark:text-white">
      <div className="h-8 bg-amber50">
        <p className="font-sans text-xl font-medium">Recent</p>
      </div>
      <div className="h-10 w-full bg-yellow200 flex flex-row items-center gap-16">
        <p className="ml-0.5 w-48 font-sans text-lg font-normal">Name</p>
        <p className="font-sans text-lg font-normal">Last opened</p>
        <p className="font-sans text-lg font-normal ml-2">Size</p>
        <p className="font-sans text-lg font-normal ml-2">Location</p>
      </div>

      <div className="bg-whit overflow-auto scrollbar-hide h-[515px]" >
      {videoInfo.length > 0 ? (
        videoInfo.map((video) => (
          <div
            key={video.name}
            className="h-10 w-full bg-yellow200  flex flex-row items-center"
          >
            <p
              className="bg-gray500 ml-1.5 w-56 truncate font-sans text-[17px] leading-normal font-ligh cursor-pointer text-blue-5 hover:underlin"
              onClick={() => { startScript(video.name) }}
            >
              {video.name}
            </p>
            <p className="bg-gray500 ml-10 w-32 font-sans text-[17px] leading-normal font-light">
            {formatLastOpened(video.lastopened)}            </p>
            <p className="bg-gray500 ml-3 w-32 font-sans text-[17px] leading-normal font-light">
              {video.size}
            </p>
            <p className="bg-gray500 w-20 font-sans text-[17px] leading-normal font-light">
              {video.location}
            </p>
            <div className="cursor-pointer" onClick={() => handleDelete(video.name)}>
              <FiMinusCircle className="w-6 h-6 text-red-500 hover:text-red-700" />
            </div>
          </div>
        ))
      ) : (
        <p className="text-red-500"></p>
      )}
      </div>

      {playingVideo && (
        <div className="relative bg-black mt-4 w-full h-full">
          <video id="playingVideo" controls autoPlay className="w-full h-full">
            <source src={playingVideo} type="video/mp4" />
            <source src={playingVideo} type="video/webm" />
            <source src={playingVideo} type="video/ogg" />
            <source src={playingVideo} type="video/x-matroska" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default Section3;
