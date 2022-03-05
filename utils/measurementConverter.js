import parseIngredient from 'parse-ingredient';


const measurementConverter = (recipe) => {
    // console.log('recipe: ', recipe)

    const tracker = {
        empty: 0,
        number: 0,
        isStrings: false,
        strings: []
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
        else (
            tracker.strings.push(parsedIng[0])
        )

    });
    let chartData;
    const prepareDataForChart = () => {
        console.log('strings: ', tracker.strings)
        const ings = tracker.strings

        const hashTable = {
            string: '',
            areStringsSame: true
        }
        
        ings.forEach(i => {

            if (i.unitOfMeasure) {
                if (hashTable.string && i.unitOfMeasure !== hashTable.string) {
                    hashTable.areStringsSame = false
                    return
                }
                else hashTable.string = i.unitOfMeasure
            }

            if (!i.unitOfMeasure && i.description) {

            }

            if (i.quantity && !i.quantity2) {

            }

            if (i.quantity && i.quantity2) {

            }

        })

        if (hashTable.areStringsSame) {
            chartData = tracker.strings.map(i => i.quantity)
        }
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
    
    console.log('final chart data: ',chartData)
    return chartData
}

export default measurementConverter