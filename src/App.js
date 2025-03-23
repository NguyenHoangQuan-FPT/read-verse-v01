import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import StoryList from "./pages/story/StoryList";
import { GenreProvider } from "./context/GenreContext";
import StoryDetail from "./pages/story/StoryDetail";
import StoryReader from "./pages/story/StoryReader";

function App() {
  return (
    <div className="App">
      <GenreProvider>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stories" element={<StoryList />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/stories/read/:id" element={<StoryReader />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </GenreProvider>
    </div>
  );
}

export default App;
