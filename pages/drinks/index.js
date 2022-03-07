import { useState, useEffect } from "react";
import useSWR from "swr";
import Link from 'next/link'
import styles from '../../styles/drinks.module.css'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useThirsty } from "../../context/main-data";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Example() {
  // const [drinkQuery, setDrinkQuery] = useState('')
  // const [drink, setDrink] = useState('')

  const { drinkQuery, setDrinkQuery, drink, setDrink } = useThirsty()

  // Do not fetch until drink value changes.
  const { data, error } = useSWR(
    drink ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}` : null,
    fetcher
  );

  const handleChange = (e) => {
    setDrinkQuery(e.target.value);
  };

  useEffect(() => {
    const makeTheDrink = () => {
      setDrink(drinkQuery);
    }

    if (drink !== drinkQuery) makeTheDrink()

  }, [drinkQuery, drink]);

  const displayEmptyRows = (rows) => {

    const emptyRows = []

    for(let i = 0; i < rows; i++){
        emptyRows.push(<div className={styles.gridItem}></div>)
    }

      return emptyRows.map(row => {
        return (
          <div className={styles.gridItem} key={emptyRows.indexOf(row)+'empty-row'}>
          </div>
        )
    })

  }

  return (
    <div className={styles.gridContainer}>
      <div className={styles.title}>Thirsty</div>
      <Input
        disableUnderline={true}
        className={styles.searchbar} 
        onChange={handleChange} 
        value={drinkQuery} 
        placeholder='Find a drink'
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position='start'>
            <CancelIcon sx={{ color: "#8e8e93" }}/>
          </InputAdornment>
        }
      />
      <span className={styles.divider}></span>
      { error && <div>failed to load</div> }
      <div className="resultsGrid">
        { data && data.drinks && 
            data.drinks.map(drink => {
              return (
                <div className={styles.gridItem} key={drink.strDrink}>
                  <img className={styles.thumbnail} src={drink.strDrinkThumb} alt='drink'/>
                  <div className={styles.drinkname}><Link
                    href={{
                      pathname: `drinks/${drink.strDrink}`,
                      query: drink
                    }} 
                    passHref
                  >
                    <span>{drink.strDrink}</span>
                  </Link>
                  </div>
                  <ArrowForwardIosIcon sx={{ color: "#b9b9b9" }} className={styles.arrow}/>
                </div>
              )
          })
        }
        {
          data && data.drinks && data.drinks.length < 12 ? displayEmptyRows(12 - data.drinks.length) : null
        }
      </div>
    </div>
  )
}