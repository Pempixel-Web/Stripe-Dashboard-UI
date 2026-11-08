import {Routes,Route,Navigate} from 'react-router-dom';import {Provider} from './store';import Layout from './Layout';
import Overview from './pages/Overview';import Payments from './pages/Payments';import Customers from './pages/Customers';import Products from './pages/Products';
export default function App(){return <Provider><Routes><Route element={<Layout/>}>
<Route index element={<Overview/>}/><Route path="transactions" element={<Payments title="Transactions"/>}/><Route path="payments" element={<Payments title="Payments"/>}/><Route path="customers" element={<Customers/>}/><Route path="products" element={<Products/>}/><Route path="billing" element={<Products title="Billing"/>}/><Route path="*" element={<Navigate to="/"/>}/></Route></Routes></Provider>}
