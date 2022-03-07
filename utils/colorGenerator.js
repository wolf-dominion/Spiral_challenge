const colorGenerator = (length) => {
    const colors = []

    function getColor(numA, numB, numC) { 
        return "hsl(" + (360 * numA).toFixed(2) + ',' +
                (25 + 70 * numB).toFixed(2) + '%,' + 
                (85 + 10 * numC).toFixed(2) + '%)'
    }

    // get random non-repeating numbers, the length of the amount of ingredients
    const randomUnique = (range, count) => {
        let nums = new Set();
        while (nums.size < count) {
            nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1)/100);
        }
        return [...nums];

    }

    const randNums = randomUnique(100,length*3)
    console.log(randNums)
    for(let i = 0; i < length*3; i+=3) {
        colors.push(getColor(randNums[i], randNums[i+1], randNums[i+2]))
        console.log('lops', randNums[i], randNums[i+1], randNums[i+2])
    }

    return colors
  }

export default colorGenerator