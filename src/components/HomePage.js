import "../App.css";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import * as BooksAPI from "../utils/BooksAPI";
import Spinner from "./loader";
import { Link } from "react-router-dom";

const HomePage = ({handelGetAllBooks}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [currentlyReadingList, setCurrentlyReadingList] = useState([]);
    const [readList, setReadList] = useState([]);
    const [wantToReadList, setWantToReadList] = useState([]);



    const getAllBooksFun = async () => {
        setIsLoading(true);
        let res = [];
        try {
            res= await  handelGetAllBooks();
        } catch (error) {
            console.log(error);
        }
     
        setCurrentlyReadingList(res?.filter((book) => book.shelf === "currentlyReading"));
        setReadList(res?.filter((book) => book.shelf === "read"));
        setWantToReadList(res?.filter((book) => book.shelf === "wantToRead"));
        setIsLoading(false);
    }


    useEffect(() => {
        getAllBooksFun();
    }, [])

    const handelUpdateShelf = (book, newShelf) => {
        const updateShelf = async () => {
            setIsLoading(true);
            await BooksAPI.update(book, newShelf);
            getAllBooksFun();
        }
        updateShelf();
    }


    return (
        <div>

            <div className="list-books">
                {isLoading && <Spinner />}

                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {currentlyReadingList?.length > 0 && currentlyReadingList?.map((book) => (
                                        <li key={book.id}>
                                            <BookCard book={book} setHandelUpdateShelf={handelUpdateShelf} />
                                        </li>
                                    ))}

                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {wantToReadList?.length > 0 && wantToReadList?.map((book) => (
                                        <li key={book.id}>
                                            <BookCard book={book} setHandelUpdateShelf={handelUpdateShelf} />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {readList?.length > 0 && readList?.map((book) => (
                                        <li key={book.id}>
                                            <BookCard book={book} setHandelUpdateShelf={handelUpdateShelf} />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
