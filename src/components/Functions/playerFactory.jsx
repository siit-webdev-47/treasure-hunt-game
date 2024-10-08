const playerFactory = (playerName = "Anony Moose", playerEnergy = 15) => ({
    playerName,
    playerEnergy,
    get playerAvatar() {
      return `https://api.dicebear.com/9.x/micah/svg?seed=${this.playerName}`;
    }
  });

  export default playerFactory;