create table user (
    id int primary key auto_increment NOT NULL,
    pseudo varchar(55) NOT NULL UNIQUE,
    email varchar(80) NOT NULL UNIQUE,
    password varchar(50) NOT NULL,
    birthday DATE,
    is_admin bool NOT NULL default 0
);

create table friend (
    id int primary key auto_increment NOT NULL,
    firstname varchar(55) NOT NULL,
    lastname varchar(55) NOT NULL,
    birthday DATE NOT NULL,
    user_id int NOT NULL,
    foreign key (user_id) references user (id)
);

create table marriage (
    user_id int NOT NULL,
    foreign key (user_id) references user (id),
    friend_id int NOT NULL,
    foreign key (friend_id) references friend (id),
    friend_id int NOT NULL UNIQUE,
    foreign key (friend_id) references friend (id),
    marriage_date DATE NOT NULL
);

-- table user
INSERT INTO
    user (
        pseudo,
        email,
        password,
        birthday,
        is_admin
    )
VALUES (
        'Alice',
        'alice.smith@example.com',
        'password123',
        '1989-12-09',
        'http://example.com/photos/alice.jpg',
        TRUE
    ),
    (
        'Bob',
        'bob.johnson@example.com',
        'securepassword',
        'http://example.com/photos/bob.jpg',
        FALSE
    ),
    (
        'Charlie',
        'charlie.brown@example.com',
        'mypassword',
        'http://example.com/photos/charlie.jpg',
        TRUE
    ),
    (
        'Diana',
        'diana.prince@example.com',
        'dianaPW',
        'http://example.com/photos/diana.jpg',
        FALSE
    ),
    (
        'Eva',
        'eva.green@example.com',
        'evaPassword',
        'http://example.com/photos/eva.jpg',
        FALSE
    );

-- table friend

INSERT INTO
    friend (firstname, lastname, birthday)
VALUES (
        'Alice',
        'Smith',
        '1989-12-09'
    ),
    (
        'Bob',
        'Johnson',
        '1989-12-09'
    ),
    (
        'Charlie',
        'Brown',
        '1989-12-09'
    ),
    (
        'Diana',
        'Prince',
        '1989-12-09'
    ),
    ('Eva', 'Green', '1989-12-09');