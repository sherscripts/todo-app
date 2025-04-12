import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskManager from './components/TaskManager';

const App = () => (
  <Routes>
    <Route path="/" element={<LoginForm />} /> 
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<RegisterForm />} />
    <Route path="/tasks" element={<TaskManager />} />
  </Routes>
);

export default App;

