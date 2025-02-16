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

INSERT INTO Users (Username, Email, Password, Role, ProfilePicUrl) VALUES
('admin', 'admin@example.com', 'hashed_password1', 'Admin', 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg'),
('johndoe', 'johndoe@example.com', 'hashed_password2', 'User', NULL),
('janedoe', 'janedoe@example.com', 'hashed_password3', 'User', NULL);


INSERT INTO Genres (GenreID, Name) VALUES
(1, "Fantasy"),
(2, "Adventure"),
(3, "Mystery"),
(4, "Science Fiction"),
(5, "Classic"),
(6, "Romance"),
(7, "Thriller");

-- Many-to-Many relationship: Books and Genres
CREATE TABLE BookGenres (
    BookID INT,
    GenreID INT,
    PRIMARY KEY (BookID, GenreID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID) ON DELETE CASCADE,
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID) ON DELETE CASCADE
);
INSERT INTO Authors (AuthorID, Name, Biography, DateOfBirth, DateOfDeath, AuthorImageUrl) VALUES
(1, "J.K. Rowling", "British author, best known for the Harry Potter series.", "1965-07-31", NULL, "https://stories.jkrowling.com/wp-content/uploads/2021/09/Shot-B-105_V2_CROP-e1630873059779.jpg"),
(2, "J.R.R. Tolkien", "English writer, poet, philologist, and academic, known for The Lord of the Rings.", "1892-01-03", "1973-09-02", "https://cdn.britannica.com/65/66765-050-63A945A7/JRR-Tolkien.jpg"),
(3, "George Orwell", "English novelist and essayist, known for 1984 and Animal Farm.", "1903-06-25", "1950-01-21", "https://britainunlimited.com/wp-content/uploads/2021/10/orwelllogo.jpg"),
(4, "Jane Austen", "English novelist known for Pride and Prejudice.", "1775-12-16", "1817-07-18", "https://cdn.britannica.com/79/83679-050-08F0DFBA/Jane-Austen.jpg"),
(5, "Agatha Christie", "British writer known for her detective novels.", "1890-09-15", "1976-01-12", "https://hips.hearstapps.com/hmg-prod/images/gettyimages-517399194.jpg");

INSERT INTO Books (BookID, Title, Description, PublicationYear, AuthorID, CreatedAt, BookImageUrl) VALUES
(1, "Harry Potter and the Sorcerer's Stone", "A young wizard begins his journey at Hogwarts.", 1997, 1, "2025-02-13 23:20:32", "https://m.media-amazon.com/images/I/71-++hbbERL.jpg"),
(2, "The Hobbit", "A hobbit embarks on an unexpected adventure.", 1937, 2, "2025-02-13 23:20:32", "https://m.media-amazon.com/images/I/712cDO7d73L.jpg"),
(3, "1984", "A dystopian novel about totalitarianism.", 1949, 3, "2025-02-13 23:20:32", "https://miro.medium.com/v2/resize:fit:7084/1*6QXManBm7wsBgDiagqPH8Q.png"),
(4, "Pride and Prejudice", "A romantic novel about manners and marriage.", 1813, 4, "2025-02-13 23:20:32", "https://www.faber.co.uk/wp-content/uploads/2022/09/Pride-and-Prejudice-448x690.jpg"),
(5, "Murder on the Orient Express", "A Hercule Poirot mystery.", 1934, 5, "2025-02-13 23:20:32", "https://m.media-amazon.com/images/I/71QZPV2T4tL._AC_UF894,1000_QL80_.jpg"),
(6, "The Silmarillion", "The mythology and history of Middle-earth.", 1977, 2, "2025-02-13 23:20:32", "https://images.booksense.com/images/012/338/9780544338012.jpg"),
(7, "The Two Towers", "The second book in The Lord of the Rings trilogy.", 1954, 2, "2025-02-13 23:20:32", "https://m.media-amazon.com/images/I/71nNxfSvGnL._UF1000,1000_QL80_.jpg"),
(8, "The Casual Vacancy", "A modern novel about political struggles in a small town.", 2012, 1, "2025-02-13 23:20:32", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1509893913i/13497818.jpg"),
(9, "The Cuckoo's Calling", "A crime novel featuring detective Cormoran Strike.", 2013, 1, "2025-02-13 23:20:32", "https://upload.wikimedia.org/wikipedia/en/4/49/TheCuckoo%27sCalling%28first_UK_edition%29cover.jpg"),
(10, "Brave New World", "A dystopian world driven by genetic engineering.", 1932, 3, "2025-02-13 23:20:32", "https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg"),
(11, "Fahrenheit 451", "A world where books are outlawed and burned.", 1953, 3, "2025-02-13 23:20:32", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDAHqPtBeptfWujJii8zvYD_tgDO-fbRst9w&s"),
(12, "The Great Gatsby", "A tragic love story set in the Jazz Age.", 1925, 3, "2025-02-13 23:20:32", "https://static1.squarespace.com/static/51c20371e4b09c37644d200e/545d1214e4b073a05b499358/5b6c72886d2a730cf6db5f61/1533844821198/GATSBYORIGINALCOVERART-facebook.jpg?format=1500w"),
(13, "Dracula", "The legendary tale of the vampire Count Dracula.", 1897, 3, "2025-02-13 23:20:32", "https://cdn.penguin.co.uk/dam-assets/books/9780099582595/9780099582595-jacket-large.jpg"),
(14, "The Picture of Dorian Gray", "A portrait ages while its subject remains young.", 1890, 3, "2025-02-13 23:20:32", "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781476788128/the-picture-of-dorian-gray-9781476788128_hr.jpg"),
(15, "Crime and Punishment", "A psychological exploration of guilt and redemption.", 1866, 3, "2025-02-13 23:20:32", "https://www.ciela.com/media/catalog/product/cache/9a7ceae8a5abbd0253425b80f9ef99a5/0/7/0785841733.jpg"),
(16, "To Kill a Mockingbird", "A novel about racial injustice in the South.", 1960, 3, "2025-02-13 23:20:32", "https://m.media-amazon.com/images/I/81aY1lxk+9L.jpg"),
(17, "Harry Potter and the Chamber of Secrets", "The second year at Hogwarts brings new dangers.", 1998, 1, "2025-02-13 23:21:59", "https://m.media-amazon.com/images/I/918wxhKJaPL._AC_UF1000,1000_QL80_.jpg"),
(18, "The Return of the King", "The final book in The Lord of the Rings trilogy.", 1955, 2, "2025-02-13 23:21:59", "https://m.media-amazon.com/images/I/71tDovoHA+L._UF1000,1000_QL80_.jpg"),
(19, "Animal Farm", "A political satire about totalitarianism.", 1945, 3, "2025-02-13 23:21:59", "https://images.penguinrandomhouse.com/cover/9780452284241"),
(20, "Sense and Sensibility", "A novel about love and societal expectations.", 1811, 4, "2025-02-13 23:21:59", "https://m.media-amazon.com/images/I/818mKxj9pAL._AC_UF1000,1000_QL80_.jpg"),
(21, "And Then There Were None", "A thrilling mystery about ten strangers on an island.", 1939, 5, "2025-02-13 23:21:59", "https://upload.wikimedia.org/wikipedia/en/2/26/And_Then_There_Were_None_US_First_Edition_Cover_1940.jpg"),
(22, "Unfinished Tales", "A collection of stories from Middle-earth.", 1980, 2, "2025-02-13 23:21:59", "https://m.media-amazon.com/images/I/71g6NrSpqXL.jpg"),
(23, "Fantastic Beasts and Where to Find Them", "A magical bestiary.", 2001, 1, "2025-02-13 23:21:59", "https://cdn.ozone.bg/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/f/a/1abe5b7c17a25b4258ce31f089c16bd8/fantastic-beasts-and-where-to-find-them-30.jpg"),
(24, "The Secret Adversary", "A Tommy and Tuppence detective novel.", 1922, 5, "2025-02-13 23:21:59", "https://m.media-amazon.com/images/I/71WBDfVo72L._AC_UF1000,1000_QL80_.jpg"),
(25, "Emma", "A novel about a clever but misguided matchmaker.", 1815, 4, "2025-02-13 23:21:59", "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale,dpr_1.5/jackets/9781847494139.jpg");



INSERT INTO BookGenres (BookID, GenreID) VALUES
(1, 1),
(2, 1),
(6, 1),
(7, 1),
(1, 2),
(2, 2),
(6, 2),
(7, 2),
(5, 3),
(8, 3),
(9, 3),
(13, 3),
(3, 4),
(10, 4),
(11, 4),
(4, 5),
(12, 5),
(14, 5),
(15, 5),
(16, 5),
(4, 6),
(5, 7),
(13, 7)

