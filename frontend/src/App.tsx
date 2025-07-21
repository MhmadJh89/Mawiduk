import './i18n';
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Clients from './pages/Clients';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </Router>
  )
}

export default App;