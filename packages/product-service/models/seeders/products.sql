create extension if not exists "pgcrypto";
drop table if exists stocks;
drop table if exists products;

create table products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default null,
  price integer not null
);

create table stocks (
	count int not null,
	product_id uuid unique not null,
	foreign key (product_id) references products(id)
);

insert into products (id, title, description, price) values
('a65e1ecc-7390-497b-98b6-1d24612c6a39', 'Optimeal Cat Adult Duck Hairball Control', '�������������� ����� ���� �� ������ ���� ����, �������������� ��������� ������ ������ � ������������ ����������� � �������� �����.', 54),
('155b8a21-17e2-4771-bc6a-5218a278773d', 'Purina Pro Plan Cat Adult Sterilised Turkey', '����� ���� �� ������ ���� ������� ��� ��������������� ����� � �������������� �����.', 105),
('c09ebdcf-e929-4247-9773-4d53da0010e8', 'Royal Canin Kitten', '���� ��� ����� �� 4 �� 12 �������', 117),
('652f4cc9-e636-428e-937d-ae500870d866', 'Purina Pro Plan Cat Adult Sterilised Salmon', '����� ���� �� ������� ���� ������ ��� ��������������� ����� � �������������� �����.', 105),
('007392b8-fc0d-42be-86bf-137ce6e544ce', 'Purina Pro Plan Kitten Chicken', '����� ���� ��� �����, ��������, ���������� � �������� ����� �� ������ ���� ������.', 93),
('a2a05730-8825-4172-ad84-203fa9a9e530', 'Optimeal Cat Adult High in Veal', '�������������� ����� ���� � ������� ����������� �������� ��� �������� �����.', 46),
('259b26ce-5e68-4552-ade4-d5db34687f05', 'Optimeal Kittens', '�������������� ������ ���� �� ������ ���� ������ ��� �����.', 46),
('4ab3b1c6-f2c4-4577-974a-aa5eb60d6681', 'Optimeal Cat Adult Grain Free Turkey & Vegetables', '�������������� ����������� ���� � �������� � ������� ��� �������� �����.', 79),
('902dea4b-9a85-4c87-bb24-ad28e506d3e6', 'Royal Canin Young Male S/O', '���� ��� ������� �������������� ����� � �������� �� 7 ���', 136),
('287dbcaa-4ced-48b2-b919-fba8743880a7', 'Purina Pro Plan Cat Adult Sterilised Rabbit', '����� ���� � �������� ��� ��������������� ����� � �������������� �����.', 310),
('b0f09c35-3c91-4506-8d5c-e45cb20d82a1', 'Cat Chow Special Care 3in1', '����� ���� �� ������ ���� ������� ��� �������� �����. ������� ������� - ������������ ��������� ������������ �������, ������������ ��������� ������ ������ �� ������� �����, � ����� ������������� ����������� ������� �����.', 63),
('351e63c9-0131-4a73-bc35-b7637da10c17', 'Royal Canin Hair & Skin Care', '�������������� ����� ���� ��� ����������� �������� � ������� ���� � ������ � �������� �����.', 133),
('8784585c-c680-4a91-a237-5e1a95b8ffaf', 'Optimeal Cat Adult Chicken', '�������������� ����� ���� �� ������ ���� ������ ��� �������� �����.', 46),
('647de1d6-75d8-4ebb-b80c-2bbe3ed2a753', 'Royal Canin Indoor 27', '�������������� ����� ���� ��� ����� ��������� �� 1 �� 7 ���, ������� � ���������.', 45),
('df35d092-5c8b-47de-a94d-167f3a3d6c6e', 'Purina Pro Plan Cat Adult Delicate Sensitive Turkey', '����� ���� ��� �������� ����� � �������������� �������� �� ������ ���� �������.', 102),
('8f8f5f14-9ad5-4c5a-96f0-8fc8b3f59b9e', 'Home Food � �������� � ������� ��� ��������������� �����', '�������������� ����� ���� � ����� ������� � ������� ��� ��������������� �����.', 81);


insert into stocks (product_id, count) values
('a65e1ecc-7390-497b-98b6-1d24612c6a39', 12),
('155b8a21-17e2-4771-bc6a-5218a278773d', 21),
('c09ebdcf-e929-4247-9773-4d53da0010e8', 15),
('652f4cc9-e636-428e-937d-ae500870d866', 13),
('007392b8-fc0d-42be-86bf-137ce6e544ce', 31),
('a2a05730-8825-4172-ad84-203fa9a9e530', 37),
('259b26ce-5e68-4552-ade4-d5db34687f05', 7),
('4ab3b1c6-f2c4-4577-974a-aa5eb60d6681', 8),
('902dea4b-9a85-4c87-bb24-ad28e506d3e6', 11),
('287dbcaa-4ced-48b2-b919-fba8743880a7', 41),
('b0f09c35-3c91-4506-8d5c-e45cb20d82a1', 32),
('351e63c9-0131-4a73-bc35-b7637da10c17', 22),
('8784585c-c680-4a91-a237-5e1a95b8ffaf', 26),
('647de1d6-75d8-4ebb-b80c-2bbe3ed2a753', 37),
('df35d092-5c8b-47de-a94d-167f3a3d6c6e', 19),
('8f8f5f14-9ad5-4c5a-96f0-8fc8b3f59b9e', 21);


