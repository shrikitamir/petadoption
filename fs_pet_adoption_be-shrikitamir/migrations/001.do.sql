CREATE TABLE IF NOT EXISTS users (
    userId      INT AUTO_INCREMENT NOT NULL,
    email       varchar(255) NOT NULL,
    firstName   varchar(20) NOT NULL,
	lastName    varchar(20) NOT NULL,
    phone       varchar(10) NOT NULL ,
    password    varchar(255) NOT NULL,
    isAdmin     BOOLEAN DEFAULT 0,
    bio         varchar(85) DEFAULT 'No Bio',
    img         varchar(255) DEFAULT 'https://res.cloudinary.com/tamirshriki/image/upload/v1628339905/gwzxy7iecxfmvutshdmn.jpg',
    PRIMARY KEY (userId)
);