import React, { createContext, useEffect, useState } from "react";

export const myContext = createContext();

function Context(props) {
  const [linksHeight, setLinksHeight] = useState(() => {
    if (window.innerWidth < 601) return "h-0";
    else return "h-full";
  });

  const data = [
    {
      name: "Chal Wahan Jaate Hain",
      creator: "Arijit Singh",
      photo: "Chal wahaan jaate hai.jpg",
      path: "Chal Wahaan Jaate Hain.mp3",
    },
    {
      name: "Ek Mulakaat",
      creator: "Arijit Singh",
      photo: "src/assets/Photos/Ek mulakaat.jpg",
      path: "src/assets/Songs/Ek Mulakaat.mp3",
    },
    {
      name: "Girl I need You",
      creator: "Arijit Singh",
      photo: "src/assets/Photos/Girl I Need You.jpg",
      path: "src/assets/Songs/Girl I Need You.mp3",
    },
  ];

  const play = [];

  const [queue, setQueue] = useState([
    {
      name: "Chal Wahan Jaate Hain",
      creator: "Arijit Singh",
      photo: "Chal wahaan jaate hai.jpg",
      path: "Chal Wahaan Jaate Hain.mp3",
    },
    {
      name: "Ek Mulakaat",
      creator: "Arijit Singh",
      photo: "src/assets/Photos/Ek mulakaat.jpg",
      path: "src/assets/Songs/Ek Mulakaat.mp3",
    },
    {
      name: "Girl I need You",
      creator: "Arijit Singh",
      photo: "src/assets/Photos/Girl I Need You.jpg",
      path: "src/assets/Songs/Girl I Need You.mp3",
    },
  ]);

  const addToPlayList = (pName) => {
    setPlaylists((prevPlay) => {
      return prevPlay.map((c, i) => {
        if (pName === c.playlistName)
          return {
            ...c,
            songs: [...c.songs, add],
          };
        else return c;
      });
    });
    setAdd(false);
  };

  const removePlaylist = (name) => {
    setPlaylists(playlists.filter((item) => item.playlistName != name));
  };

  const removeSong = (name, from) => {
    setPlaylists(
      playlists.map((p) => {
        if (p.playlistName == from) {
          const arr = p.songs.filter((song) => song.name !== name);
          console.log(p);
          return { ...p, songs: arr };
        } else return p;
      })
    );
  };

  const [add, setAdd] = useState(false);
  const [songs, setSongs] = useState(() => {
    const storedData = localStorage.getItem("allSongs");
    return storedData ? JSON.parse(storedData) : data;
  });

  const [playlists, setPlaylists] = useState(() => {
    const storedData = localStorage.getItem("allPlaylists");
    return storedData ? JSON.parse(storedData) : play;
  });

  useEffect(() => {
    localStorage.setItem("allSongs", JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    localStorage.setItem("allPlaylists", JSON.stringify(playlists));
  }, [playlists]);

  return (
    <myContext.Provider
      value={{
        songs,
        setSongs,
        playlists,
        setPlaylists,
        add,
        setAdd,
        addToPlayList,
        removePlaylist,
        removeSong,
        linksHeight,
        setLinksHeight,
        queue,
        setQueue,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
}

export default Context;
