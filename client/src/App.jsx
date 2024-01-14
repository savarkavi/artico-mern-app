import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Toaster } from "react-hot-toast";
import { createContext, useEffect, useState } from "react";
import { getFromSession } from "./common/sessions";
import WriteBlog from "./pages/WriteBlog";
import Home from "./pages/Home";
import SearchBlog from "./pages/SearchBlog";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import Settings from "./pages/Settings";

export const UserContext = createContext({});
export const LikesContext = createContext(0);

const App = () => {
  const [userAuth, setUserAuth] = useState(null);
  const [likedBlogs, setLikedBlogs] = useState({});

  useEffect(() => {
    const user = getFromSession("user");
    user ? setUserAuth(JSON.parse(user)) : setUserAuth(null);
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <LikesContext.Provider value={{ likedBlogs, setLikedBlogs }}>
        <div className="min-h-screen bg-zinc-950">
          <Toaster />
          <Routes>
            <Route path="/writeblog" element={<WriteBlog />} />
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="search/:query" element={<SearchBlog />} />
              <Route path="profile/:username" element={<Profile />} />
              <Route path="blog/:blogId" element={<Blog />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </LikesContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
