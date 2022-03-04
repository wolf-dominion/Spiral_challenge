import parseIngredient from 'parse-ingredient';


const measurementConverter = (recipe) => {
    console.log('recipe: ', recipe)

    const tracker = {
        empty: 0,
        number: 0,
        strings: false
    }

    const parsedIngs = []

    recipe.forEach(ingredient => {
        const { name, measurement } = ingredient
        const parsedIng = parseIngredient(measurement || 'none')
        parsedIng[0]['name'] = name
        parsedIngs.push(parsedIng[0])

        if (measurement === '') {
            tracker.empty = tracker.empty + 1
        }
        // check if ingredients are simply numbers, nothing else in string
        if (!isNaN(measurement) && !isNaN(parseFloat(measurement))) {
            tracker.number = tracker.number + 1
        }
        else tracker.strings = true

    });

    const prepareDataForChart = () => {
        console.log('prepare data')
    }
    
    if (tracker.empty === recipe.length) {
        console.log('All ingredients can be divided evenly, 1 / recipe.length')
    }

    if (tracker.number === recipe.length) {
        console.log('All measuremets can be sent into chart')
    }

    else if (tracker.strings) {
        prepareDataForChart()
    }
    
    //console.log('parsed: ',parsedIngs)
    return ['1', '2', '3']
}

export default measurementConverter