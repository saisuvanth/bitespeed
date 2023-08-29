create table contact(
    id INT PRIMARY KEY AUTO_INCREMENT,
    phoneNumber VARCHAR(20),
    email VARCHAR(50),
    linkedId INT,
    linkPrecedence ENUM('SECONDARY', 'PRIMARY'),
    createdAt DATETIME,
    updatedAt DATETIME,
    deletedAt DATETIME
);