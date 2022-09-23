import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import "./App.css";
import List from "./components/List";

function App() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage, setImagePerPage] = useState(8);
  const [allData, setAllData] = useState([]);
  const [loader, setLoader] = useState("start");

  const eventHandler = (e) => {
    setLoader("search");
    setQuery(e.target.value);
  };

  const sendRequest = async (params) => {
    let url = `https://pixabay.com/api/?key=30072676-d250de6e9ee4620711444e58c&q=${params}&image_type=photo&pretty=true`;

    try {
      const request = await fetch(url);

      if (request.status !== 200) {
        throw new Error(request.statusText);
      }
      const parsedData = await request.json();

      if (parsedData.hits.length === 0) {
        setLoader("noresult");
        return;
      }

      setAllData([]);

      await parsedData.hits.forEach((element) => {
        setAllData((arrayItem) => [
          ...arrayItem,
          { image: element.previewURL, alt: element.tags },
        ]);
      });
    } catch (err) {
      console.log(err);
    }

    setLoader("result");
  };

  useEffect(() => {
    document.title = "You searched: " + query;

    const timeout = setTimeout(() => {
      if (query === "") {
        setLoader("start");
        return;
      } else {
        sendRequest(query);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  useEffect(() => {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      setImagePerPage(3);
    }
  }, [imagePerPage]);

  useEffect(() => {
    const loading = document.getElementById("loading");

    const result = document.getElementById("result");
    if (loader === "start") {
      loading.classList.remove("active");
      result.innerText = "Type something...";
    }
    if (loader === "search") {
      loading.classList.add("active");
      result.innerText = "";
    }
    if (loader === "noresult") {
      loading.classList.remove("active");
      result.innerText = "No result found";
      setAllData([]);
    }
    if (loader === "result") {
      loading.classList.remove("active");
      result.innerText = "";
    }

    console.log(loader);
  }, [loader]);

  useEffect(() => {}, [allData]);

  const lastPostIndex = currentPage * imagePerPage;
  const firstPostIndex = lastPostIndex - imagePerPage;
  const currentPosts = allData.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="App">
      <div className="App-header">
        <h2>Search image from pixabay</h2>
        <input
          style={{ margin: "20px" }}
          onChange={(event) => eventHandler(event)}
        ></input>
        <br></br>
        <div className="loader-circle-6" id="loading"></div>
      </div>

      <h1 id="result"></h1>

      <List data={currentPosts}></List>

      <Pagination
        dataLength={allData.length}
        imagePerPage={imagePerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
}

export default App;
