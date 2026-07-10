import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedResources } from './components/FeaturedResources';
import { Categories } from './components/Categories';
import { CreatorsSection } from './components/CreatorsSection';
import { AllResources } from './components/AllResources';
import { Footer } from './components/Footer';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';
import { SubmitPage } from './pages/SubmitPage';
import './index.css';

function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedResources />
      <Categories />
      <CreatorsSection />
      <AllResources />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resources" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
