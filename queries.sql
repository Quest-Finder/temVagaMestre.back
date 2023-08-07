CREATE TABLE users (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    gender VARCHAR(30),
    age INT,
    experience INT,
    photo VARCHAR(255),
    description VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(180) UNIQUE NOT NULL,
    instagram VARCHAR(180),
    password VARCHAR(255) NOT NULL
);

CREATE TABLE master_style (
    id CHAR(36) NOT NULL PRIMARY KEY,
    style_name VARCHAR(120) NOT NULL,
    style_description VARCHAR(255) NOT NULL,
    master_id CHAR(36) NOT NULL,
    FOREIGN KEY master_id REFERENCES users(id)
);

CREATE TABLE character (
    id CHAR(36) NOT NULL PRIMARY KEY,
    character_name VARCHAR(120) NOT NULL,
    game_system VARCHAR(255) NOT NULL,
    class VARCHAR(180) NOT NULL,
    level INT NOT NULL,
    skills VARCHAR(255) NOT NULL,
    equipment VARCHAR(255) NOT NULL,
    other_details VARCHAR(255),
    player_id CHAR(36) NOT NULL,
    FOREIGN KEY player_id REFERENCES users(id)
);

CREATE TABLE rpg_table (
    id CHAR(36) NOT NULL PRIMARY KEY,
    table_name VARCHAR(180) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    campaign_theme VARCHAR(180) NOT NULL,
    campaign_theme_description VARCHAR(180) NOT NULL,
    master_style_id CHAR(36) NOT NULL,
    FOREIGN KEY master_style_id REFERENCES master_style(id)
);

CREATE TABLE table_participants (
    id CHAR(36) NOT NULL PRIMARY KEY,
    rpg_table_id CHAR(36) NOT NULL,
    character_id CHAR(36) NOT NULL,
    FOREIGN KEY rpg_table_id REFERENCES rpg_table(id),
    FOREIGN KEY character_id REFERENCES character(id)
);