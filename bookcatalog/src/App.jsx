import{ BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import Home from "./Home/Home.jsx";
import LoginForm from "./Login/LoginForm.jsx";
import SignUp from "./SignUpPage/SignUp.jsx";
import BookInfoPage from "./BookInfoPage/BookInfoPage.jsx";
import AuthorAdminConsole from "./AuthorAdminConsole/AuthorAdminConsole.jsx";
import CreateOrUpdateAuthorForm from "./CreateOrUpdateAuthor/CreateOrUpdateAuthorForm.jsx";
import GenreAdminConsole from "./GenreAdminConsole/GenreAdminConsole.jsx";
import CreateBookForm from "./CreateBookForm/CreateBookForm.jsx";

function App() {


  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" exact element = {<Home />} />
              <Route path="/login" exact element = {<LoginForm />} />
              <Route path="/signUp" exact element = {<SignUp />} />
              <Route path="/book/:id" element={<BookInfoPage />} />
              <Route path="/authorAdminConsole" element={<AuthorAdminConsole />} />
              <Route path="/author-cu" element={<CreateOrUpdateAuthorForm />} />
              <Route path="/genreAdminConsole" element={<GenreAdminConsole />} />
              <Route path="/create-book" element={<CreateBookForm />} />
              <Route path="/update-book/:id" element={<CreateBookForm />} />




          </Routes>
      </BrowserRouter>
  );
}

export default App
