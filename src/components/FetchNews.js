import "../App.css";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

const FetchNews = () => {
  const [item, setItem] = useState([]);
  const [query, setQuery] = useState("programming");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchNews = async () => {
      const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
      const response = await fetch(url);
      const data = await response.json();

      setItem(data.hits);

      console.log(data);
    };
    fetchNews();
    setIsLoading(false);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setQuery(text);
    setText("");
    console.log(text);
    console.log(query);
  };

  return (
    <>
      <main>
        {/* Loading.....  start*/}
        {isLoading ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="main">
              {/* Search Form*/}
              <form className="form-inline d-flex justify-content-center">
                <div className="form-group  m-5 w-50 d-flex">
                  <input
                    type="text"
                    className="form-control"
                    id="input1"
                    placeholder="Enter something to search..."
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary m-1 p-2 "
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            {/* End Form*/}

            {/* Display data start*/}
            <section className="bg-light">
              <div className="row main-row light-gray">
                {item.map((item) => {
                  const { author, created_at, objectID, title, url } = item;

                  return (
                    <div
                      className="card bg-colour"
                      key={objectID}
                      style={{
                        width: "300px",
                        height: "250px",
                        margin: "20px",
                        radius: "30px",
                      }}
                    >
                      <div className="c">
                        <div className="title mt-2">
                          <h5>{title}</h5>
                        </div>
                        <p className="card-text">
                          <em>By-:{author}</em>
                        </p>
                        <hr />
                        <div
                          className="d-flex justify-content-between"
                          style={{ marginTop: "70px" }}
                        >
                          <a href={url} className="btn btn-secondary ">
                            read more
                          </a>
                          <p className="card-text">
                            <em>
                              {format(new Date(created_at), "dd MMM yyyy")}
                            </em>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <p style={{ textAlign: "center", textTransform: "capitalize" }}>
              copyright © 2022- Made with 🖤 By Jemi{" "}
            </p>
          </>
        )}
        {/* Display data end*/}
      </main>
    </>
  );
};

export default FetchNews;
