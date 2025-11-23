// GraphQL Types for LupaShop API
// All types use optional properties for safe data handling

// ==================== ENUMS ====================

export enum Role {
    BUYER = 'BUYER',
    SELLER = 'SELLER',
    ADMIN = 'ADMIN'
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export enum CategoryType {
    STORE = 'STORE',
    PRODUCT = 'PRODUCT'
}

export enum PayoutStatus {
    PENDING = 'PENDING',
    PROCESSED = 'PROCESSED',
    FAILED = 'FAILED'
}

export enum PaymentMethodType {
    MULTICAIXA_EXPRESS = 'MULTICAIXA_EXPRESS',
    CARD = 'CARD',
    DIGITAL_WALLET = 'DIGITAL_WALLET',
    BANK_TRANSFER = 'BANK_TRANSFER'
}

export enum FinancialTransactionEntityType {
    USER = 'USER',
    STORE = 'STORE',
    ORDER = 'ORDER',
    PAYOUT = 'PAYOUT'
}

export enum FinancialTransactionType {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT',
    FEE = 'FEE',
    REFUND = 'REFUND'
}

// ==================== USER TYPES ====================

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: Role;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

// ==================== STORE TYPES ====================

export interface Store {
    id: string;
    ownerId: string;
    categoryId?: string;
    name: string;
    slug: string;
    description?: string;
    logoUrl?: string;
    coverImageUrl?: string;
    location?: string;
    isVerified?: boolean;
    isPromoted?: boolean;
    isPremium?: boolean;
    rating?: number;
    reviewCount?: number;
    createdAt?: string;
    updatedAt?: string;
    category?: Category;
    products?: Product[];
    owner?: User;
}

export interface StoreBalance {
    storeId: string;
    storeName?: string;
    currentBalance: number;
    pendingPayout?: number;
    lastPayoutDate?: string;
}

// ==================== PRODUCT TYPES ====================

export interface Product {
    id: string;
    storeId: string;
    categoryId?: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    currency?: string;
    images: string[];
    description?: string;
    isNew?: boolean;
    isTrending?: boolean;
    rating?: number;
    reviewCount?: number;
    stockQuantity?: number;
    createdAt?: string;
    updatedAt?: string;
    store?: Store;
    category?: Category;
    reviews?: Review[];
}

// ==================== ORDER TYPES ====================

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    priceAtPurchase: number;
    createdAt?: string;
    product?: Product;
}

export interface Order {
    id: string;
    userId: string;
    storeId: string;
    totalAmount: number;
    status: OrderStatus;
    createdAt?: string;
    updatedAt?: string;
    orderItems?: OrderItem[];
    shipment?: Shipment;
    user?: User;
    store?: Store;
}

// ==================== SHIPMENT TYPES ====================

export interface Carrier {
    id: string;
    name: string;
    trackingUrl?: string;
    isLupaManaged?: boolean;
    createdAt?: string;
}

export interface Shipment {
    id: string;
    orderId: string;
    carrierId?: string;
    trackingNumber?: string;
    shippingCost: number;
    status?: string;
    estimatedDelivery?: string;
    actualDelivery?: string;
    createdAt?: string;
    updatedAt?: string;
    carrier?: Carrier;
    order?: Order;
}

// ==================== REVIEW TYPES ====================

export interface Review {
    id: string;
    userId: string;
    storeId?: string;
    productId?: string;
    rating: number;
    comment?: string;
    createdAt?: string;
    updatedAt?: string;
    user?: User;
    store?: Store;
    product?: Product;
}

// ==================== PAYMENT TYPES ====================

export interface PaymentMethod {
    id: string;
    type: PaymentMethodType;
    details?: string;
    isEnabled?: boolean;
    createdAt?: string;
}

export interface Transaction {
    id: string;
    orderId: string;
    amount: number;
    currency: string;
    methodUsed: PaymentMethodType;
    status: string;
    transactionDate?: string;
    createdAt?: string;
    order?: Order;
}

// ==================== FINANCIAL TYPES ====================

export interface FinancialSummary {
    totalRevenue: number;
    totalSales: number;
    averageOrderValue: number;
    totalPayouts: number;
    pendingPayouts: number;
}

export interface Payout {
    id: string;
    storeId: string;
    amount: number;
    status: PayoutStatus;
    payoutDate?: string;
    createdAt?: string;
    updatedAt?: string;
    store?: Store;
}

// ==================== CATEGORY TYPES ====================

export interface Category {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    type: CategoryType;
    createdAt?: string;
    updatedAt?: string;
}

// ==================== INTEGRATION TYPES ====================

export interface SocialIntegration {
    id: string;
    storeId: string;
    platform: string;
    accountId: string;
    accessToken?: string;
    createdAt?: string;
    updatedAt?: string;
    store?: Store;
}

// ==================== INPUT TYPES ====================

export interface CreateUserInput {
    email: string;
    password: string;
    fullName: string;
    role?: Role;
}

export interface UpdateUserInput {
    email?: string;
    fullName?: string;
    role?: Role;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface CreateStoreInput {
    ownerId: string;
    categoryId?: string;
    name: string;
    slug: string;
    description?: string;
    logoUrl?: string;
    coverImageUrl?: string;
    location?: string;
    isPremium?: boolean;
}

export interface UpdateStoreInput {
    categoryId?: string;
    name?: string;
    slug?: string;
    description?: string;
    logoUrl?: string;
    coverImageUrl?: string;
    location?: string;
    isVerified?: boolean;
    isPromoted?: boolean;
    isPremium?: boolean;
}

export interface CreateProductInput {
    storeId: string;
    categoryId?: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    currency?: string;
    images: string[];
    description: string;
    isNew?: boolean;
    isTrending?: boolean;
    stockQuantity?: number;
}

export interface UpdateProductInput {
    categoryId?: string;
    name?: string;
    slug?: string;
    price?: number;
    originalPrice?: number;
    currency?: string;
    images?: string[];
    description?: string;
    isNew?: boolean;
    isTrending?: boolean;
    stockQuantity?: number;
}

export interface CreateOrderInput {
    userId: string;
    storeId: string;
    totalAmount: number;
    status?: OrderStatus;
}

export interface CreateOrderItemInput {
    orderId: string;
    productId: string;
    quantity: number;
    priceAtPurchase: number;
}

export interface UpdateOrderStatusInput {
    status: OrderStatus;
}

export interface CreateShipmentInput {
    orderId: string;
    carrierId?: string;
    trackingNumber?: string;
    shippingCost: number;
    estimatedDelivery?: string;
    status?: string;
}

export interface UpdateShipmentInput {
    carrierId?: string;
    trackingNumber?: string;
    shippingCost?: number;
    estimatedDelivery?: string;
    actualDelivery?: string;
    status?: string;
}

export interface CreateReviewInput {
    userId: string;
    storeId?: string;
    productId?: string;
    rating: number;
    comment?: string;
}

export interface UpdateReviewInput {
    rating?: number;
    comment?: string;
}

export interface ProcessPaymentInput {
    orderId: string;
    amount: number;
    currency: string;
    paymentMethodType: PaymentMethodType;
    paymentDetails?: string;
}

export interface CreateCategoryInput {
    name: string;
    slug: string;
    icon?: string;
    type: CategoryType;
}

export interface CreateCarrierInput {
    name: string;
    trackingUrl?: string;
    isLupaManaged?: boolean;
}

export interface CreatePayoutInput {
    storeId: string;
    amount: number;
    status?: PayoutStatus;
    payoutDate?: string;
}

export interface ConnectSocialInput {
    platform: string;
    accountId: string;
    accessToken: string;
    storeId: string;
}
