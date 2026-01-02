import { z } from 'zod';

// Enums matching backend
export const RoleSchema = z.enum(['BUYER', 'SELLER', 'ADMIN']);
export const OrderStatusSchema = z.enum(['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED']);
export const CategoryTypeSchema = z.enum(['STORE', 'PRODUCT']);

// User Schemas
export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const SignupSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  fullName: z.string().min(3, 'Nome completo deve ter no mínimo 3 caracteres'),
  role: RoleSchema,
});

export const UpdateUserSchema = z.object({
  email: z.string().email('Email inválido').optional(),
  fullName: z.string().min(3, 'Nome completo deve ter no mínimo 3 caracteres').optional(),
  role: RoleSchema.optional(),
});

// Store Schemas
export const CreateStoreSchema = z.object({
  name: z.string().min(3, 'Nome da loja deve ter no mínimo 3 caracteres'),
  slug: z.string().optional(),
  description: z.string().optional(),
  logoUrl: z.string().url('URL da logo inválida').optional(),
  coverImageUrl: z.string().url('URL da imagem de capa inválida').optional(),
  location: z.string().optional(),
  categoryId: z.string().optional(),
  isPremium: z.boolean().optional(),
  ownerId: z.string(),
});

export const UpdateStoreSchema = z.object({
  name: z.string().min(3, 'Nome da loja deve ter no mínimo 3 caracteres').optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  logoUrl: z.string().url('URL da logo inválida').optional(),
  coverImageUrl: z.string().url('URL da imagem de capa inválida').optional(),
  location: z.string().optional(),
  categoryId: z.string().optional(),
  isPremium: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  isPromoted: z.boolean().optional(),
});

// Product Schemas
export const CreateProductSchema = z.object({
  storeId: z.string(),
  categoryId: z.string().optional(),
  name: z.string().min(3, 'Nome do produto deve ter no mínimo 3 caracteres'),
  slug: z.string().optional(),
  price: z.number().positive('Preço deve ser maior que zero'),
  originalPrice: z.number().positive().optional(),
  currency: z.string().optional(),
  images: z.array(z.string().url('URL da imagem inválida')).min(1, 'Pelo menos uma imagem é necessária'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  stockQuantity: z.number().int().min(0, 'Estoque deve ser maior ou igual a zero').optional(),
  isNew: z.boolean().optional(),
  isTrending: z.boolean().optional(),
});

export const UpdateProductSchema = z.object({
  categoryId: z.string().optional(),
  name: z.string().min(3, 'Nome do produto deve ter no mínimo 3 caracteres').optional(),
  slug: z.string().optional(),
  price: z.number().positive('Preço deve ser maior que zero').optional(),
  originalPrice: z.number().positive().optional(),
  currency: z.string().optional(),
  images: z.array(z.string().url('URL da imagem inválida')).optional(),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres').optional(),
  stockQuantity: z.number().int().min(0, 'Estoque deve ser maior ou igual a zero').optional(),
  isNew: z.boolean().optional(),
  isTrending: z.boolean().optional(),
});

// Order Schemas
export const CreateOrderSchema = z.object({
  userId: z.string(),
  storeId: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive('Quantidade deve ser maior que zero'),
  })).min(1, 'Pelo menos um item é necessário'),
});

// Review Schemas
export const CreateReviewSchema = z.object({
  rating: z.number().int().min(1, 'Avaliação mínima é 1').max(5, 'Avaliação máxima é 5'),
  comment: z.string().optional(),
  productId: z.string().optional(),
  storeId: z.string().optional(),
}).refine(
  (data) => data.productId || data.storeId,
  { message: 'Deve avaliar um produto ou uma loja' }
);

// Category Schemas
export const CreateCategorySchema = z.object({
  name: z.string().min(3, 'Nome da categoria deve ter no mínimo 3 caracteres'),
  slug: z.string().optional(),
  icon: z.string().optional(),
  type: CategoryTypeSchema,
});

export const UpdateCategorySchema = z.object({
  name: z.string().min(3, 'Nome da categoria deve ter no mínimo 3 caracteres').optional(),
  slug: z.string().optional(),
  icon: z.string().optional(),
  type: CategoryTypeSchema.optional(),
});

// Types inferred from schemas
export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type CreateStoreInput = z.infer<typeof CreateStoreSchema>;
export type UpdateStoreInput = z.infer<typeof UpdateStoreSchema>;
export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
