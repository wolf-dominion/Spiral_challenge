const measurementConverter = (recipe) => {

    console.log('recipe: ', recipe)

    const tracker = {
        empty: 0,
        number: 0,
        strings: []
    }

    const numbers = /^[0-9]+$/;

    const convertedRecipe = recipe.map(ingredient => {
        const ms = ingredient.measurement
        if (ms === '') {
            tracker.empty = tracker.empty + 1
        }
        // check if ingredients are simply numbers, nothing else in string
        if (!isNaN(ms) && !isNaN(parseFloat(ms))) {
            tracker.number = tracker.number + 1
        }

        // check if ms is a string that needs further analysis
        else tracker.strings.push(ms)

    });

    if (tracker.empty === recipe.length) {
        console.log('All ingredients can be divided evenly, 1 / recipe.length')
    }

    if (tracker.number === recipe.length) {
        console.log('All measuremets can be sent into chart')
    }

    console.log('tracker: ', tracker)

    // function to interpret the strings, if there are strings we want to just interpret those since
    // they can't be compared to empty or unit-less numbers

    // determine if it contains only a number and measurement

    // determine if it contains only fraction
    // determine if it contains only fraction plus measurements ex. 1/2 cup
    
    // determine if it contains only a range 1-2
    // determine if it contains only a fraction range 1/3 - 1/4
    // determine if it contains num and fraction range 1 - 1 1/2
    // determine if it contains a num range with measurement 1-2 tsp
    // determine if it contains a fraction range with measurement 1/4-1/2 cups


    // determine if it contains number plus measurment ex. 2 oz
    // determine if it contains

    // once each string is compared, we then need to determine: 

    // if all ingredients have the same measurment units

    // if they do not have same units, determine which ingredients can be converted 
    // and which ones will not be sent to chart

    const interpretStrings = () => {
        
    }

    if (tracker.strings.length > 0) {
        interpretStrings()
    }
}

export default measurementConverter