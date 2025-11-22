# Database Schema Proposal

This document outlines the proposed database schema for the LupaShop Marketplace backend. It is designed to support the current frontend features, including stores, products, categories, reviews, and user authentication.

## Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    User ||--o{ Store : owns
    User ||--o{ Review : writes
    User ||--o{ Order : places
    
    Store ||--o{ Product : sells
    Store ||--o{ Order : receives
    Store ||--o{ Review : receives_store_review
    
    Category ||--o{ Product : categorizes
    Category ||--o{ Store : categorizes_store
    
    Product ||--o{ OrderItem : contains
    Product ||--o{ Review : receives_product_review
    
    Order ||--o{ OrderItem : includes

    User {
        uuid id PK
        string email
        string password_hash
        string full_name
        string role "admin, seller, buyer"
        timestamp created_at
    }

    Store {
        uuid id PK
        uuid owner_id FK
        string name
        string slug
        string description
        string logo_url
        string cover_image_url
        string location
        boolean is_verified
        boolean is_promoted
        float rating
        int review_count
        timestamp created_at
    }

    Category {
        uuid id PK
        string name
        string slug
        string icon
        string type "store, product"
    }

    Product {
        uuid id PK
        uuid store_id FK
        uuid category_id FK
        string name
        string slug
        decimal price
        decimal original_price
        string currency
        jsonb images
        text description
        boolean is_new
        boolean is_trending
        float rating
        int review_count
        int stock_quantity
        timestamp created_at
    }

    Order {
        uuid id PK
        uuid user_id FK
        uuid store_id FK
        decimal total_amount
        string status "pending, paid, shipped, delivered, cancelled"
        timestamp created_at
    }

    OrderItem {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        decimal price_at_purchase
    }

    Review {
        uuid id PK
        uuid user_id FK
        uuid store_id FK "nullable"
        uuid product_id FK "nullable"
        int rating
        text comment
        timestamp created_at
    }
```

## Table Definitions

### Users
Stores user account information for buyers, sellers, and admins.
- `role`: Determines permissions (e.g., only sellers can create stores).

### Stores
Represents a shop within the marketplace.
- `owner_id`: Links the store to a specific User (seller).
- `is_verified`: For the "Verified" badge.
- `is_promoted`: For the "Promoted" widget.

### Categories
Hierarchical or flat organization for stores and products.
- `type`: Distinguishes between store categories (e.g., "Electronics Store") and product categories if they differ.

### Products
Items listed for sale by a store.
- `images`: Stored as a JSON array of URLs.
- `is_trending`: Flag for the "Trending" view (could also be calculated dynamically based on sales/views).

### Orders & OrderItems
Transactional data.
- `Order`: The high-level transaction.
- `OrderItem`: Specific products within an order.

### Reviews
Feedback system.
- Can be linked to either a `Store` or a `Product`.

## Considerations
- **Search**: For high-performance search (products, stores), consider syncing data to a search engine like Elasticsearch or Meilisearch.
- **Analytics**: Store views, clicks, and sales data should likely be stored in a separate analytics table or service to avoid bloating the main transactional DB.
