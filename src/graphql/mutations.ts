import { gql } from '@apollo/client';

// ==================== AUTHENTICATION ====================

export const SIGNUP = gql`
  mutation Signup($input: CreateUserInput!) {
    signup(input: $input) {
      token
      user {
        id
        email
        fullName
        role
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        fullName
        role
      }
    }
  }
`;

// ==================== USERS ====================

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      fullName
      role
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

// ==================== STORES ====================

export const CREATE_STORE = gql`
  mutation CreateStore($input: CreateStoreInput!) {
    createStore(input: $input) {
      id
      name
      slug
      description
      logoUrl
      coverImageUrl
      location
      isPremium
      createdAt
    }
  }
`;

export const UPDATE_STORE = gql`
  mutation UpdateStore($id: ID!, $input: UpdateStoreInput!) {
    updateStore(id: $id, input: $input) {
      id
      name
      slug
      description
      logoUrl
      coverImageUrl
      location
      isVerified
      isPromoted
      isPremium
      updatedAt
    }
  }
`;

export const DELETE_STORE = gql`
  mutation DeleteStore($id: ID!) {
    deleteStore(id: $id)
  }
`;

// ==================== PRODUCTS ====================

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      slug
      price
      originalPrice
      currency
      images
      description
      stockQuantity
      isNew
      isTrending
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      slug
      price
      originalPrice
      currency
      images
      description
      stockQuantity
      isNew
      isTrending
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

// ==================== ORDERS ====================

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      userId
      storeId
      totalAmount
      status
      createdAt
    }
  }
`;

export const CREATE_ORDER_ITEM = gql`
  mutation CreateOrderItem($input: CreateOrderItemInput!) {
    createOrderItem(input: $input) {
      id
      orderId
      productId
      quantity
      priceAtPurchase
      createdAt
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: ID!, $input: UpdateOrderStatusInput!) {
    updateOrderStatus(id: $id, input: $input) {
      id
      status
      updatedAt
    }
  }
`;

// ==================== SHIPMENTS ====================

export const CREATE_SHIPMENT = gql`
  mutation CreateShipment($input: CreateShipmentInput!) {
    createShipment(input: $input) {
      id
      orderId
      trackingNumber
      shippingCost
      status
      estimatedDelivery
      createdAt
    }
  }
`;

export const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment($id: ID!, $input: UpdateShipmentInput!) {
    updateShipment(id: $id, input: $input) {
      id
      trackingNumber
      shippingCost
      status
      estimatedDelivery
      actualDelivery
      updatedAt
    }
  }
`;

// ==================== REVIEWS ====================

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      userId
      storeId
      productId
      rating
      comment
      createdAt
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $input: UpdateReviewInput!) {
    updateReview(id: $id, input: $input) {
      id
      rating
      comment
      updatedAt
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;

// ==================== PAYMENTS ====================

export const PROCESS_PAYMENT = gql`
  mutation ProcessPayment($input: ProcessPaymentInput!) {
    processPayment(input: $input) {
      id
      orderId
      amount
      currency
      methodUsed
      status
      transactionDate
      createdAt
    }
  }
`;

// ==================== CATEGORIES ====================

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      slug
      icon
      type
      createdAt
    }
  }
`;

// ==================== CARRIERS ====================

export const CREATE_CARRIER = gql`
  mutation CreateCarrier($input: CreateCarrierInput!) {
    createCarrier(input: $input) {
      id
      name
      trackingUrl
      isLupaManaged
      createdAt
    }
  }
`;

// ==================== FINANCES ====================

export const CREATE_PAYOUT = gql`
  mutation CreatePayout($input: CreatePayoutInput!) {
    createPayout(input: $input) {
      id
      storeId
      amount
      status
      payoutDate
      createdAt
    }
  }
`;

// ==================== INTEGRATIONS ====================

export const CONNECT_SOCIAL_ACCOUNT = gql`
  mutation ConnectSocialAccount($input: ConnectSocialInput!) {
    connectSocialAccount(input: $input) {
      id
      platform
      accountId
      storeId
      createdAt
    }
  }
`;
