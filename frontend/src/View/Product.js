import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DialogUpdateProduct from './DialogUpdateProduct';
import DialogDeleteProduct from './DialogDeleteProduct';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 200,
    },
  });

const Product = ( { idStore, product, setProducts } ) => {

    const { name, price, image_url, brand, stock, category } = product;
    const classes = useStyles();
  
    return (
      <div>
        <Card className={classes.root}>
            <CardActionArea>
            <CardMedia
                className={classes.media}
                image={image_url}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
               <div> {brand} - </div>
               <div> {name} </div>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <p> Stock: {stock} </p>
                <p> Precio: ${price} </p>
                <p> Categoria: {category} </p>
                </Typography>    
            </CardContent>
            </CardActionArea>
        </Card>
        <DialogUpdateProduct idStore={idStore} product={product} setProducts={setProducts}/>
        <DialogDeleteProduct idProduct={product.id} setProducts={setProducts}/>
     </div>   
    ) 
}

export default Product;
