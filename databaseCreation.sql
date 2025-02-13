-- Create the database
CREATE DATABASE BookCatalog;
USE BookCatalog;

-- Users table
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL, -- Plain password (hashed by backend)
    Role VARCHAR(50) NOT NULL, -- Role handled by backend
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ProfilePicUrl VARCHAR(255) -- Profile picture URL
);

-- Authors table
CREATE TABLE Authors (
    AuthorID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Biography TEXT,
    DateOfBirth DATE,
    DateOfDeath DATE,
    AuthorImageUrl VARCHAR(255) -- Author profile picture URL
);

-- Books table
CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    PublicationYear INT,
    AuthorID INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    BookImageUrl VARCHAR(255), -- Book cover image URL
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID) ON DELETE SET NULL
);

-- Genres table
CREATE TABLE Genres (
    GenreID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL UNIQUE
);

-- Many-to-Many relationship: Books and Genres
CREATE TABLE BookGenres (
    BookID INT,
    GenreID INT,
    PRIMARY KEY (BookID, GenreID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID) ON DELETE CASCADE,
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID) ON DELETE CASCADE
);


