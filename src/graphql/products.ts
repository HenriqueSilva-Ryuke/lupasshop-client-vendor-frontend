import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      storeId
      categoryId
      name
      slug
      sku
      price
      originalPrice
      currency
      images
      description
      isNew
      isTrending
      isActive
      rating
      reviewCount
      stockQuantity
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      storeId
      categoryId
      name
      slug
      sku
      price
      originalPrice
      currency
      images
      description
      isNew
      isTrending
      isActive
      rating
      reviewCount
      stockQuantity
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const GET_SELLER_PRODUCTS = gql`
  query SellerProducts($limit: Int, $offset: Int, $search: String, $categoryId: ID, $isActive: Boolean) {
    sellerProducts(limit: $limit, offset: $offset, search: $search, categoryId: $categoryId, isActive: $isActive) {
      products {
        id
        storeId
        categoryId
        name
        slug
        sku
        price
        originalPrice
        currency
        images
        description
        isNew
        isTrending
        isActive
        rating
        reviewCount
        stockQuantity
        createdAt
        updatedAt
      }
      total
      hasMore
    }
  }
`;
