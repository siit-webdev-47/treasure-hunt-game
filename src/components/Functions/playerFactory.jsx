const playerFactory = (playerName = "Anony Moose", playerEnergy = 15) => ({
    playerName,
    playerEnergy,
    playerResponses:{
      easyCorrect: 0,
      easyWrong: 0,
      mediumCorrect: 0,
      mediumWrong: 0,
      hardCorrect: 0,
      hardWrong: 0,
    },
    consecutiveAnswers: {
    number: 0,
    correct: true,
    },
    get playerAvatar() {
      return `https://api.dicebear.com/9.x/micah/svg?seed=${this.playerName}`;
    }
  });

  export default playerFactory;