const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const generatePositionsArray = (maxX, maxY, safeRadius, irregularity) => {
    // declarations
    const positionsArray = [];
    let r, c;
    let rows;
    let columns;
    // count the amount of rows and columns
    rows = Math.floor(maxY / safeRadius);
    columns = Math.floor(maxX / safeRadius);
    // loop through rows
    for (r = 1; r <= rows; r += 1) {
        // loop through columns
        for (c = 1; c <= columns; c += 1) {
            // populate array with point object
            positionsArray.push({
                x: Math.round(maxX * c / columns) + getRandomInt(irregularity * -1, irregularity),
                y: Math.round(maxY * r / rows) + getRandomInt(irregularity * -1, irregularity)
            });
        }
    }
    // return array
    return positionsArray;
}

export const getRandomPosition = (array, removeTaken) => {
    // declarations
    let randomIndex;
    let coordinates;
    // get random index
    randomIndex = getRandomInt(0, array.length - 1);
    // get random item from array
    coordinates = array[randomIndex];
    // check if remove taken
    if (removeTaken) {
        // remove element from array
        array.splice(randomIndex, 1);
    }
    // return position
    return coordinates;
}