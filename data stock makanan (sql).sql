-- ========== RESQ INVENTORY MANAGEMENT ==========

-- Hapus database jika sudah ada (opsional)
DROP DATABASE IF EXISTS resQ;

-- 1. membuat database
CREATE DATABASE resQ;
USE resQ;

-- 2. buat Tabel
CREATE TABLE inventory_bahan (
    itemID INT AUTO_INCREMENT PRIMARY KEY,
    itemName VARCHAR(100) NOT NULL,
    category ENUM('Meat', 'Bread', 'Dairy', 'Vegetables') NOT NULL,
    quantityStock INT NOT NULL,
    expiryDate DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. masukkan data
INSERT INTO inventory_bahan (itemName, category, quantityStock, expiryDate) 
VALUES 
('Chicken Breast', 'Meat', 15, DATE_ADD(CURDATE(), INTERVAL 5 DAY)),
('Beef Sirloin', 'Meat', 10, DATE_ADD(CURDATE(), INTERVAL 7 DAY)),
('Whole Wheat Bread', 'Bread', 20, DATE_ADD(CURDATE(), INTERVAL 3 DAY)),
('Baguette', 'Bread', 12, DATE_ADD(CURDATE(), INTERVAL 2 DAY)),
('Greek Yogurt', 'Dairy', 10, DATE_ADD(CURDATE(), INTERVAL 4 DAY)),
('Susu UHT', 'Dairy', 15, DATE_ADD(CURDATE(), INTERVAL 10 DAY)),
('Tomato', 'Vegetables', 25, DATE_ADD(CURDATE(), INTERVAL 3 DAY)),
('Cabbage', 'Vegetables', 8, DATE_ADD(CURDATE(), INTERVAL 5 DAY)),
('Spinach', 'Vegetables', 5, DATE_ADD(CURDATE(), INTERVAL 2 DAY)),
('Broccoli', 'Vegetables', 12, DATE_ADD(CURDATE(), INTERVAL 4 DAY));

-- 4. nampilin hasil
SELECT 
    itemID AS 'ID',
    itemName AS 'Nama Bahan',
    category AS 'Kategori',
    quantityStock AS 'Stok (unit)',
    expiryDate AS 'Tanggal Kadaluarsa',
    DATEDIFF(expiryDate, CURDATE()) AS 'Sisa Hari',
    CASE 
        WHEN DATEDIFF(expiryDate, CURDATE()) <= 2 THEN 'Segera Digunakan'
        WHEN DATEDIFF(expiryDate, CURDATE()) <= 5 THEN 'Hati-hati'
        ELSE 'Aman'
    END AS 'Status'
FROM inventory_bahan
ORDER BY expiryDate ASC;

