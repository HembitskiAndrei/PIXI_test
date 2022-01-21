export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const generatePositionsArray = (maxX, maxY, safeRadius, irregularity) => {
    const positionsArray = [];
    let rows;
    let columns;
    rows = Math.floor(maxY / safeRadius);
    columns = Math.floor(maxX / safeRadius);
    for (let r = 1; r <= rows; r += 1) {
        for (let c = 1; c <= columns; c += 1) {
            positionsArray.push({
                x: Math.round(maxX * c / columns) + getRandomInt(irregularity * -1, irregularity),
                y: Math.round(maxY * r / rows) + getRandomInt(irregularity * -1, irregularity)
            });
        }
    }

    return positionsArray;
}

export const getRandomPosition = (array, removeTaken) => {
    let randomIndex;
    let coordinates;

    randomIndex = getRandomInt(0, array.length - 1);
    coordinates = array[randomIndex];

    if (removeTaken) {
        array.splice(randomIndex, 1);
    }

    return coordinates;
}