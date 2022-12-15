import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Alert from "./components/layout/Alert";
import About from "./pages/About";
import Applications from "./pages/applications";
import NotFound from "./pages/NotFound";
import ApplicationView from "./pages/applicationView";
import ResourcesView from "./pages/resourceView";
import Resources from "./pages/resources";
import { GithubProvider } from "./context/mainContext/theContext";
import { AlertProvider } from "./context/alert/AlertContext";

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar title="ELANCO SEARCH TERMINAL" />
            <Alert />
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/resources/:login2" element={<ResourcesView />} />
              <Route path="/applications" element={<Applications />} />
              <Route
                path="/applications/:login"
                element={<ApplicationView />}
              />
              <Route path="/resources" element={<Resources />} />
              <Route path="/notFound" element={<NotFound />} />
              <Route path="/*" element={<NotFound />} />
              <Route path="/" element={<About />} />
            </Routes>

            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
