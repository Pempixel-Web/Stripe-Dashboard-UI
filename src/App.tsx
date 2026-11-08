import {Routes,Route,Navigate} from 'react-router-dom';import {Provider} from './store';import Layout from './Layout';
import Overview from './pages/Overview';
export default function App(){return <Provider><Routes><Route element={<Layout/>}>
<Route index element={<Overview/>}/><Route path="*" element={<Navigate to="/"/>}/></Route></Routes></Provider>}
