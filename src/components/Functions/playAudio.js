export default function playAudio(answer, streak, streakCorrect) {
  const audioNr = String(Math.floor(Math.random() * 8) + 1).padStart(2, "0");
  const audioStreakNr = String(Math.floor(Math.random() * 8) + 1).padStart(2,"0");
  const correctAudioRef = `/src/assets/sounds/correct${audioNr}.mp3`;
  const wrongAudioRef = `/src/assets/sounds/wrong${audioNr}.mp3`;
  const correctStreakAudioRef = `/src/assets/sounds/correctstreak${audioStreakNr}.mp3`;
  const wrongStreakAudioRef = `/src/assets/sounds/wrongstreak${audioStreakNr}.mp3`;

  answer ? new Audio(correctAudioRef).play() : new Audio(wrongAudioRef).play();
  
  if (streak) {
      setTimeout(() => {
          streakCorrect == "correct" ? new Audio(correctStreakAudioRef).play() : new Audio(wrongStreakAudioRef).play();
        }, 2000); 
     
  }

}

  