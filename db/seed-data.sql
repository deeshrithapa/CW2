-- Admin (Password: admin)
INSERT INTO users (full_name, age, address, phone, email, password, role)
VALUES ('Admin User', 35, 'Portsmouth, UK', '+44 123456789', 'admin@edubridge.com', 'admin', 'admin');

-- Student (Password: password)
INSERT INTO users (full_name, age, address, phone, email, password, role)
VALUES ('Aryan Thapa', 22, 'Kathmandu, Nepal', '+977 987654321', 'aryan@email.com', 'password', 'student');

INSERT INTO universities (name, country, city, courses, tuition, description, image, website) VALUES
('University of Portsmouth', 'UK', 'Portsmouth', 'Business · IT · Engineering', '£15,000/year', 'A modern UK university...', 'images/portsmouth.jpg', 'https://www.port.ac.uk'),
('University of Manchester', 'UK', 'Manchester', 'Medicine · Law · Finance', '£18,000/year', 'Prestigious university...', 'images/manchester.jpg', 'https://www.manchester.ac.uk'),
('Harvard University', 'USA', 'Cambridge', 'Business · Law · Politics', '$45,000/year', 'Top university...', 'images/Harvard.jpg', 'https://www.harvard.edu');