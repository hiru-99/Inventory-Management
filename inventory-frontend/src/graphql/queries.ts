import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
    }
  }
`;

export const GET_PRODUCT_WITH_VARIANTS = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
      id
      name
      price
      variants {
        id
        name
        stocks {
          id
          location
          quantity
        }
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation RemoveProduct($id: Int!) {
    removeProduct(id: $id)
  }
`;

export const ADD_PRODUCT = gql`
  mutation CreateProduct($name: String!, $description: String!, $price: Float!) {
    createProduct(name: $name, description: $description, price: $price) {
      id
      name
      price
      description
    }
  }
`;

