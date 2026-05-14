-- Admin (Password: admin123)
INSERT INTO users
(full_name, age, address, phone, email, password, role)
VALUES
(
    'System Admin',
    30,
    'Portsmouth',
    '07123456789',
    'admin@gmail.com',
    'admin123',
    'admin'
);

-- Student 
INSERT INTO users
(full_name, age, address, phone, email, password, role)
VALUES
('Emma Johnson',21,'London','07111111111','emmajohnson@gmail.com','emma123','student'),
('Daniel Smith',23,'Manchester','07222222222','danielsmith@gmail.com','daniel123','student'),
('Sophia Williams',20,'Birmingham','07333333333','sophiawilliams@gmail.com','sophia123','student'),
('James Brown',24,'Liverpool','07444444444','jamesbrown@gmail.com','james123','student'),
('Olivia Taylor',22,'Leeds','07555555555','oliviataylor@gmail.com','olivia123','student');

-- Univerirties
INSERT INTO universities
(name, country, city, courses, tuition, description, image, website)
VALUES
('University of Portsmouth','UK','Portsmouth','Business · IT · Engineering','£15,000/year',
'A modern UK university known for strong industry links and career-focused programs.',
'../images/portsmouth.jpg','https://www.port.ac.uk'
),
('University of Manchester','UK','Manchester','Medicine · Law · Finance','£18,000/year',
'A prestigious Russell Group university with strong global research reputation.',
'../images/manchester.jpg',
'https://www.manchester.ac.uk'
),
('Harvard University','USA','Cambridge','Business · Law · Politics','$45,000/year',
'One of the world''s top universities known for leadership and academic excellence.',
'../images/Harvard.jpg',
'https://www.harvard.edu'
),
('Stanford University','USA','California','Engineering · AI · Business','$50,000/year',
'A leading innovation hub located in Silicon Valley.',
'../images/Stanford.jpg',
'https://www.stanford.edu'
),
(
'University of Toronto','Canada','Toronto','Health · IT · Business','$30,000/year',
'Canada''s top university known for research and global recognition.',
'../images/Toronto.jpg',
'https://www.utoronto.ca'
),
('University of Melbourne','Australia','Melbourne','Business · Law · Medicine','$32,000/year',
'Australia''s top-ranked university with a strong global reputation.',
'../images/Melbourne.jpg',
'https://www.unimelb.edu.au'
);