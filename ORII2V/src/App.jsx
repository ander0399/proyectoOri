import { BrowserRouter,Routes,Route } from "react-router-dom";
import Nav from './Components/Nav';
import Departaments from './Views/Departaments/Index';
import CreateDepartament from './Views/Departaments/Create';
import EditDepartament from './Views/Departaments/Edit';
import Employees from './Views/Employees/Index';
import Graphic from './Views/Employees/Graphic';
import Login from './Views/Login';
import Register from './Views/Register';
import ProtectedRoutes from './Components/ProtectedRoutes';


function App() {
  

  return (
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Departaments />} />
      <Route element={<ProtectedRoutes/>}>
    <Route path="/create" element={<CreateDepartament />} />
      <Route path="/edit/:id" element={<EditDepartament />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/graphic" element={<Graphic />} />
      </Route>
      
      
      
    </Routes>
    </BrowserRouter>
    )
}

export default App
