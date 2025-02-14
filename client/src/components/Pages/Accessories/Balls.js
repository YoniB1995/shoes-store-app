import Card from "../../Feauters/Cards/Cards";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {getAccessories} from '../../../Service/productService';

export default function Balls() {

    const [accessories,setAccessories] = useState([]);

    useEffect(()=>{
        getAccessories().then((res)=>{setAccessories(res.filter((a)=>{
            return a.group === "Balls"
        }))})
        
    },[])



  return (<main style={{ marginTop: "85px" }}>
  <Grid container spacing={15}>

    {accessories.map((product) => (
      <Grid item key={product._id} md={3}>
         <Link to={`/Accessorie/${product._id}`}> <Card product={product} /></Link>
      </Grid>
    ))}
  </Grid>
</main>);
}