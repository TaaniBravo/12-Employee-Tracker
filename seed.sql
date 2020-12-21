USE employee_tracker_db;
INSERT INTO
  department (department_name)
VALUES
  ('Management'),
  ('Engineering'),
  ('Internship');
INSERT INTO
  role_info (title, salary, department_id)
VALUES
  ("Project Lead", 100000, 1),
  ('Sr. Developer', 80000, 2),
  ('Jr. Developer', 65000, 2),
  ('Intern', 50000, 3);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Marshall', 'Mathers', 1, null),
  ('Aubrey', 'Graham', 1, null),
  ('Kendrick', 'Duckworth', 2, 1),
  ('Kanye', 'West', 2, 2),
  ('Shawn', 'Carter', 3, 1),
  ('Dwayne', 'Carter', 3, 2),
  ('Jacques', 'Webster', 4, 1),
  ('Austin', 'Post', 4, 2);

SELECT title FROM role_info