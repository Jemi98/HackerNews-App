import "./App.css";

function App() {
  return (
    <div className="container">
      <form className="form-inline d-flex justify-content-center">
        <div className="form-group  m-5 w-50 d-flex">
          <input
            type="text"
            class="form-control"
            id="input1"
            placeholder="Enter Something..."
          />
          <button type="submit" class="btn btn-primary m-2 p-2">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
