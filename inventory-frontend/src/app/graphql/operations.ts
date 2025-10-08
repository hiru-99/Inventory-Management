// graphql/operations.ts
import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      description
      variants {
        id
        name
        sku
        description
        stocks {
          id
          quantity
          location
        }
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $price: Float!, $description: String) {
    createProduct(name: $name, price: $price, description: $description) {
      id
      name
      price
      description
    }
  }
`;




