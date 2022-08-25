--drop table if exists products

CREATE table IF NOT EXISTS products (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	title TEXT NOT NULL,
	description TEXT NOT NULL,
	price INTEGER
)

--seed data for products
insert into products(
title,description,price
) values 
('Product_1','First Product description',100),
('Product_2','Second Product description',200),
('Product_3','Third Product description',300),
('Product_4','Fourth Product description',400),
('Product_5','Fivth Product description',500),
('Product_6','Sixth Product description',600)

select * from products
