-- SQL Data Input for SmartNest Application

-- 1. Insert Categories
INSERT INTO categories (name, icon_url) VALUES 
('Dairy', 'milk-icon'),
('Meat', 'meat-icon'),
('Bread', 'bread-icon'),
('Fruits', 'fruit-icon');

-- 2. Insert Restaurants
INSERT INTO restaurants (name, address, rating, image_url) VALUES 
('Starbucks Purwokerto', 'Jl. Overste Isdiman No.11, Purwokerto Lor', 4.6, 'https://picsum.photos/seed/starbucks/400/300'),
('Holland Bakery', 'Jl. Overste Isdiman No.11, Purwokerto Lor', 4.6, 'https://picsum.photos/seed/holland/400/300'),
('Sushi Hiro', 'Jl. Overste Isdiman No.11, Purwokerto Lor', 4.6, 'https://picsum.photos/seed/sushihi/400/300'),
('Rita Super Mall', 'Jl. Overste Isdiman No.11, Purwokerto Lor', 4.6, 'https://picsum.photos/seed/mall/400/300');

-- 3. Insert Products (Surplus Items)
-- Relasi IDs berdasarkan urutan insert di atas (1: Starbucks, 2: Holland, 3: Sushi Hiro, 4: Rita)
-- Categories (1: Dairy, 2: Meat, 3: Bread, 4: Fruits)
INSERT INTO products (restaurant_id, category_id, name, description, price, surplus_price, rating, image_url, availability_tag, stock) VALUES 
(3, 2, 'Sushi Special', 'Delicious surplus sushi platter', 5.0, 3.5, 4.5, 'https://picsum.photos/seed/sushi/300/300', 'Pick up today', 5),
(4, 4, 'Vegetables Pack', 'Fresh surplus vegetables from Rita Mall', 3.0, 1.5, 4.5, 'https://picsum.photos/seed/veg/300/300', 'Pick up tomorrow', 10),
(1, 1, 'Hazelnut Coffee', 'Premium surplus brewed coffee', 2.5, 1.2, 4.5, 'https://picsum.photos/seed/coffee/300/300', 'Pick up today', 3),
(2, 3, 'Wheat Bread', 'Healthy surplus wheat bread', 2.0, 1.0, 4.6, 'https://picsum.photos/seed/holland/400/300', 'Pick up today', 8);

-- 4. Insert Initial User (Testing Account)
INSERT INTO users (name, email, password_hash, is_verified) VALUES 
('Admin SmartNest', 'admin@smartnest.com', '$2b$10$hashed_password_example', TRUE);

-- 5. Insert Sample Favourite (Admin likes Sushi)
INSERT INTO favourite_products (user_id, product_id) VALUES (1, 1);

-- 6. Insert Sample OTP (Demonstration Only)
INSERT INTO otp_verifications (email, code, expires_at) VALUES 
('fazafahri25@gmail.com', '1234', CURRENT_TIMESTAMP + INTERVAL '10 minutes');
