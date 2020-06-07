import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 150,
    },
  });

const Product = ( { name, price, image_url, brand, stock, category } ) => {

    const classes = useStyles();
  
    return (
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
    )
}

export default Product;
