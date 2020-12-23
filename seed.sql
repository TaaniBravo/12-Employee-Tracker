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
SELECT
  e.id,
  e.first_name,
  e.last_name,
  r.title,
  d.department_name,
  r.salary,
  CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM
  employee e
  LEFT JOIN role_info r ON e.role_id = r.id
  LEFT JOIN department d ON r.department_id = d.id
  LEFT JOIN employee m ON m.id = e.manager_id
WHERE
  m.id = 1