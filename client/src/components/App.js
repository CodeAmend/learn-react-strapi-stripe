import React, { Component } from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Container, Box, Heading, Image, Card, Text } from 'gestalt';
import { Link } from 'react-router-dom';

import './App.css';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {

  state = { brands: [] };

  async componentDidMount() {
    try {
      const { data } = await strapi.request('POST', '/graphql', {
        data: {
          query: `
            query {
              brands {
                _id
                name
                description
                createdAt
                image {
                  name
                  url
                }
              }
            }
          `
        }
      });
      this.setState({ brands: data.brands });
    } catch (err) {
      console.log(err);
      /* handle error */
    }
  }
  render() {
    const { brands } = this.state;
    console.log(brands);
    return (
      <Container>
        {/* Brands Section */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {/* Brands Header */}
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>

        </Box>
        {/* Brands Header */}
        <Box
          display="flex"
          shape="rounded"
          wrap
          justifyContent="around"
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#d6c8ec"
            }
          }}
        >
          {brands.map(brand => (
            <Box 
              key ={brand._id}
              margin={2}
              width={250}
              padding={4}
            >
              <Card image={
                <Box height={200} width={200}>
                  <Image
                    alt="Brand"
                    fit="cover"
                    naturalHeight={1}
                    naturalWidth={1}
                    src={`${apiUrl}${brand.image.url}`}
                  />
                </Box>
              }>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                <Text bold size="xl">{brand.name}</Text>
                <Text>{brand.description}</Text>
                <Text bold size="xl">
                  <Link to={`/${brand._id}`}>See Brews</Link>
                </Text>
              </Box>
              </Card>
            </Box>
          ))}
        </Box>

      </Container>
    );
  }
}

export default App;
