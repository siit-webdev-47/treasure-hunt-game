function firstLetterCapital(input) {
    let newWord = input.charAt(0).toUpperCase() + input.slice(1)
    return newWord;
}

export default firstLetterCapital;