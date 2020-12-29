USE employee_tracker_db;
INSERT INTO
  department (department_name)
VALUES
  ('Accounting'),
  ('Engineering'),
  ('Internship');
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("CFO", 1000000, 1),
  ("Corporate Controller", 500000, 1),
  ("Sr. Accountant", 100000, 1),
  ("Project Lead", 200000, 2),
  ('Sr. Developer', 80000, 2),
  ('Jr. Developer', 65000, 2),
  ('Accounting Intern', 50000, 3),
  ('Development Intern', 50000, 3);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Marshall', 'Mathers', 1, null),
  ('Aubrey', 'Graham', 4, null),
  ('Kendrick', 'Duckworth', 2, 1),
  ('Kanye', 'West', 3, 1),
  ('Shawn', 'Carter', 3, 1),
  ('Dwayne', 'Carter', 5, 2),
  ('Jacques', 'Webster', 6, 2),
  ('Austin', 'Post', 7, 1),
  ('Scott', 'Mescudi', 5, 2);