import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import StudyAbroad from "./pages/StudyAbroad";
import TestPrepLanguages from "./pages/TestPrepLanguages";
import ElearningMaterials from "./pages/ElearningMaterials";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/study-abroad" element={<StudyAbroad />} />
        <Route path="/test-prep-languages" element={<TestPrepLanguages />} />
        <Route path="/e-learning-materials" element={<ElearningMaterials />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
