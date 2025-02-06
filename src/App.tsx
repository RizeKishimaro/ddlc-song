import React, { useEffect, useState } from "react";
import "./App.css";
import DiagonalInfiniteDots from "./components/diagonal-infinite-dots";
import YourReality from "../public/perfect_cut.mp3"


const lyricsWithTiming = [
  { time: 2, text: "Happy anniversary pr my loving Ma ❤️", interval: 5 },
  { time: 9, text: "I wish you everything that brings you happiness today and always.", interval: 6 },
  { time: 17, text: "I feel so lucky to have you in my life.", interval: 6 },
  { time: 25, text: "I wish you the greatest happiness that can be in lot of love in this world.", interval: 6 },
  { time: 35, text: "You are my lover, partner and best friend forever. ❤️ ❤️", interval: 4 },
  { time: 40, text: "love you so much❤️ ❤️", interval: 10 },
  // { time: 40, text: "I will not give you up this time", interval: 6 },
  // { time: 47, text: "But darling, just kiss me slow", interval: 3 },
  // { time: 51, text: "Your heart is all I own", interval: 3 },
  // { time: 55, text: "And in your eyes you're holding mine", interval: 6 },
  // { time: 62, text: "Baby, I'm dancing in the dark", interval: 6 },
  // { time: 69, text: "With you between my arms", interval: 3 },
  // { time: 73, text: "Barefoot on the grass", interval: 3 },
  // { time: 77, text: "Listening to our favourite song", interval: 3 },
  // { time: 80, text: "When you said you looked a mess", interval: 3 },
  // { time: 83, text: "I whispered underneath my breath", interval: 5 },
  // { time: 88, text: "But you heard it,", interval: 5 },
  // { time: 90, text: "Darling, you look perfect tonight", interval: 6 },
];




function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLyric, setCurrentLyric] = useState("");
  const [fadeStyle, setFadeStyle] = useState(""); // Tailwind classes for fade effects
  const [ended, setEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Track if the song is playing
  const [audio] = useState(new Audio(YourReality)); // Initialize audio object

  useEffect(() => {
    // Start the timer
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const lyric = lyricsWithTiming.find((item) => item.time === currentTime);
    if (lyric) {
      setCurrentLyric(lyric.text);

      // Apply fade-in style
      setFadeStyle("opacity-100 translate-y-0 transition duration-500");

      // Remove the lyric after its interval
      setTimeout(() => {
        setFadeStyle("opacity-0 translate-y-2 transition duration-500");
      }, lyric.interval * 1000);

      // Clear the lyric completely after fade-out
      setTimeout(() => setCurrentLyric(""), lyric.interval * 1000 + 500); // Add transition time
    }
  }, [currentTime]);

  const handlePlay = () => {
    setIsPlaying(true);
    audio.play(); // Start playing the song
  };

  return (
    <div className="relative min-h-screen bg-gray-800 text-black flex items-center justify-center">
      {!isPlaying && (
        <div className="absolute text-center text-white">
          <h1 className="text-4xl font-bold">Happy Anniversary Par Ma ❤️</h1>
          <p className="text-2xl mt-4">By Kg Myat Moe</p>
          <button
            onClick={handlePlay}
            className="mt-6 px-8 py-3 bg-pink-500 text-white font-bold text-lg rounded-full hover:bg-pink-600"
          >
            Play Song
          </button>
        </div>
      )}

      {isPlaying && (
        <>
          <DiagonalInfiniteDots ended={ended} /> {/* Background animation */}
          <div className="absolute text-center">
            <span
              className={`text-3xl lyric font-bold transform ${fadeStyle}`}
            >
              {currentLyric}
            </span>
          </div>
        </>
      )}
      <audio
        src={YourReality}
        onEnded={() => setEnded(true)}
        autoPlay={false} // Don't autoplay directly; play manually with the button
        className="hidden"
      ></audio>
    </div>
  );
}

export default App;
