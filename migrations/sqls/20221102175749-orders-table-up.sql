CREATE TYPE typestatu AS ENUM ('Complete', 'Active');

CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    userId integer NOT NULL,
    status typestatu NOT NULL DEFAULT 'Active',
    FOREIGN KEY (userId) REFERENCES users(id) 
    ON DELETE CASCADE
    ON  UPDATE CASCADE,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);