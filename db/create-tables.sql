DROP TABLE IF EXISTS consultations;
DROP TABLE IF EXISTS enquiries;
DROP TABLE IF EXISTS universities;
DROP TABLE IF EXISTS users;

-- EduBridge Tables for CW2

CREATE TYPE user_role AS ENUM ('student', 'admin');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    age INTEGER CHECK (age >= 16 AND age <= 100),
    address VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,           
    role user_role DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    courses TEXT,
    tuition VARCHAR(100),
    description TEXT,
    image VARCHAR(255),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE consultations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    address VARCHAR(255),
    study_level VARCHAR(100),
    preferred_date DATE,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enquiries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);