-- Active: 1715766763921@@127.0.0.1@3306@reminder
-- Date: 2024-09-12 15:12:43
-- Version: 1.0.0
-- Type: MySQL
-- Note:

create database reminder;

use reminder;


DELIMITER //

CREATE TRIGGER after_user_insert_settings
AFTER INSERT ON user
FOR EACH ROW
BEGIN
    INSERT INTO settings (user_id, setting_email_cc) 
    VALUES (NEW.id, NULL);
END;

//
DELIMITER ;


create table user (
    id int primary key auto_increment NOT NULL,
    firstname varchar(55) NOT NULL,
    email varchar(80) NOT NULL UNIQUE,
    password varchar(250) NOT NULL
);

create table friend (
    id int primary key auto_increment NOT NULL,
    firstname varchar(55) NOT NULL,
    lastname varchar(55) NOT NULL,
    birthday DATE NOT NULL,
    user_id int not null,
    reminder_15 BIT DEFAULT 0,
    foreign key (user_id) references user (id)
);

CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL UNIQUE,
    setting_email_cc VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- table user
INSERT INTO
    user (firstname, email, password)
VALUES (
        'Alice',
        'test@example.com',
        'azerty'
    );

-- table friend

INSERT INTO
    friend (firstname, lastname, birthday, user_id, reminder_15)
VALUES (
        'Alice',
        'Smith',
        '1989-12-09',
        1,
        1
    ),
    ('Bob', 'Johnson', '1989-1-29',
        1,
        1),
    ('Henri', 'Motte', '1989-7-11',
        1,
        1),
    (
        'Pascal',
        'Filoma',
        '1989-7-9',
        1,
        1
    ),
    (
        'Gabriel',
        'Lefetch',
        '1989-7-21',
        1,
        1
    ),
    (
        'Jean-claude',
        'dutruc',
        '1989-7-16',
        1,
        1
    ),
    (
        'Pauline',
        'ricola',
        '1989-7-30',
        1,
        1
    ),
    (
        'Stéphanie',
        'orutune',
        '1989-8-12',
        1,
        1
    ),
    ('test15', 'quizaine', '2000-3-23',
        1,
        1),
    ('Bob', 'Johnson', '1989-8-2',
        1,
        1),
    ('Bob', 'Johnson', '1989-8-28',
        1,
        1),
    (
        'Charlie',
        'Brown',
        '1989-7-19',
        1,
        1
    ),
    (
        'Diana',
        'Prince',
        '1989-5-08',
        1,
        1
    ),
    ('Eva', 'Green', '2002-3-02',
        1,
        1);
    INSERT INTO settings (user_id, setting_email_cc)
    VALUES 
        (1, 'cc@example.com');