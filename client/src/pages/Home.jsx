import { useEffect, useState } from "react";
import HomeMain from "../components/HomeMain";
import HomeNavigation from "../components/HomeNavigation";
import HomeSidebar from "../components/HomeSidebar";

const Home = () => {
  const [activeNavigation, setActiveNavigation] = useState("home");
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setActiveNavigation("home");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full xl:flex min-h-screen">
      <div className="flex-[80%] border-r border-gray-500">
        <HomeNavigation
          activeNavigation={activeNavigation}
          setActiveNavigation={setActiveNavigation}
          activeCategory={activeCategory}
        />
        <HomeMain
          activeNavigation={activeNavigation}
          activeCategory={activeCategory}
        />
      </div>
      <div className="flex-[20%] px-8">
        <HomeSidebar
          setActiveNavigation={setActiveNavigation}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
    </div>
  );
};

export default Home;
