CREATE TABLE IF NOT EXISTS orderItems(
    orderId integer NOT NULL,
    productId integer NOT NULL,
    productQuantity integer NOT NULL,
    FOREIGN KEY (productId) REFERENCES products(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (orderId) REFERENCES orders(id)             
    ON DELETE CASCADE
    ON  UPDATE CASCADE
);