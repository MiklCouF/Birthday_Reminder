-- Active: 1715766763921@@127.0.0.1@3306@reminder
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
    foreign key (user_id) references user (id)
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
    friend (firstname, lastname, birthday)
VALUES (
        'Alice',
        'Smith',
        '1989-12-09'
    ),
    ('Bob', 'Johnson', '1989-1-29'),
    ('Henri', 'Motte', '1989-7-11'),
    (
        'Pascal',
        'Filoma',
        '1989-7-9'
    ),
    (
        'Gabriel',
        'Lefetch',
        '1989-7-21'
    ),
    (
        'Jean-claude',
        'dutruc',
        '1989-7-16'
    ),
    (
        'Pauline',
        'ricola',
        '1989-7-30'
    ),
    (
        'Stéphanie',
        'orutune',
        '1989-8-12'
    ),
    ('Bob', 'Johnson', '1989-8-18'),
    ('Bob', 'Johnson', '1989-8-2'),
    ('Bob', 'Johnson', '1989-8-28'),
    (
        'Charlie',
        'Brown',
        '1989-7-19'
    ),
    (
        'Diana',
        'Prince',
        '1989-5-08'
    ),
    ('Eva', 'Green', '2002-3-02');