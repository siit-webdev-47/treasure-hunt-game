function generateYield(difficulty) {
    switch (difficulty) {
        case 'easy':
            return Math.floor(Math.random() * 3) + 1;
        case 'medium':
            return Math.floor(Math.random() * 3) + 4;
        case 'hard':
            return Math.floor(Math.random() * 3) + 7;
    }
}

export default generateYield;