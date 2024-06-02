import React, { useEffect } from 'react'
import { fetchDataFromApi } from './utils/api'
import { getApiConfiguration } from './store/homeSlice'
import { useSelector, useDispatch } from 'react-redux'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  // const url = useSelector(state => state.home.url) use if we need previous url
  const dispatch = useDispatch()
  const fetchApiConfig = () => {

    fetchDataFromApi("/configuration")
      .then(res => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };

        dispatch(getApiConfiguration(url))
      })
      .catch(err => console.log('something went wrong'))
  }
  useEffect(() => {
    fetchApiConfig();
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App