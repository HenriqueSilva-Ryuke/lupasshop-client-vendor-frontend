# 📚 Guia de Integração Frontend - Backplataform API

**Versão:** 1.0.0  
**Data:** Novembro 2025  
**Base URL:** `https://api.yourapp.com` ou `http://localhost:3000` (development)  
**Prefixo Base:** `/api`

---

## 📋 Índice

1. [Autenticação](#autenticação)
2. [Usuários](#usuários)
3. [Lojas](#lojas)
4. [Produtos](#produtos)
5. [Avaliações](#avaliações)
6. [Pagamentos](#pagamentos)
7. [Pedidos](#pedidos)
8. [Finanças](#finanças)
9. [Integrações](#integrações)
10. [Headers e Autenticação](#headers-e-autenticação)

---

## Autenticação

### POST `/api/auth/register`

Registrar novo usuário

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123456"
}
```

**Response 201:**
```json
{
  "user": {
    "id": "uuid-123",
    "name": "João Silva",
    "email": "joao@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response 400:**
```json
{
  "error": "Email já cadastrado"
}
```

---

### POST `/api/auth/login`

Login de usuário

**Request Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123456"
}
```

**Response 200:**
```json
{
  "user": {
    "id": "uuid-123",
    "name": "João Silva",
    "email": "joao@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response 401:**
```json
{
  "error": "Email ou senha incorretos"
}
```

---

### POST `/api/auth/forgot-password`

Solicitar reset de senha

**Request Body:**
```json
{
  "email": "joao@example.com"
}
```

**Response 200:**
```json
{
  "message": "Email de reset enviado com sucesso"
}
```

---

### POST `/api/auth/reset-password`

Resetar senha com token

**Request Body:**
```json
{
  "token": "reset-token-abc123...",
  "newPassword": "novaSenha123456"
}
```

**Response 200:**
```json
{
  "message": "Senha alterada com sucesso"
}
```

---

### POST `/api/auth/change-password`

Alterar senha (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "oldPassword": "senha123456",
  "newPassword": "novaSenha123456"
}
```

**Response 200:**
```json
{
  "message": "Senha alterada com sucesso"
}
```

---

## Usuários

### GET `/api/users/profile`

Obter perfil do usuário logado (requer autenticação)

**Autenticação:** Obter dados do **usuário logado via token JWT**
- Nenhum parâmetro é necessário
- Os dados retornados pertencem ao usuário do token

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "id": "uuid-123",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "user",
  "createdAt": "2025-11-04T10:30:00Z"
}
```

---

### PUT `/api/users/profile`

Atualizar perfil do usuário logado (requer autenticação)

**Autenticação:** Atualizar dados do **usuário logado via token JWT**
- Os dados são atualizados para o usuário do token

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "João Silva Atualizado",
  "email": "joao.novo@example.com"
}
```

**Response 200:**
```json
{
  "id": "uuid-123",
  "name": "João Silva Atualizado",
  "email": "joao.novo@example.com"
}
```

---

### GET `/api/users/activity`

Obter atividade do usuário logado (requer autenticação)

**Autenticação:** Obter atividade do **usuário logado via token JWT**
- Nenhum parâmetro é necessário
- Retorna o histórico de atividades do usuário do token

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
[
  {
    "action": "login",
    "timestamp": "2025-11-04T10:30:00Z"
  },
  {
    "action": "product_view",
    "timestamp": "2025-11-04T10:31:00Z"
  }
]
```

---

### GET `/api/users/search`

Buscar usuários

**Query Parameters:**
- `q` (string): Termo de busca
- `limit` (integer): Máximo de resultados (1-100)

**Example:** `GET /api/users/search?q=joao&limit=10`

**Response 200:**
```json
[
  {
    "id": "uuid-123",
    "name": "João Silva",
    "email": "joao@example.com"
  }
]
```

---

### GET `/api/users/stats`

Obter estatísticas de usuários (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "totalUsers": 1250,
  "activeUsers": 450
}
```

---

### GET `/api/users`

Listar usuários (requer autenticação)

**Query Parameters:**
- `page` (integer): Página (padrão: 1)
- `limit` (integer): Itens por página (1-100, padrão: 20)

**Example:** `GET /api/users?page=1&limit=20`

**Response 200:**
```json
[
  {
    "id": "uuid-123",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "user"
  }
]
```

---

### PUT `/api/users/:id/role`

Alterar role do usuário (admin apenas)

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "role": "admin"
}
```

**Response 200:**
```json
{
  "message": "Role alterada com sucesso"
}
```

---

### DELETE `/api/users/:id`

Deletar usuário (admin apenas)

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Response 200:**
```json
{
  "message": "Usuário deletado com sucesso"
}
```

---

### GET `/api/users/addresses`

Obter endereços do usuário logado (requer autenticação)

**Autenticação:** Obter endereços do **usuário logado via token JWT**
- Nenhum parâmetro é necessário
- Retorna os endereços salvos do usuário do token

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
[
  {
    "id": "addr-123",
    "street": "Rua Principal, 123",
    "city": "Luanda",
    "zipCode": "12345-678"
  }
]
```

---

### POST `/api/users/addresses`

Criar endereço para o usuário logado (requer autenticação)

**Autenticação:** Criar endereço para o **usuário logado via token JWT**
- O endereço será associado ao usuário do token

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "street": "Rua Principal, 123",
  "city": "Luanda",
  "zipCode": "12345-678"
}
```

**Response 201:**
```json
{
  "id": "addr-123",
  "street": "Rua Principal, 123",
  "city": "Luanda",
  "zipCode": "12345-678"
}
```

---

### PUT `/api/users/addresses/:id`

Atualizar endereço do usuário logado (requer autenticação)

**Autenticação:** Atualizar endereço do **usuário logado via token JWT**
- Apenas o usuário proprietário do endereço pode atualizá-lo

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "street": "Rua Nova, 456",
  "city": "Bengo",
  "zipCode": "98765-432"
}
```

**Response 200:**
```json
{
  "id": "addr-123",
  "street": "Rua Nova, 456",
  "city": "Bengo",
  "zipCode": "98765-432"
}
```

---

### DELETE `/api/users/addresses/:id`

Deletar endereço do usuário logado (requer autenticação)

**Autenticação:** Deletar endereço do **usuário logado via token JWT**
- Apenas o usuário proprietário do endereço pode deletá-lo

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "message": "Endereço deletado com sucesso"
}
```

---

## Lojas

### POST `/api/shops`

Criar nova loja (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Loja de Eletrônicos",
  "description": "Vendemos eletrônicos de alta qualidade",
  "category": "Eletrônicos"
}
```

**Response 201:**
```json
{
  "id": "shop-123",
  "name": "Loja de Eletrônicos",
  "description": "Vendemos eletrônicos de alta qualidade"
}
```

---

### GET `/api/shops/my`

Obter minhas lojas (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
[
  {
    "id": "shop-123",
    "name": "Loja de Eletrônicos",
    "description": "Vendemos eletrônicos de alta qualidade"
  }
]
```

---

### GET `/api/shops/search`

Buscar lojas

**Query Parameters:**
- `q` (string): Termo de busca
- `category` (string): Categoria

**Example:** `GET /api/shops/search?q=eletrônicos&category=tech`

**Response 200:**
```json
[
  {
    "id": "shop-123",
    "name": "Loja de Eletrônicos",
    "description": "Vendemos eletrônicos de alta qualidade"
  }
]
```

---

### GET `/api/shops`

Listar todas as lojas

**Query Parameters:**
- `page` (integer): Página
- `limit` (integer): Itens por página

**Response 200:**
```json
[
  {
    "id": "shop-123",
    "name": "Loja de Eletrônicos",
    "description": "Vendemos eletrônicos de alta qualidade"
  }
]
```

---

### GET `/api/shops/:id`

Obter loja por ID

**Response 200:**
```json
{
  "id": "shop-123",
  "name": "Loja de Eletrônicos",
  "description": "Vendemos eletrônicos de alta qualidade",
  "category": "Eletrônicos"
}
```

---

### GET `/api/shops/:id/statistics`

Obter estatísticas da loja (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "totalProducts": 150,
  "totalOrders": 450,
  "totalRevenue": 50000.00
}
```

---

### GET `/api/shops/:id/settings`

Obter configurações da loja (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "currency": "AOA",
  "timezone": "Africa/Luanda"
}
```

---

### PUT `/api/shops/:id/settings`

Atualizar configurações da loja (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "currency": "USD",
  "timezone": "Africa/Luanda"
}
```

**Response 200:**
```json
{
  "message": "Configurações atualizadas com sucesso"
}
```

---

### PUT `/api/shops/:id`

Atualizar loja (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Loja de Eletrônicos Premium",
  "description": "Vendemos eletrônicos premium de alta qualidade",
  "category": "Eletrônicos"
}
```

**Response 200:**
```json
{
  "id": "shop-123",
  "name": "Loja de Eletrônicos Premium",
  "description": "Vendemos eletrônicos premium de alta qualidade"
}
```

---

### DELETE `/api/shops/:id`

Deletar loja (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "message": "Loja deletada com sucesso"
}
```

---

## Produtos

### POST `/api/products`

Criar produto (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Smartphone XYZ",
  "description": "Smartphone de alta performance",
  "price": 50000.00,
  "category": "Eletrônicos"
}
```

**Response 201:**
```json
{
  "id": "prod-123",
  "name": "Smartphone XYZ",
  "price": 50000.00
}
```

---

### GET `/api/products/search`

Buscar produtos

**Query Parameters:**
- `q` (string): Termo de busca
- `category` (string): Categoria
- `minPrice` (number): Preço mínimo
- `maxPrice` (number): Preço máximo

**Example:** `GET /api/products/search?q=smartphone&minPrice=40000&maxPrice=60000`

**Response 200:**
```json
[
  {
    "id": "prod-123",
    "name": "Smartphone XYZ",
    "price": 50000.00
  }
]
```

---

### GET `/api/products/statistics`

Obter estatísticas de produtos (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "totalProducts": 1500,
  "totalCategories": 25,
  "averagePrice": 35000.00
}
```

---

### GET `/api/products/analytics`

Obter analytics de produtos (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "views": 50000,
  "sales": 1200,
  "revenue": 60000000.00
}
```

---

### GET `/api/products`

Listar produtos

**Query Parameters:**
- `page` (integer): Página
- `limit` (integer): Itens por página

**Response 200:**
```json
[
  {
    "id": "prod-123",
    "name": "Smartphone XYZ",
    "price": 50000.00
  }
]
```

---

### GET `/api/products/:id`

Obter produto por ID

**Response 200:**
```json
{
  "id": "prod-123",
  "name": "Smartphone XYZ",
  "description": "Smartphone de alta performance",
  "price": 50000.00
}
```

---

### PUT `/api/products/:id`

Atualizar produto (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Smartphone XYZ Pro",
  "description": "Smartphone pro de alta performance",
  "price": 60000.00
}
```

**Response 200:**
```json
{
  "id": "prod-123",
  "name": "Smartphone XYZ Pro",
  "price": 60000.00
}
```

---

### DELETE `/api/products/:id`

Deletar produto (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "message": "Produto deletado com sucesso"
}
```

---

### POST `/api/products/:productId/variants`

Criar variante de produto (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Cores: Preto, 128GB",
  "price": 50000.00,
  "stock": 100
}
```

**Response 201:**
```json
{
  "id": "var-123",
  "name": "Cores: Preto, 128GB",
  "price": 50000.00
}
```

---

### GET `/api/products/:productId/variants`

Obter variantes do produto

**Response 200:**
```json
[
  {
    "id": "var-123",
    "name": "Cores: Preto, 128GB",
    "price": 50000.00
  }
]
```

---

### GET `/api/products/:productId/variants/:variantId`

Obter variante específica

**Response 200:**
```json
{
  "id": "var-123",
  "name": "Cores: Preto, 128GB",
  "price": 50000.00
}
```

---

### PUT `/api/products/:productId/variants/:variantId`

Atualizar variante (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Cores: Preto, 256GB",
  "price": 60000.00
}
```

**Response 200:**
```json
{
  "id": "var-123",
  "name": "Cores: Preto, 256GB",
  "price": 60000.00
}
```

---

### DELETE `/api/products/:productId/variants/:variantId`

Deletar variante (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "message": "Variante deletada com sucesso"
}
```

---

### PATCH `/api/products/:productId/variants/:variantId/stock`

Atualizar estoque da variante (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "stock": 150
}
```

**Response 200:**
```json
{
  "message": "Estoque atualizado com sucesso"
}
```

---

### GET `/api/products/inventory/alerts`

Obter alertas de baixo estoque (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
[
  {
    "productId": "prod-123",
    "name": "Smartphone XYZ",
    "stock": 5
  }
]
```

---

### GET `/api/products/inventory/report`

Obter relatório de inventário (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "totalProducts": 1500,
  "totalStock": 50000,
  "lowStockItems": 25
}
```

---

### PATCH `/api/products/inventory/bulk-stock`

Atualizar estoque em lote (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
[
  {
    "productId": "prod-123",
    "stock": 100
  },
  {
    "productId": "prod-456",
    "stock": 50
  }
]
```

**Response 200:**
```json
{
  "message": "Estoque atualizado com sucesso"
}
```

---

### GET `/api/products/:productId/reviews`

Obter avaliações do produto

**Response 200:**
```json
[
  {
    "id": "rev-123",
    "rating": 5,
    "comment": "Excelente produto!"
  }
]
```

---

### PATCH `/api/products/:productId/reviews/:reviewId/moderation`

Moderar avaliação (admin apenas)

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "status": "approved"
}
```

**Response 200:**
```json
{
  "message": "Avaliação moderada com sucesso"
}
```

---

### GET `/api/products/reviews/statistics`

Obter estatísticas de avaliações (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "totalReviews": 5000,
  "averageRating": 4.5,
  "pendingModeration": 50
}
```

---

### PATCH `/api/products/reviews/bulk-moderation`

Moderar avaliações em lote (admin apenas)

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
[
  {
    "reviewId": "rev-123",
    "status": "approved"
  },
  {
    "reviewId": "rev-456",
    "status": "rejected"
  }
]
```

**Response 200:**
```json
{
  "message": "Avaliações moderadas com sucesso"
}
```

---

### POST `/api/products/:productId/tags`

Adicionar tag ao produto (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "tagId": "tag-123"
}
```

**Response 200:**
```json
{
  "message": "Tag adicionada com sucesso"
}
```

---

### DELETE `/api/products/:productId/tags/:tagId`

Remover tag do produto (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "message": "Tag removida com sucesso"
}
```

---

### GET `/api/products/:productId/tags`

Obter tags do produto

**Response 200:**
```json
[
  {
    "id": "tag-123",
    "name": "Premium"
  }
]
```

---

### POST `/api/products/tags`

Criar tag (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Premium",
  "color": "#FF0000"
}
```

**Response 201:**
```json
{
  "id": "tag-123",
  "name": "Premium"
}
```

---

### GET `/api/products/tags`

Listar tags

**Response 200:**
```json
[
  {
    "id": "tag-123",
    "name": "Premium"
  }
]
```

---

### PUT `/api/products/tags/:id`

Atualizar tag (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Premium Plus",
  "color": "#00FF00"
}
```

**Response 200:**
```json
{
  "id": "tag-123",
  "name": "Premium Plus"
}
```

---

### DELETE `/api/products/tags/:id`

Deletar tag (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "message": "Tag deletada com sucesso"
}
```

---

### POST `/api/products/categories`

Criar categoria (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Eletrônicos",
  "description": "Produtos eletrônicos em geral"
}
```

**Response 201:**
```json
{
  "id": "cat-123",
  "name": "Eletrônicos"
}
```

---

### GET `/api/products/categories`

Listar categorias

**Response 200:**
```json
[
  {
    "id": "cat-123",
    "name": "Eletrônicos",
    "description": "Produtos eletrônicos em geral"
  }
]
```

---

### PUT `/api/products/categories/:id`

Atualizar categoria (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Eletrônicos Premium",
  "description": "Produtos eletrônicos de alta qualidade"
}
```

**Response 200:**
```json
{
  "id": "cat-123",
  "name": "Eletrônicos Premium"
}
```

---

### DELETE `/api/products/categories/:id`

Deletar categoria (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "message": "Categoria deletada com sucesso"
}
```

---

### GET `/api/products/:productId/activity`

Obter resumo de atividade do produto

**Response 200:**
```json
{
  "views": 5000,
  "sales": 150,
  "lastUpdated": "2025-11-04T10:30:00Z"
}
```

---

## Avaliações

### POST `/api/reviews`

Criar avaliação (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "productId": "prod-123",
  "rating": 5,
  "comment": "Produto excelente, recomendo!"
}
```

**Response 201:**
```json
{
  "id": "rev-123",
  "rating": 5,
  "comment": "Produto excelente, recomendo!"
}
```

---

### GET `/api/reviews/:id`

Obter avaliação por ID

**Response 200:**
```json
{
  "id": "rev-123",
  "rating": 5,
  "comment": "Produto excelente, recomendo!"
}
```

---

### PUT `/api/reviews/:id`

Atualizar avaliação (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Produto bom, mas poderia melhorar"
}
```

**Response 200:**
```json
{
  "id": "rev-123",
  "rating": 4,
  "comment": "Produto bom, mas poderia melhorar"
}
```

---

### DELETE `/api/reviews/:id`

Deletar avaliação (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "message": "Avaliação deletada com sucesso"
}
```

---

### GET `/api/reviews/products/:productId`

Obter avaliações do produto

**Response 200:**
```json
[
  {
    "id": "rev-123",
    "rating": 5,
    "comment": "Excelente!"
  }
]
```

---

### GET `/api/reviews/products/:productId/stats`

Obter estatísticas de avaliação do produto

**Response 200:**
```json
{
  "averageRating": 4.5,
  "totalReviews": 120,
  "ratingDistribution": {
    "1": 5,
    "2": 10,
    "3": 20,
    "4": 40,
    "5": 45
  }
}
```

---

### GET `/api/reviews/shops/:shopId`

Obter avaliações da loja

**Response 200:**
```json
[
  {
    "id": "rev-123",
    "rating": 5,
    "comment": "Ótima loja!"
  }
]
```

---

### GET `/api/reviews/my-reviews`

Obter minhas avaliações (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
[
  {
    "id": "rev-123",
    "rating": 5,
    "comment": "Produto excelente!"
  }
]
```

---

### PATCH `/api/reviews/:id/moderate`

Moderar avaliação (admin apenas)

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "status": "approved"
}
```

**Response 200:**
```json
{
  "message": "Avaliação moderada com sucesso"
}
```

---

## Pagamentos

### POST `/api/payments`

Criar pagamento (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "amount": 150000.00,
  "method": "card",
  "orderId": "order-123"
}
```

**Response 201:**
```json
{
  "id": "pay-123",
  "amount": 150000.00,
  "status": "pending"
}
```

---

### GET `/api/payments/:id`

Obter pagamento por ID (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "id": "pay-123",
  "amount": 150000.00,
  "status": "completed",
  "method": "card"
}
```

---

### PUT `/api/payments/:id`

Atualizar pagamento (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "completed",
  "amount": 150000.00
}
```

**Response 200:**
```json
{
  "id": "pay-123",
  "status": "completed"
}
```

---

### GET `/api/payments`

Listar pagamentos (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (integer): Página
- `limit` (integer): Itens por página
- `status` (string): Status do pagamento

**Response 200:**
```json
[
  {
    "id": "pay-123",
    "amount": 150000.00,
    "status": "completed"
  }
]
```

---

### POST `/api/payments/process`

Processar pagamento (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "paymentId": "pay-123"
}
```

**Response 200:**
```json
{
  "status": "completed",
  "transactionId": "trans-abc123"
}
```

---

### POST `/api/payments/:id/refund`

Reembolsar pagamento (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "amount": 150000.00,
  "reason": "Cliente solicitou cancelamento"
}
```

**Response 200:**
```json
{
  "status": "refunded",
  "refundId": "refund-123"
}
```

---

### GET `/api/payments/stats/summary`

Obter estatísticas de pagamentos (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "totalPayments": 5000,
  "totalRevenue": 500000000.00,
  "successfulPayments": 4800
}
```

---

## Pedidos

### POST `/api/orders`

Criar pedido (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": "prod-123",
      "quantity": 2
    }
  ],
  "shippingAddress": "Rua Principal, 123, Luanda"
}
```

**Response 201:**
```json
{
  "id": "order-123",
  "total": 100000.00,
  "status": "pending"
}
```

---

### GET `/api/orders`

Listar pedidos (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (integer): Página
- `limit` (integer): Itens por página
- `status` (string): Status do pedido

**Response 200:**
```json
[
  {
    "id": "order-123",
    "total": 100000.00,
    "status": "completed"
  }
]
```

---

### GET `/api/orders/:id`

Obter pedido por ID (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "id": "order-123",
  "total": 100000.00,
  "status": "completed",
  "items": [
    {
      "productId": "prod-123",
      "quantity": 2
    }
  ]
}
```

---

### PUT `/api/orders/:id`

Atualizar pedido (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "shippingAddress": "Rua Nova, 456, Bengo",
  "status": "processing"
}
```

**Response 200:**
```json
{
  "id": "order-123",
  "status": "processing"
}
```

---

### PUT `/api/orders/:id/status`

Atualizar status do pedido (admin apenas)

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "status": "shipped"
}
```

**Response 200:**
```json
{
  "id": "order-123",
  "status": "shipped"
}
```

---

### POST `/api/orders/:id/items`

Adicionar item ao pedido (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "productId": "prod-456",
  "quantity": 1
}
```

**Response 200:**
```json
{
  "message": "Item adicionado com sucesso"
}
```

---

### PUT `/api/orders/:id/items/:itemId`

Atualizar item do pedido (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response 200:**
```json
{
  "message": "Item atualizado com sucesso"
}
```

---

### DELETE `/api/orders/:id/items/:itemId`

Remover item do pedido (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "message": "Item removido com sucesso"
}
```

---

### GET `/api/orders/stats/summary`

Obter estatísticas de pedidos (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "totalOrders": 10000,
  "totalRevenue": 1000000000.00,
  "pendingOrders": 250
}
```

---

## Finanças

### POST `/api/finances/payments`

Criar pagamento financeiro (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "amount": 100000.00,
  "method": "transfer",
  "description": "Pagamento de produto"
}
```

**Response 201:**
```json
{
  "id": "fin-pay-123",
  "amount": 100000.00,
  "status": "pending"
}
```

---

### GET `/api/finances/payments`

Listar pagamentos financeiros (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (integer): Página
- `limit` (integer): Itens por página

**Response 200:**
```json
[
  {
    "id": "fin-pay-123",
    "amount": 100000.00,
    "status": "completed"
  }
]
```

---

### GET `/api/finances/payments/:id`

Obter pagamento financeiro por ID (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "id": "fin-pay-123",
  "amount": 100000.00,
  "status": "completed"
}
```

---

### PUT `/api/finances/payments/:id`

Atualizar pagamento financeiro (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "completed",
  "amount": 100000.00
}
```

**Response 200:**
```json
{
  "id": "fin-pay-123",
  "status": "completed"
}
```

---

### POST `/api/finances/transactions`

Criar transação financeira (admin apenas)

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "amount": 500000.00,
  "type": "income",
  "description": "Receita do mês"
}
```

**Response 201:**
```json
{
  "id": "fin-trans-123",
  "amount": 500000.00,
  "type": "income"
}
```

---

### GET `/api/finances/transactions`

Listar transações financeiras (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (integer): Página
- `limit` (integer): Itens por página

**Response 200:**
```json
[
  {
    "id": "fin-trans-123",
    "amount": 500000.00,
    "type": "income"
  }
]
```

---

### GET `/api/finances/transactions/:id`

Obter transação financeira por ID (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "id": "fin-trans-123",
  "amount": 500000.00,
  "type": "income"
}
```

---

### PUT `/api/finances/transactions/:id`

Atualizar transação financeira (admin apenas)

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "amount": 600000.00
}
```

**Response 200:**
```json
{
  "id": "fin-trans-123",
  "amount": 600000.00"
}
```

---

### GET `/api/finances/stats`

Obter estatísticas financeiras (admin apenas)

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Response 200:**
```json
{
  "totalIncome": 5000000000.00,
  "totalExpense": 1000000000.00,
  "balance": 4000000000.00,
  "monthlyRevenue": 400000000.00
}
```

---

## Integrações

### POST `/api/integrations`

Criar integração (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Integração Stripe",
  "type": "payment_gateway",
  "config": {
    "apiKey": "sk_live_123456789",
    "publicKey": "pk_live_123456789"
  }
}
```

**Response 201:**
```json
{
  "id": "integ-123",
  "name": "Integração Stripe",
  "status": "active"
}
```

---

### GET `/api/integrations`

Listar integrações (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
[
  {
    "id": "integ-123",
    "name": "Integração Stripe",
    "type": "payment_gateway",
    "status": "active"
  }
]
```

---

### GET `/api/integrations/:id`

Obter integração por ID (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "id": "integ-123",
  "name": "Integração Stripe",
  "type": "payment_gateway",
  "status": "active"
}
```

---

### PUT `/api/integrations/:id`

Atualizar integração (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Integração Stripe V2",
  "config": {
    "apiKey": "sk_live_987654321"
  }
}
```

**Response 200:**
```json
{
  "id": "integ-123",
  "name": "Integração Stripe V2",
  "status": "active"
}
```

---

### DELETE `/api/integrations/:id`

Deletar integração (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "message": "Integração deletada com sucesso"
}
```

---

### POST `/api/integrations/:id/connect`

Conectar integração (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "credentials": {
    "apiKey": "sk_live_123456789"
  }
}
```

**Response 200:**
```json
{
  "status": "connected",
  "message": "Integração conectada com sucesso"
}
```

---

### POST `/api/integrations/:id/disconnect`

Desconectar integração (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "status": "disconnected",
  "message": "Integração desconectada com sucesso"
}
```

---

### POST `/api/integrations/:id/test`

Testar integração (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "status": "success",
  "message": "Integração testada com sucesso"
}
```

---

## Headers e Autenticação

### Padrão de Autenticação

Todos os endpoints que requerem autenticação usam **Bearer Token** no header `Authorization`:

```
Authorization: Bearer {token_jwt}
```

### Headers Comuns

```http
Content-Type: application/json
Authorization: Bearer {token_jwt}
```

### Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token inválido ou ausente |
| 403 | Forbidden - Sem permissão para acessar |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

### Tratamento de Erros

**Response 400:**
```json
{
  "statusCode": 400,
  "code": "FST_ERR_REQ_FILE_TOO_LARGE",
  "error": "Bad Request",
  "message": "Corpo da requisição muito grande"
}
```

**Response 401:**
```json
{
  "statusCode": 401,
  "code": "UNAUTHORIZED",
  "error": "Unauthorized",
  "message": "Token expirado ou inválido"
}
```

**Response 403:**
```json
{
  "statusCode": 403,
  "code": "FORBIDDEN",
  "error": "Forbidden",
  "message": "Você não tem permissão para acessar este recurso"
}
```

---

## Rate Limiting

A API implementa rate limiting para proteção:

- **Limite padrão:** 100 requisições por 15 minutos
- **Headers de resposta:**
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1699106400
  ```

---

## Exemplos de Integração Frontend

### JavaScript/Fetch

```javascript
// Login
const response = await fetch('https://api.yourapp.com/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'senha123456'
  })
});

const data = await response.json();
const token = data.token;

// Requisição autenticada
const profileResponse = await fetch('https://api.yourapp.com/api/users/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const profile = await profileResponse.json();
```

### React com Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.yourapp.com/api'
});

// Login
const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  return data;
};

// Requisição autenticada
const getProfile = async () => {
  const { data } = await api.get('/users/profile');
  return data;
};
```

---

## Informações de Contato

Para dúvidas ou sugestões sobre a integração:
- Email: dev@backplataform.com
- Documentação: https://docs.backplataform.com
- Status da API: https://status.backplataform.com

---

**Última atualização:** 04/11/2025  
**Versão da API:** 1.0.0
