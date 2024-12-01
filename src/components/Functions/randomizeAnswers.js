function randomizeAnswers (trueA, falseA) {
    let listAnsw = [];
    listAnsw.push(trueA);
    for (let index = 0; index < falseA.length; index++) {
        listAnsw.push(falseA[index]);
    }
    
    let newIndex = Math.floor(Math.random() * 4);
    let aux = listAnsw[0];
    listAnsw[0] = listAnsw[newIndex];
    listAnsw[newIndex] = aux;

    return listAnsw;
}
export default randomizeAnswers;