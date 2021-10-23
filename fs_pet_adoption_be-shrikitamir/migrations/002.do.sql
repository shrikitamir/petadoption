CREATE TABLE IF NOT EXISTS pets (
	petId               int AUTO_INCREMENT NOT NULL,
    type                varchar(10) NOT NULL,
    name                varchar(20) NOT NULL,
    likes               INT DEFAULT 0,
    height              INT NOT NULL,
    weight              INT NOT NULL,
    color               varchar(10) NOT NULL,
    status              varchar(10) DEFAULT 'In Shelter',
    userId              INT NULL,
    hypoallergenic      BOOLEAN NOT NULL,
    dietary             varchar(50) NOT NULL,
    breed               varchar(20) NOT NULL,
    bio                 varchar(85) NOT NULL,
    img                 varchar(255) DEFAULT 'https://res.cloudinary.com/tamirshriki/image/upload/v1628265639/pkergdriihybpsvbmugb.jpg',
    FOREIGN KEY (userId) REFERENCES users(userId),
    PRIMARY KEY (petId)
);