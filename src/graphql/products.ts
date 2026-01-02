import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
      stock
      sku
      category
      images
      isActive
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      description
      price
      stock
      sku
      category
      images
      isActive
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
      message
    }
  }
`;

export const GET_SELLER_PRODUCTS = gql`
  query GetSellerProducts($limit: Int, $offset: Int, $search: String, $category: String, $status: String) {
    sellerProducts(limit: $limit, offset: $offset, search: $search, category: $category, status: $status) {
      products {
        id
        name
        description
        price
        stock
        sku
        category
        images
        isActive
        createdAt
        updatedAt
      }
      total
      hasMore
    }
  }
`;
