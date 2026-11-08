import { Analytics } from "@vercel/analytics/react"
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "./store";
import Layout from "./Layout";
import Overview from "./pages/Overview";
import Payments from "./pages/Payments";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Balances from "./pages/Balances";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
export default function App() {
  return (
    <Provider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Overview />} />
          <Route
            path="transactions"
            element={<Payments title="Transactions" />}
          />
          <Route path="payments" element={<Payments title="Payments" />} />
          <Route path="customers" element={<Customers />} />
          <Analytics/>
          <Route path="products" element={<Products />} />
          <Route path="balances" element={<Balances />} />
          <Route path="reports" element={<Reports />} />
          <Route path="billing" element={<Products title="Billing" />} />
          <Route path="connect" element={<Balances title="Connect" />} />
          <Route path="settings/:tab?" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Provider>
  );
}
