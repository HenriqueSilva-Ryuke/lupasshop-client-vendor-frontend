import { MarketplaceStore, MarketplaceProduct } from '@/types/marketplace';

export interface DashboardUser {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'seller' | 'buyer';
    avatar?: string;
}

export interface DashboardShop extends MarketplaceStore {
    status: 'active' | 'pending' | 'suspended';
    createdAt: string;
    revenue: number;
    totalOrders: number;
}

export interface DashboardProduct extends MarketplaceProduct {
    stock: number;
    status: 'active' | 'draft' | 'archived';
    sales: number;
}

export interface DashboardOrder {
    id: string;
    customer: {
        name: string;
        email: string;
        avatar?: string;
    };
    items: {
        productId: string;
        name: string;
        quantity: number;
        price: number;
        image: string;
    }[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
    paymentMethod: string;
}

// Mock Users
export const mockUser: DashboardUser = {
    id: 'user-1',
    name: 'Alexandre Silva',
    email: 'alexandre@lupashop.ao',
    role: 'seller',
    avatar: 'https://github.com/shadcn.png'
};

// Mock Shops
export const mockShops: DashboardShop[] = [
    {
        id: 'shop-1',
        name: 'TechHub Angola',
        slug: 'techhub-angola',
        logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&h=128&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1531297461136-82lw9z1p1j96?w=1200&h=400&fit=crop',
        description: 'Premium electronics and gadgets distributor in Luanda.',
        rating: 4.8,
        reviewCount: 156,
        categories: ['electronics'],
        isVerified: true,
        location: 'Luanda, Angola',
        status: 'active',
        createdAt: '2024-01-15T10:00:00Z',
        revenue: 12500000,
        totalOrders: 450
    },
    {
        id: 'shop-2',
        name: 'Moda Luanda',
        slug: 'moda-luanda',
        logo: 'https://images.unsplash.com/photo-1589810635657-232948472d98?w=128&h=128&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
        description: 'Contemporary fashion for men and women.',
        rating: 4.5,
        reviewCount: 89,
        categories: ['fashion'],
        isVerified: true,
        location: 'Luanda, Angola',
        status: 'active',
        createdAt: '2024-03-10T14:30:00Z',
        revenue: 4500000,
        totalOrders: 120
    }
];

// Mock Products
export const mockDashboardProducts: DashboardProduct[] = [
    {
        id: 'prod-1',
        name: 'Wireless Noise Cancelling Headphones',
        slug: 'wireless-headphones',
        price: 25000,
        originalPrice: 30000,
        currency: 'AOA',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'],
        storeId: 'shop-1',
        storeName: 'TechHub Angola',
        storeSlug: 'techhub-angola',
        rating: 4.7,
        reviewCount: 45,
        category: 'electronics',
        isTrending: true,
        stock: 150,
        status: 'active',
        sales: 320
    },
    {
        id: 'prod-2',
        name: 'Smart Watch Series 5',
        slug: 'smart-watch-series-5',
        price: 45000,
        currency: 'AOA',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'],
        storeId: 'shop-1',
        storeName: 'TechHub Angola',
        storeSlug: 'techhub-angola',
        rating: 4.9,
        reviewCount: 120,
        category: 'electronics',
        isTrending: true,
        stock: 45,
        status: 'active',
        sales: 850
    },
    {
        id: 'prod-3',
        name: 'Summer Floral Dress',
        slug: 'summer-floral-dress',
        price: 15000,
        currency: 'AOA',
        images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop'],
        storeId: 'shop-2',
        storeName: 'Moda Luanda',
        storeSlug: 'moda-luanda',
        rating: 4.4,
        reviewCount: 28,
        category: 'fashion',
        isNew: true,
        stock: 200,
        status: 'active',
        sales: 150
    }
];

// Mock Orders
export const mockOrders: DashboardOrder[] = [
    {
        id: 'ord-1001',
        customer: {
            name: 'Maria Santos',
            email: 'maria@example.com',
            avatar: 'https://i.pravatar.cc/150?u=maria'
        },
        items: [
            {
                productId: 'prod-1',
                name: 'Wireless Noise Cancelling Headphones',
                quantity: 1,
                price: 25000,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
            }
        ],
        total: 25000,
        status: 'delivered',
        date: '2024-05-20T10:30:00Z',
        paymentMethod: 'Credit Card'
    },
    {
        id: 'ord-1002',
        customer: {
            name: 'João Baptista',
            email: 'joao@example.com'
        },
        items: [
            {
                productId: 'prod-2',
                name: 'Smart Watch Series 5',
                quantity: 2,
                price: 45000,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
            }
        ],
        total: 90000,
        status: 'processing',
        date: '2024-05-21T14:15:00Z',
        paymentMethod: 'Multicaixa Express'
    },
    {
        id: 'ord-1003',
        customer: {
            name: 'Ana Costa',
            email: 'ana@example.com',
            avatar: 'https://i.pravatar.cc/150?u=ana'
        },
        items: [
            {
                productId: 'prod-3',
                name: 'Summer Floral Dress',
                quantity: 1,
                price: 15000,
                image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop'
            }
        ],
        total: 15000,
        status: 'pending',
        date: '2024-05-22T09:00:00Z',
        paymentMethod: 'Bank Transfer'
    }
];
