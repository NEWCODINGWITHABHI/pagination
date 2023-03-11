import { useEffect, useState } from "react";
import "./App.css";

const page = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function App() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageData,setPageData]=useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let sliceData = result.slice(pageNo * 10, pageNo * 10 + 10);
        setPageData(sliceData);
        setData(result);
        return result;
      });
    
  }, []);
  useEffect(() => {
    let sliceData = data.slice(pageNo * 10, pageNo * 10 + 10);
    setPageData(sliceData);
    console.log("pppp")
  }, [pageNo]);

  function handlePageNext() {
    if (pageNo < 10) {
      setPageNo(pageNo + 1);
    }
  }
  function handlePagePrev() {
    if (pageNo > 0) {
      setPageNo(pageNo - 1);
    }
  }
  return (
    <div>
      <div className="App">
        {pageData.map((item) => {
          return (
            <div className="img-box" key={item.id}>
              <img src={item.url} alt="photo" />
              <p>{item.title}</p>
            </div>
          );
        })}
      </div>
      <div className="pagination-box">
        {pageNo == 0 ? null : (
          <button onClick={() => handlePagePrev()}>Prev</button>
        )}

        {page.map((p, index) => {
          return (
            <span
              style={{ backgroundColor: `${pageNo == p ? "grey" : ""}` }}
              key={index}
            >
              {p}
            </span>
          );
        })}
        {pageNo == 10 ? null : (
          <button onClick={() => handlePageNext()}>Next</button>
        )}
      </div>
    </div>
  );
}

export default App;
