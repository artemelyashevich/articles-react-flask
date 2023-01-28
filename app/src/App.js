import './static/scss/App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllArticles from './components/navs/AllArticles';
import Home from './components/navs/Home';
import Login from './components/navs/Login';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import User from './components/Content/User/User'
import { useEffect, useState } from 'react';
import { ArticleDTO } from './models/ArticleDTO';
import Edit from './components/Content/User/pages/Edit/Edit';
import Profile from './components/Content/User/pages/Profile/Profile';


function App() {
  const [articles, setArticles] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/articles')
      .then(response => response.json())
      .then(item => {
        var arr = []
        for (var el of item) {
          arr.push(new ArticleDTO(el.id, el.title, el.content));
        };
        setArticles(arr);
        setIsLoaded(true);
      }, (error) => {
        setIsLoaded(true);
        setError(error);
      })
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<AllArticles articles={articles} setArticles={setArticles} error={error} setError={setError} isLoaded={isLoaded} setISLoaded={setIsLoaded} />} />
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<User />} />
        <Route path='/home/edit' element={<Edit />} />
        <Route path='/home/profile' element={<Profile />} />
      </Routes>
      <Content />
      <Footer />
    </BrowserRouter>
  );
}
export default App;
