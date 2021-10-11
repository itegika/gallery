import React, { useState, useEffect } from "react";
import Gallery from "./Gallery/Gallery";
import SearchBar from "./SearchBar/SearchBar";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import Spinner from "./Spinner/Spinner";
import * as API from "../Api/API";
import "../../src/App.css";
import styles from "../components/Modal/Modal.module.css";

function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;
    const onSearch = async () => {
      setIsLoading(true);
      try {
        const data = await API.fetchImages(searchQuery, currentPage);
        setImages((prevImages) => [...prevImages, ...data]);
        setIsLoading(false);
        // setCurrentPage((prevPage) => prevPage + 1);
      } catch (error) {
        setError("Error! Pls, try again");
        console.log(error);
      } finally {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        setIsLoading(false);
      }
    };

    onSearch();
  }, [searchQuery, currentPage]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getLargeUrl = (url) => {
    setLargeImageURL(url);
    setIsModalOpen(true);
  };

  const onFormSubmit = (item) => {
    setSearchQuery(item);
    setImages([]);
    setCurrentPage(1);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={onFormSubmit} />
      {error && <p>{error.message}</p>}
      <Gallery images={images} onClick={getLargeUrl} />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <img className={styles.Modal} src={largeImageURL} alt="" />
        </Modal>
      )}
      {isLoading && <Spinner />}
      {images.length >= 12 && !isLoading && <Button onClick={onLoadMore} />}
    </div>
  );
}

export default App;
