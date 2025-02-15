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


-- Populate Users table
INSERT INTO Users (Username, Email, Password, Role, ProfilePicUrl) VALUES
('admin', 'admin@example.com', 'hashed_password1', 'Admin', 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg'),
('johndoe', 'johndoe@example.com', 'hashed_password2', 'User', NULL),
('janedoe', 'janedoe@example.com', 'hashed_password3', 'User', NULL);

-- Populate Authors table
INSERT INTO Authors (Name, Biography, DateOfBirth, DateOfDeath, AuthorImageUrl) VALUES
('J.K. Rowling', 'British author, best known for the Harry Potter series.', '1965-07-31', NULL, 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg'),
('George Orwell', 'English novelist and essayist, known for 1984 and Animal Farm.', '1903-06-25', '1950-01-21', 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg'),
('Jane Austen', 'English novelist known for her works of romantic fiction.', '1775-12-16', '1817-07-18', 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg');

-- Populate Books table
INSERT INTO Books (Title, Description, PublicationYear, AuthorID, BookImageUrl) VALUES
('Harry Potter and the Philosopher\'s Stone', 'A young wizard discovers his magical heritage.', 1997, 1, 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg'),
('1984', 'A dystopian social science fiction novel and cautionary tale.', 1949, 2, 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg'),
('Pride and Prejudice', 'A romantic novel that critiques the British landed gentry.', 1813, 3, 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg');

-- Populate Genres table
INSERT INTO Genres (Name) VALUES
('Fantasy'),
('Science Fiction'),
('Dystopian'),
('Romance'),
('Classic');

-- Populate BookGenres table
INSERT INTO BookGenres (BookID, GenreID) VALUES
(1, 1), -- Harry Potter (Fantasy)
(2, 2), -- 1984 (Science Fiction)
(2, 3), -- 1984 (Dystopian)
(3, 4), -- Pride and Prejudice (Romance)
(3, 5); -- Pride and Prejudice (Classic)

