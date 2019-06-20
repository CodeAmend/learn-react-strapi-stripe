import React, { Component } from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Container, Box, Heading, Image, Card, Text, SearchField, Icon } from 'gestalt';
import { Link } from 'react-router-dom';

import Loader from './Loader';
import './App.css';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {

  state = { brands: [], searchTerm: '', loadingBrands: true };

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
      this.setState({ brands: data.brands, loadingBrands: false });
    } catch (err) {
      /* handle error */
      console.log(err);
      this.setState({ loadingBrands: false });
    }
  }

  handleChange = ({ value }) => {
    this.setState({ searchTerm: value });
  }

  filterBrands = ({ brands, searchTerm }) => {
    return brands.filter(({ name, description }) => {
      name = name.toLowerCase();
      description = description.toLowerCase();
      searchTerm = searchTerm.toLowerCase();
      return name.includes(searchTerm) || description.includes(searchTerm);
    });
  }

  render() {
    const { searchTerm, loadingBrands } = this.state;
    return (
      <Container>
        {/* Brands Search Field */}
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField
            id="searchField"
            accessibilityLabel="Brands Search Field"
            onChange={this.handleChange}
            placeholder="Search Brands"
          />
          <Box margin={2}>
            <Icon 
              icon="filter"
              color={searchTerm ? "orange" : "gray" }
              size={20}
              accessibilityLabel="Filter Search"
            />
          </Box>
        </Box>
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
          {this.filterBrands(this.state).map(brand => (
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

        <Loader show={loadingBrands} />

      </Container>
    );
  }
}

export default App;
