import {Routes, Route, createRoutesFromElements, createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import { MianContent } from './components/MianContent';



const routes=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MianContent/>} >
      <Route index element={<HomePage/>}/>
    </Route>
  )
);
function App() {
  return <RouterProvider router={routes}/>;
}

export default App