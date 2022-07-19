import "../App.css";
import { Route, Routes } from "react-router-dom";
import SearchScreen from "./search";
import HomePage from "./HomePage";
import * as BooksAPI from "../utils/BooksAPI";


function App() {


  const getAllBooks = async () => {
    try {
      const res = await BooksAPI.getAll();
      return res;
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<HomePage handelGetAllBooks={getAllBooks} />} />
        <Route exact path="/search" element={<SearchScreen handelGetAllBooks={getAllBooks} />} />
      </Routes>

    </div>
  );
}

export default App;
