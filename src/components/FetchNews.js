import "../App.css";
import React, { useEffect, useState } from "react";

const FetchNews = () => {
  const [item, setItem] = useState([]);
  const [query, setQuery] = useState("programming");
  const [text, setText] = useState("");
  const [largeTitle, setLargeTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isLoading(true);
    const fetchNews = async () => {
      const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
      const response = await fetch(url);
      const data = await response.json();

      setItem(data.hits);
      setLargeTitle(data.hits[0]);

      console.log(data);
    };
    fetchNews();
    isLoading(false);
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
      {/* End Form*/}
      <section>Data to be diplay here</section>
    </div>
  );
};

export default FetchNews;
