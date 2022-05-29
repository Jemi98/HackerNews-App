import "../App.css";
import React, { useEffect, useState } from "react";

const FetchNews = () => {
  const [item, setItem] = useState([]);
  const [query, setQuery] = useState("programming");
  const [text, setText] = useState("");
  const [largeTitle, setLargeTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchNews = async () => {
      const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
      const response = await fetch(url);
      const data = await response.json();

      setItem(data.hits);
      setLargeTitle(data.hits[0]);

      console.log(data);
    };
    fetchNews();
    setIsLoading(false);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      console.log("Input is empty");
    } else {
      setQuery(text);
      setText("");
      console.log(text);
      console.log(query);
    }
  };

  return (
    <>
      <div className="container">
        {/* Search Form*/}
        <form className="form-inline d-flex justify-content-center">
          <div className="form-group  m-5 w-50 d-flex">
            <input
              type="text"
              className="form-control"
              id="input1"
              placeholder="Enter Something..."
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary m-2 p-3"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* End Form*/}

      {/* Display data start*/}
      <section className="d-flex">
        <div className="row">
          {item.map((item) => {
            const { author, created_at, objectID, titile, url } = item;

            return (
              <div
                className="card "
                key={objectID}
                style={{ width: "300px", height: "250px", margin: "20px" }}
              >
                <div className="title">{titile}</div>
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">
                    <em>By{author}</em>
                  </p>
                  <a href={url} className="btn btn-primary">
                    read more
                  </a>
                  <p className="card-text">
                    <em>Created_at{created_at}</em>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* Display data end*/}
    </>
  );
};

export default FetchNews;
