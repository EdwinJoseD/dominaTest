import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Tasks } from './pages/Tasks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;