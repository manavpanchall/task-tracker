import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { ProjectProvider } from './context/projectContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ProjectsList from './components/Projects/ProjectsList';
import PrivateRoute from './components/Layout/PrivateRoute';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthProvider>
      <ProjectProvider>
        <div className={`flex flex-col min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<ProjectsList />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;