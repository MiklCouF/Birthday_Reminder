create table user (
    id int primary key auto_increment NOT NULL,
    pseudo varchar(55) NOT NULL UNIQUE,
    email varchar(80) NOT NULL UNIQUE,
    password varchar(50) NOT NULL
);

create table friend (
    id int primary key auto_increment NOT NULL,
    firstname varchar(55) NOT NULL,
    lastname varchar(55) NOT NULL,
    birthday DATE NOT NULL,
    user_id int NOT NULL,
    foreign key (user_id) references user (id)
);

-- table user
INSERT INTO
    user (
        pseudo,
        email,
        password
    )
VALUES (
        'Alice',
        'alice.smith@example.com',
        'password123',
    ),
    (
        'Bob',
        'bob.johnson@example.com',
        'securepassword'
    ),
    (
        'Charlie',
        'charlie.brown@example.com',
        'mypassword',


    ),
    (
        'Diana',
        'diana.prince@example.com',
        'dianaPW'
    ),
    (
        'Eva',
        'eva.green@example.com',
        'evaPassword'
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