import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useFetch } from '../../hooks/productsHook';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  priceContent: {
    padding: '10px',
    width: '100%',
  }
}));

export default function ProductsMain() {
  const classes = useStyles();

  const [query, setQuery] = useState('');

	const url = query && `test + ${query}`;

	const { status, data, error } = useFetch(url);

	const handleSubmit = (e) => {
		e.preventDefault();

		const query = e.target.search.value;
		if (query) {
			setQuery(query);
			e.target.search.value = '';
		}
  };
  
  const products = data;


  return (
      <React.Fragment>
        { products != null &&
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid item key={Math.random()} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.cardMedia}
                                image="https://source.unsplash.com/featured/?coffee"
                                title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                  <Typography gutterBottom variant="h5" component="h2">
                                      {product.name}
                                  </Typography>
                                  <Typography>
                                      {product.shortDescription}
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  <Typography className={classes.priceContent}>
                                      ${product.price}
                                  </Typography>
                                  <Button size="small" color="primary">
                                      Details
                                  </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        }
   </React.Fragment>
  );
}
