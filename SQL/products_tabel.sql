CREATE TABLE products (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(4000) NOT NULL,
  price decimal(15,2) NOT NULL,
  quantity int NOT NULL,
  picture varchar(4000),
  description varchar(4000),
  PRIMARY KEY (id)
);
 
insert into products (name, price, quantity, picture, description) values ('Dator', 19000.00, 4, 'https://consumer-img.huawei.com/content/dam/huawei-cbg-site/cee-nordics/se/mkt/v4/plp/laptops/kv/matebookxpronew-0318.png', 'lorem ipsum');
insert into products (name, price, quantity, picture, description) values ('Dator', 14000.90, 2, 'https://itsale.se/wp-content/uploads/2018/01/Aerocool-Bolt.jpg', 'lorem ipsum');