import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import "./productcard.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { useState, useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
}));

export default function ProductCard({ product, onDeleteProduct }) {
    const navigate = useNavigate();


    return (

        <Item sx={{ maxWidth: 345, marginTop: 2, }}>
            <Card sx={{ maxWidth: 500 }}>
                <CardMedia className='product-item'
                    sx={{

                        height: 50,
                        width: 300,
                        paddingTop: '60%',
                        backgroundSize: 'contain',

                        // backgroundColor: 'grey'

                    }}
                    image={product.images}
                    title={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ${product.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() =>
                        navigate(`/product/${product._id}`)}>Learn More</Button>
                    <Popconfirm
                        title="Are you sure delete this product?"
                        okText="Yes"
                        cancleText="No"
                        onConfirm={() => onDeleteProduct(product._id)}
                    >
                        <Button size="small" color="error">Delete</Button>
                    </Popconfirm>
                </CardActions>
            </Card>
        </Item>
    );
}