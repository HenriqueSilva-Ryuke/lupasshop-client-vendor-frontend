import { gql } from '@apollo/client';

// ==================== AUTHENTICATION & USERS ====================

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      email
      fullName
      role
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      fullName
      role
      createdAt
      updatedAt
    }
  }
`;

export const LIST_USERS = gql`
  query ListUsers($role: Role, $search: String) {
    listUsers(role: $role, search: $search) {
      id
      email
      fullName
      role
      createdAt
    }
  }
`;

// ==================== STORES ====================

export const GET_STORE = gql`
  query GetStore($id: ID!) {
    getStore(id: $id) {
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
      rating
      reviewCount
      createdAt
      category {
        id
        name
        slug
        icon
      }
      products {
        id
        name
        slug
        price
        originalPrice
        images
        rating
        reviewCount
        stockQuantity
        isNew
        isTrending
      }
    }
  }
`;

export const LIST_STORES = gql`
  query ListStores(
    $ownerId: ID, 
    $categoryId: ID, 
    $search: String,
    $limit: Int,
    $offset: Int,
    $featured: Boolean,
    $promoted: Boolean
  ) {
    listStores(
      ownerId: $ownerId, 
      categoryId: $categoryId, 
      search: $search,
      limit: $limit,
      offset: $offset,
      featured: $featured,
      promoted: $promoted
    ) {
      id
      name
      slug
      description
      logoUrl
      coverImageUrl
      location
      rating
      reviewCount
      isVerified
      isPromoted
      isPremium
      createdAt
      category {
        id
        name
        slug
      }
    }
  }
`;

// ==================== PRODUCTS ====================

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      storeId
      name
      slug
      price
      originalPrice
      currency
      images
      description
      isNew
      isTrending
      rating
      reviewCount
      stockQuantity
      createdAt
      store {
        id
        name
        slug
        logoUrl
        isVerified
      }
      category {
        id
        name
        slug
      }
    }
  }
`;

export const LIST_PRODUCTS = gql`
  query ListProducts(
    $storeId: ID, 
    $categoryId: ID, 
    $search: String,
    $isNew: Boolean,
    $isTrending: Boolean,
    $limit: Int,
    $offset: Int,
    $featured: Boolean
  ) {
    listProducts(
      storeId: $storeId, 
      categoryId: $categoryId, 
      search: $search,
      isNew: $isNew,
      isTrending: $isTrending,
      limit: $limit,
      offset: $offset,
      featured: $featured
    ) {
      id
      name
      slug
      price
      originalPrice
      currency
      images
      rating
      reviewCount
      stockQuantity
      isNew
      isTrending
      createdAt
      store {
        id
        name
        slug
      }
    }
  }
`;

// ==================== ORDERS ====================

export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      userId
      storeId
      totalAmount
      status
      createdAt
      orderItems {
        id
        productId
        quantity
        priceAtPurchase
        product {
          id
          name
          images
        }
      }
      shipment {
        id
        trackingNumber
        shippingCost
        status
        estimatedDelivery
        actualDelivery
        carrier {
          name
          trackingUrl
        }
      }
      store {
        id
        name
        slug
      }
    }
  }
`;

export const LIST_ORDERS = gql`
  query ListOrders($userId: ID, $storeId: ID, $status: OrderStatus, $limit: Int, $offset: Int) {
    listOrders(userId: $userId, storeId: $storeId, status: $status, limit: $limit, offset: $offset) {
      orders {
        id
        userId
        storeId
        totalAmount
        status
        createdAt
        orderItems {
          id
          quantity
          priceAtPurchase
        }
      }
      total
      hasMore
    }
  }
`;

// ==================== REVIEWS ====================

export const LIST_REVIEWS = gql`
  query ListReviews($userId: ID, $storeId: ID, $productId: ID) {
    listReviews(userId: $userId, storeId: $storeId, productId: $productId) {
      id
      userId
      rating
      comment
      createdAt
      user {
        id
        fullName
      }
    }
  }
`;

// ==================== FINANCES ====================

export const GET_FINANCIAL_SUMMARY = gql`
  query GetFinancialSummary {
    getFinancialSummary {
      totalRevenue
      totalSales
      averageOrderValue
      totalPayouts
      pendingPayouts
    }
  }
`;

export const GET_STORE_BALANCE = gql`
  query GetStoreBalance($storeId: ID!) {
    getStoreBalance(storeId: $storeId) {
      storeId
      storeName
      currentBalance
      pendingPayout
      lastPayoutDate
    }
  }
`;

export const LIST_PAYOUTS = gql`
  query ListPayouts($storeId: ID, $status: PayoutStatus) {
    listPayouts(storeId: $storeId, status: $status) {
      id
      storeId
      amount
      status
      payoutDate
      createdAt
      store {
        id
        name
      }
    }
  }
`;

// ==================== PAYMENTS ====================

export const LIST_PAYMENT_METHODS = gql`
  query ListPaymentMethods {
    listAvailablePaymentMethods {
      id
      type
      details
      isEnabled
    }
  }
`;

export const LIST_ORDER_TRANSACTIONS = gql`
  query ListOrderTransactions($orderId: ID!) {
    listOrderTransactions(orderId: $orderId) {
      id
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

export const LIST_CATEGORIES = gql`
  query ListCategories($type: CategoryType) {
    listCategories(type: $type) {
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

export const LIST_CARRIERS = gql`
  query ListCarriers($isLupaManaged: Boolean) {
    listCarriers(isLupaManaged: $isLupaManaged) {
      id
      name
      trackingUrl
      isLupaManaged
    }
  }
`;

// ==================== INTEGRATIONS ====================

export const GET_STORE_INTEGRATIONS = gql`
  query GetStoreIntegrations($storeId: ID!) {
    getStoreIntegrations(storeId: $storeId) {
      id
      platform
      accountId
      createdAt
    }
  }
`;
