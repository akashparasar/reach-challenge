import React, { useEffect, useState } from "react";
import RepositoryList from "./components/RepositoryList";
import Loading from "./components/Loading";
import axios from "axios";
import { repositorySelector, setRepositories } from "./store/slices/repositorySlice";
import { useSelector, useDispatch } from 'react-redux';

const App = () => {

  const { repositories } = useSelector(repositorySelector);
  const dispatch = useDispatch();

  // Filter Date
  var currentDate = new Date();
  const lastWeekDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const lastTwoWeekDate = new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const lastMonthkDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getMonth()).toISOString().slice(0, 10);
  const lastTwoMonthkDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, currentDate.getMonth()).toISOString().slice(0, 10);


  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState(lastTwoMonthkDate);

  const getRepositories = async (page, date) => {
    setLoading(true);
    try {
      let url = `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}`;
      const response = await axios.get(url);
      dispatch(setRepositories(page === 1 ? response?.data?.items : [...repositories, ...response?.data?.items]));
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getRepositories(currPage, filterDate,);
  }, [currPage]);

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (!loading) {
        setCurrPage(prevPage => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
    getRepositories(1, e.target.value);
  }

  return (
    <>
      <div className="min-h-screen h-full py-6">
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 pt-4 z-10 bg-white border-b pb-4">
          <span>Total : {repositories.length}</span>
          <select
            className="block border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={filterDate}
            onChange={handleDateChange}
          >
            <option value={lastWeekDate}>Last 1 Week</option>
            <option value={lastTwoWeekDate}>Last 2 Week</option>
            <option value={lastMonthkDate}>Last 1 Month</option>
            <option value={lastTwoMonthkDate}>Last 2 Month</option>
          </select>
        </div>
        <RepositoryList repositories={repositories} />
        {loading && <Loading />}
      </div>
    </>
  );
}

export default App;
