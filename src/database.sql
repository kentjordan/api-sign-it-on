CREATE DATABASE signiton;

CREATE TABLE "user"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE answer(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_answer_right BOOLEAN NOT NULL,
    user_id UUID NOT NULL,
    CONSTRAINT fk_user_id 
        FOREIGN KEY (user_id) REFERENCES "user"(id)
);