Structured Query Language
1. Initialize in terminal: `sql postgres -U postgres`
2. Create a table
```
CREATE TABLE students(
	studentId BIGINT PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	phone_number BIGINT
);
````
3. Creating database isn't enough, you must also connect: `\c <database>`
4. List all created datatables: `\dt`
	- List info about table: `\d mytable`
5. Add row: `INSERT INTO mytable VALUES (2,1)`
	 or `INSERT INTO mytable(n2,n1) VALUES (1,2)`
6. Change single cell: `UPDATE department SET location_id = 2500 WHERE department_id = 16;`
7. Delete data in a single cell: `DELETE FROM departments WHERE department_id = 16`
8. Remove entire table from database: `DROP TABLE students`
9. Print data from specific columns: `SELECT product_name, quantity_per_unit FROM products;`
	- Count Number of elements: `SELECT COUNT(*) FROM products WHERE unit_price > 1;`
	- Add values from rows together: `SELECT SUM(quantity_per_unit) FROM products;`
10. Joins
```
SELECT  
	employee.name,  
	salary.current_salary  
FROM  
	employee  
	INNER JOIN salary
		ON employee.id = salary.employee_id;
```
![[Screenshot 2024-02-20 at 11.05.11 PM 2.png]]
### Complex
```
INSERT INTO mytable(val1,val2,str3) VALUES (1,2,'hi'), (3,4,'yo'), (5,6,'wow')

// Add up all units which match category_id
SELECT category_id, SUM(units_in_stock)
FROM products
GROUP BY category_id;
HAVING SUM(units_in_stock) > 100; //filter sums

// Display all items that have a price greater than a Kit Kat
SELECT *
FROM products
// This is called a subquery
WHERE
  unit_price > (SELECT unit_price FROM products WHERE product_name = 'Kit Kat');
```