----drop table if exists stocks

CREATE TABLE IF NOT EXISTS stocks (
	id serial PRIMARY KEY,
		count INTEGER,
	product_id uuid,
	CONSTRAINT fk_products
      FOREIGN KEY(product_id) 
	  REFERENCES products(id)
)

--Fill product_ids from products table
insert into stocks(
product_id,count
) values 
('f5fdcedf-9e45-456b-8e10-a7087567dec1',10),
('6a359846-bcc9-438d-beb3-f139e2998e27',20),
('094d9b41-c392-4d36-b1de-a94138ff5d21',30),
('dd0f3014-2f3e-4d82-a147-1e5aa8f44d88',40),
('c978f1f9-c2cb-424d-84a6-5e4af2139cdf',50),
('248ef0df-99e4-4e12-8887-b3305f7f22aa',60)

select * from stocks 

--inner join query
select p.title,p.price,s.count from products p inner join stocks s on p.id = s.product_id

--query without join
select p.title,p.price,s.count from products p, stocks s where p.id = s.product_id