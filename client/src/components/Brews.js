import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Box, Heading, Text, Image, Card, Button, Mask, IconButton } from 'gestalt';
import { Link } from 'react-router-dom';

import { getCart, setCart } from '../util';

import "./App.css"

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);


class Brews extends React.Component {
  state = { 
    brews: [],
    brand: '',
    cartItems: []
  };

  async componentDidMount() {
    console.log("DID");
    try {
      const { data } = await strapi.request('POST', '/graphql', {
        data: {
          query: `
            query {
              brand(id: "${this.props.match.params.brandId}") {
                _id
                name
                brews {
                  _id
                  name
                  description
                  image {
                    url
                  }
                  price
                }
              }
            }
          `
        }
      });

      this.setState({
        brand: data.brand.name,
        brews: data.brand.brews,
        cartItems: getCart() || []
      });

    } catch (err) {
      /* handle error */
      console.log(err);
    }
  }

  addToCart = brew => {
    const { cartItems } = this.state;
    const inCartIndex = cartItems.findIndex(item => item._id === brew._id);
    let updatedItems = [];

    if(inCartIndex === -1) {
      updatedItems = cartItems.concat({
        ...brew,
        quantity: 1
      });
    } else {
      updatedItems = [...cartItems];
      updatedItems[inCartIndex].quantity += 1;
    }
    this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
  }

  deleteItemFromCart = selectedItemId => {
    const updatedItems = this.state.cartItems.filter(item => item._id !== selectedItemId);
    this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
  }

  calculateTotalCart = () => {
    const { cartItems } = this.state;
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    return total.toFixed(2);
  }

  render() {
    const  { brand, brews, cartItems } = this.state;
    return (
      <Box
        marginTop={4}
        display="flex"
        justifyContent="center"
        alignItems="start"
        dangerouslySetInlineStyle={{
          __style: {
            flexWrap: "wrap-reverse"
          }
        }}
      >
        {/* Brews Section */}
        <Box display="flex" direction="column" alignItems="center">

          {/* Brews Heading */}
          
          <Box margin={2}>
            <Heading color="orchid" size="md">{brand}</Heading>
          </Box>

          {/* Brews */}
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: "#bdcdd6"
              }
            }}
            shape="rounded"
            display="flex"
            justifyContent="center"
            padding={4}
          >
            {brews.map(brew => (
              <Box 
                key ={brew._id}
                margin={2}
                width={200}
              >
                <Card image={
                  <Box height={200} width={200}>
                    <Image
                      alt="Brew"
                      fit="cover"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiUrl}${brew.image.url}`}
                    />
                  </Box>
                }>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <Text bold size="xl">{brew.name}</Text>
                    <Text>{brew.description}</Text>
                    <Text size="xl">
                      <Button onClick={() => this.addToCart(brew)} color="blue" text="Add to Cart" />
                    </Text>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
          {/* User Cart */}
          <Box alignSelf="end" marginTop={2} marginLeft={2}>
            <Mask shape="rounded" wash>
              <Box
                display="flex"
                direction="column"
                alignItems="center"
                padding={2}
              >
                {/* Cart Heading */}
                <Heading>Your Card</Heading>
                <Text color="gray" italic >
                  {cartItems.length} items selected
                </Text>

                {/* Cart Items */}
                {cartItems.map(item => (
                  <Box key={item._id} display="flex" alignItems="center">
                    <Text>
                      {item.name} x {item.quantity} - ${(item.quantity * item.price).toFixed(2)}
                    </Text>
                    <IconButton
                      accessibilityLabel="Delete Item"
                      icon="cancel"
                      size="sm"
                      iconColor="red"
                      onClick={() => this.deleteItemFromCart(item._id)}
                    />
                  </Box>
                ))}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Box margin={2}>
                    {cartItems.length === 0 && (
                      <Text color="red"> Please select some items </Text>
                    )}
                  </Box>
                  <Text size="lg">Total: ${this.calculateTotalCart()}</Text>
                  <Text>
                    <Link to="/checkout">Checkout</Link>
                  </Text>
                </Box>
                
              </Box>
            </Mask>
          </Box>
      </Box>
    );
  }
}

export default Brews;
