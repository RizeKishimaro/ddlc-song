import React, { useEffect, useState } from "react";
import "./App.css";
import DiagonalInfiniteDots from "./components/diagonal-infinite-dots";
import YourReality from "../public/out.mp3"




const lyricsWithTiming = [
  { time: 10, text: "Every day", interval: 1 },
  { time: 12, text: "I imagine a future, where I can be with you", interval: 3 },
  { time: 19, text: "In my hand", interval: 1 },
  { time: 21, text: "is a pen that'll write a poem, of me and you", interval: 3 },
  { time: 28, text: "The ink flows down into a dark puddle", interval: 3 },
  { time: 32, text: "Just move your hand", interval: 1 },
  { time: 34, text: "write the way into his heart", interval: 2 },
  { time: 37, text: "But in this world of infinite choices", interval: 3 },
  { time: 41, text: "What will it take just to find", interval: 2 },
  { time: 44, text: "that special day?", interval: 1 },
  { time: 46, text: "What will it take just to find", interval: 2 },
  { time: 49, text: "that special day?", interval: 1 },
  { time: 60, text: "Have I found", interval: 1 },
  { time: 62, text: "everybody a fun assignment", interval: 2 },
  { time: 64, text: "to do today?", interval: 1 },
  { time: 69, text: "When you're here", interval: 1 },
  { time: 71, text: "everything that we do is fun", interval: 2 },
  { time: 73, text: "for them anyway", interval: 1 },
  { time: 78, text: "When I can't even read my own feelings", interval: 3 },
  { time: 82, text: "What good are words", interval: 1 },
  { time: 84, text: "when a smile says it all?", interval: 2 },
  { time: 87, text: "And if this world won't write me an ending", interval: 3 },
  { time: 91, text: "What will it take just for me", interval: 2 },
  { time: 94, text: "to have it all?", interval: 1 },
  { time: 115, text: "Does my pen", interval: 1 },
  { time: 117, text: "only write bitter words for those", interval: 2 },
  { time: 119, text: "who are dear to me?", interval: 3 },
  { time: 124, text: "Is it love", interval: 1 },
  { time: 126, text: "if I take your 'is it love'", interval: 1 },
  { time: 128, text: "if I set you free?", interval: 3 },
  { time: 138, text: "The ink flows down into a dark puddle", interval: 2 },
  { time: 142, text: "How can I write", interval: 1 },
  { time: 145, text: "love into reality?", interval: 1 },
  { time: 147, text: "If I can't hear the sound of your heartbeat", interval: 3 },
  { time: 151, text: "What do you call", interval: 1 },
  { time: 153, text: "love in your reality?", interval: 2 },
  { time: 156, text: "And in your reality", interval: 2 },
  { time: 157, text: "if I don't know how to love you", interval: 2 },
  { time: 164, text: "I'll leave you be", interval: 3 },
];



function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLyric, setCurrentLyric] = useState("");
  const [fadeStyle, setFadeStyle] = useState(""); // Tailwind classes for fade effects
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    // Start the timer
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="relative min-h-screen bg-gray-800 text-black flex items-center justify-center">
      <DiagonalInfiniteDots ended={ended} /> {/* Background animation */}
      <div className="absolute text-center">
        <span
          className={`text-3xl lyric font-bold transform ${fadeStyle}`}
        >
          {currentLyric}
        </span>
      </div>
      <audio src={YourReality} onEnded={() => setEnded(true)} autoPlay className="hidden"></audio>
    </div>
  );
}

export default App;


