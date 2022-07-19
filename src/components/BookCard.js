import React from "react";
import {  useState } from "react";
const BookCard = ({ book,setHandelUpdateShelf }) => {

    const [shelf, setShelf] = useState(book?.shelf !==undefined ?book?.shelf: "" );


    const handelChangeShelf = (e) => {
        setHandelUpdateShelf(book, e.target.value);
        setShelf(e.target.value);
    }


    return (
        <>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                `url(${book?.imageLinks?.thumbnail})`,
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={handelChangeShelf}>
                            <option value="none" disabled>
                              {!shelf ?  "add to ...": " Move to..."}
                            </option>
                            <option value="currentlyReading">
                                Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book?.title}</div>
                <div className="book-authors">{book?.authors?.map(auther => `${auther}`).join(" - ")}


                </div>
            </div>
        </>
    );

}
export default BookCard;