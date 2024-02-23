import React, { useContext, useRef, useState } from "react";
import { myContext } from "./Context";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { MdSkipNext, MdWidthFull } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";

function MobilePlayer() {
  const timeRef = useRef(null);
  const { queue, setQueue } = useContext(myContext);
  const [index, setIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const changeDuration = (val) => {
    timeRef.current.currentTime = val;
  };

  const nextSong = () => {
    if (queue.length - 1 > index) {
      setIndex((prev) => {
        return prev + 1;
      });
    } else setIndex(0);

    setTimeout(() => {
      timeRef.current.play();
      setPlaying(true);
    }, 200);
  };
  const prevSong = () => {
    if (index > 0)
      setIndex((prev) => {
        return prev - 1;
      });
    setTimeout(() => {
      timeRef.current.play();
      setPlaying(true);
    }, 200);
  };
  const playPause = () => {
    if (timeRef.current.paused) {
      timeRef.current.play();
      setPlaying(true);
    } else {
      timeRef.current.pause();
      setPlaying(false);
    }
  };
  setTimeout(() => {
    setDuration(timeRef.current.duration);
  }, 500);

  if (queue.length === 0)
    return (
      <div className="absolute flex items-center pl-5 w-full h-20 bg-black bottom-0 left-0 border-t-2 border-white">
        <h1 className="text-white">No Song in Queue</h1>
      </div>
    );
  else
    return (
      <div className={`absolute transition-all ease-in-out duration-500 text-white ${isFull?"justify-end h-full flex-col gap-6 pb-10":"justify-between h-20"} flex items-center px-5 w-full bg-gradient-to-br from-black via-zinc-900 to-black bottom-0 left-0 border-t-2 border-white`}>
        {isFull?<h1 onClick={()=>{setIsFull(false)}} className=" cursor-pointer text-lg absolute top-10 left-10"><FaAngleDown /></h1>:null}
        <div className={`${isFull?"w-full absolute top-[50%] transition-all ease-in-out duration-500 translate-y-[-50%] px-10 flex-col":""} items-center flex  gap-4  overflow-hidden`}>
          <div className={`${isFull?"h-64 w-64 rounded":"h-14 w-14 rounded-full"} transition-all ease-in-out duration-500 bg-red-400  overflow-hidden`}>
            <img onClick={()=>setIsFull(true)} src={queue[index].photo} alt="song" />
          </div>
          <h1 className={`${isFull?"text-xl":"hidden"} transition-all ease-in-out duration-500`}>{queue[index].name}</h1>
        </div>
        <audio
          ref={timeRef}
          onTimeUpdate={() => {
            setTime(timeRef.current.currentTime);
          }}
          src={queue[index].path}
        ></audio>

        <div className={`items-center gap-2 transition-all ease-in-out duration-500 ${!isFull && window.innerWidth<1000?"hidden":"flex"} ${isFull?"w-full":""}`}>
          <h1>
            {Math.floor(time / 60)}:{Math.floor(time % 60)}
          </h1>
          <input
            min={0}
            max={duration}
            type="range"
            value={time}
            onChange={(e) => {
              changeDuration(e.target.value);
            }}
            className={`inp h-1 transition-all ease-in-out duration-500 ${isFull?"w-full":"w-64"} bg-zinc-500 cursor-pointer`}
          />
          <h1>
            {Math.floor(duration / 60)}:{Math.floor(duration % 60)}
          </h1>
        </div>
        <div className=" flex gap-5 items-center">
          <button
            onClick={() => prevSong()}
            className="bg-zinc-500 text-black h-10 w-10 rounded-full flex items-center justify-center"
          >
            <MdSkipPrevious />
          </button>
          <button
            onClick={() => playPause()}
            className={`bg-zinc-500 text-black transition-all ease-in-out duration-500 ${isFull?"h-14 w-14":"h-10 w-10"}  rounded-full flex items-center justify-center`}
          >
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={() => nextSong()}
            className="bg-zinc-500 text-black h-10 w-10 rounded-full flex items-center justify-center"
          >
            <MdSkipNext />
          </button>
        </div>
      </div>
    );
}

export default MobilePlayer;
