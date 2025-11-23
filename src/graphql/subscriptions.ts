import { gql } from '@apollo/client';

// ==================== ORDER STATUS UPDATES ====================

export const ORDER_STATUS_UPDATED = gql`
  subscription OrderStatusUpdated($orderId: ID!) {
    orderStatusUpdated(orderId: $orderId) {
      id
      status
      createdAt
      updatedAt
      orderItems {
        id
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
        status
        estimatedDelivery
        actualDelivery
        carrier {
          name
          trackingUrl
        }
      }
    }
  }
`;
