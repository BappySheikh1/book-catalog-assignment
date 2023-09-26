Live Link: https://book-catalog-prisma-nine.vercel.app/

## Application Routes:


#### User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/8bee78f8-c287-4a0a-bcf6-306d8a435fae (Single GET) 
- api/v1/users/8bee78f8-c287-4a0a-bcf6-306d8a435fae (PATCH)
- api/v1/users/8bee78f8-c287-4a0a-bcf6-306d8a435fae (DELETE) 
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/3158d49d-abed-42e4-91b7-b8484d4456a3 (Single GET) 
- api/v1/categories/3158d49d-abed-42e4-91b7-b8484d4456a3 (PATCH)
- api/v1/categories/3158d49d-abed-42e4-91b7-b8484d4456a3 (DELETE)

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET) 
- api/v1/orders/:orderId (GET)
