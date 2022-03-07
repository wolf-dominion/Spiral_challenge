import parseIngredient from 'parse-ingredient';


const measurementConverter = (recipe) => {
    console.log('recipe: ', recipe)
    let chartData;
    let filtered = [];
    const tracker = {
        empty: 0,
        number: 0,
        isStrings: false,
        strings: []
    }

    function convertUnitToFO(item) {
        // console.log('item: ', item)
        const { unitOfMeasure, quantity } = item
        unitOfMeasure = unitOfMeasure.toLowerCase()
        
        const conversionToOz = {
            oz: 1,
            ounce: 1,
            ounces: 1,
            jigger: 1.5,
            jiggers: 1.5,
            cup: 8.1,
            cups: 8.1,
            'cup/s': 8.1,
            tablespoon: 0.5,
            tablespoons: 0.5,
            tbsp: 0.5,
            tblsp: 0.5,
            teaspoon: 0.2,
            teaspoons: 0.2,
            tsp: 0.2,
            tumbler: 0.13,
            tumblers: 0.13,
            pony: 1,
            ponies: 1,
            cl: 3,
            centiliter: 3, 
            milliliter: 30,
            ml: 30,
            shot: 1.5,
            shots: 1.5
        }

        const unit = conversionToOz[unitOfMeasure]
        //console.log('unt: ', unit, 'quantity', quantity, unit * quantity)
        return quantity * unit
    }

    const parsedIngs = []

    recipe.forEach(ingredient => {
        const { name, measurement, color } = ingredient
        const parsedIng = parseIngredient(measurement || 'none', { normalizeUOM: true })
        parsedIng = parsedIng[0]

        if (!parsedIng.unitOfMeasure && !parsedIng.description) {
            parsedIng = {
                name,
                unitOfMeasure: null, 
                quantity: parsedIng.quantity,
                color
            }
        }

        if (parsedIng.unitOfMeasure && !parsedIng.description) {
            parsedIng = {
                name,
                unitOfMeasure: parsedIng.unitOfMeasure, 
                quantity: parsedIng.quantity,
                color
            }
        }

        if (!parsedIng.unitOfMeasure && parsedIng.description) {
            parsedIng = {
                name,
                unitOfMeasure: parsedIng.description, 
                quantity: parsedIng.quantity,
                color
            }
        }

        if (parsedIng.unitOfMeasure && parsedIng.description) {
            parsedIng = {
                name,
                unitOfMeasure: parsedIng.unitOfMeasure, 
                quantity: parsedIng.quantity,
                color
            }
        }
        
        parsedIngs.push(parsedIng)
    });

    console.log('parsed ins: ', parsedIngs)

    const hashTable = {
        string: '',
        areStringsSame: true,
        allQuantitiesNull: false
    }

    parsedIngs.forEach(ing => {
            if (ing.unitOfMeasure) {
                if (hashTable.string && ing.unitOfMeasure !== hashTable.string) {
                    hashTable.areStringsSame = false
                    return
                }
                else hashTable.string = ing.unitOfMeasure
            }

            if (!ing.unitOfMeasure && hashTable.string) hashTable.areStringsSame = false

            if (!ing.quantity) {
                hashTable.allQuantitiesNull = true
            }

    })

    function doesItHaveValidUnit(unit) {
        const validUnits = ['cup', 'oz', 'tbsp', 'tsp', 'teaspoon', 'ml', 'shots', 'shot', 'jigger', 'jiggers', 'ounce', 'cl']
        return validUnits.includes(unit ? unit.toLowerCase() : unit)
    }

    //console.log('hashtable: ', hashTable)
    if (hashTable.areStringsSame) {
        chartData = parsedIngs.map(i => { 
            const chartInfo = {
                quantity,
                color
            }
            return chartInfo
        })
    } else {
        filtered = parsedIngs.filter(i => {
            return i.unitOfMeasure !== 'none' && doesItHaveValidUnit(i.unitOfMeasure)
        })

        //console.log('filtered: ', filtered)

        if (filtered.length === 0 && hashTable.allQuantitiesNull) {
            const ings = parsedIngs.filter(i => {
                if (i.unitOfMeasure === 'none') {
                    return i
                }
            })
            chartData = ings.map(i => {
                const chartInfo = {
                    quantity: 1,
                    color
                }
                return chartInfo
            })
        }

        if (!hashTable.areStringsSame && !hashTable.allQuantitiesNull && filtered.length >= 1) {
            const convertedChartData = filtered.map(i => {
                const chartInfo = {
                    quantity: convertUnitToFO(i),
                    color: i.color
                }
                return chartInfo
            })
            //console.log('filtered ingredient: ', convertedChartData)
            chartData = convertedChartData
        }

    }

    console.log('chartdata: ', chartData);
    
    return chartData || [1, 2, 3]
}

export default measurementConverter