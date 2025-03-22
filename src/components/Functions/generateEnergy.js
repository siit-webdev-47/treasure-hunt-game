function generateEnergy(difficulty) {
    switch (difficulty) {
        case 'easy':
            return Math.floor(Math.random() * 2) + 1;
        case 'medium':
            return Math.floor(Math.random() * 2) + 3;
        case 'hard':
            return Math.floor(Math.random() * 2) + 5;
    }
}

export default generateEnergy;