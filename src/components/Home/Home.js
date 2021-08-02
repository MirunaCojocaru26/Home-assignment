import { Button, Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState} from "react";
import Post from "../Post/Post";
import Pagination from '@material-ui/lab/Pagination';
import style from '../style'

const useStyles = makeStyles(style);
const sort = ['Sort A-Z', 'Sort Z-A', 'Restore']

export default function Home() {
  const [data, setData] = useState()
  const [dataPage, setDataPage] = useState()
  const [buttonPress, setButtonPress] = useState(0) 
  const [page, setPage] = useState(1)
  const classes = useStyles();

  const handleSortingClick = () => {
    if(buttonPress === 0)
    {
      setData(data.sort((a, b) => (a.title > b.title) ? 1 : -1));
      setButtonPress(buttonPress + 1)
    }
    else
    if(buttonPress === 1)
    {
      setData(data.sort((a, b) => (a.title < b.title) ? 1 : -1));
      setButtonPress(buttonPress + 1)
    }
    else
    {
      setData(data.sort((a, b) => (a.id > b.id) ? 1 : -1));
      setButtonPress(0)
    }
    setDataPage(data.filter((_, nr)=> nr >= (page-1)*20 && nr < page*20 ))
  }

  const handleChangePage = (_, value) => {
    setPage(value)
    setDataPage(data.filter((_, nr)=> nr >= (value-1)*20 && nr < value*20 ))
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then((jsonData) => {
      setData(jsonData)
      setDataPage(jsonData.filter((_, nr)=> nr < 20 ))
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  return<>
    <Grid container spacing={3}>
      <Grid item container  justifyContent='flex-start' alignContent='center' xs={12} md={6} lg={6}>
        <Button onClick={handleSortingClick} variant="contained" className={classes.button}>{sort[buttonPress]}</Button>
      </Grid>
      <Grid item container  justifyContent='flex-end' alignContent='center' xs={12} md={6} lg={6}>
        <Pagination count={data?.length/20} size="large" page={page} onChange={handleChangePage} />
      </Grid>
    
      {dataPage?.map((post, nr) => 
        <Grid key={nr} item xs={12} md={6} lg={3}>
          <Post component={post}/>
        </Grid>)}
    </Grid>;
  </>
   
}
