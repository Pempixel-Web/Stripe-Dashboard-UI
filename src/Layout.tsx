import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Wallet,
  ArrowLeftRight,
  Users,
  Package,
  CreditCard,
  Repeat,
  BarChart3,
  Network,
  MoreHorizontal,
  Settings,
  Search,
  HelpCircle,
  Bell,
  PanelLeft,
  ChevronsUpDown,
  Menu as MenuIc,
} from "lucide-react";
import { Menu, Avatar } from "./ui";
import { useStore } from "./store";
const nav = [
  ["/", "Home", Home],
  ["/balances", "Balances", Wallet],
  ["/transactions", "Transactions", ArrowLeftRight],
  ["/customers", "Customers", Users],
  ["/products", "Product catalogue", Package],
] as const;
const nav2 = [
  ["/payments", "Payments", CreditCard],
  ["/billing", "Billing", Repeat],
  ["/reports", "Reports", BarChart3],
  ["/connect", "Connect", Network],
] as const;
export default function Layout() {
  const [col, setCol] = useState(false);
  const [mob, setMob] = useState(false);
  const { toast, toasts } = useStore();
  const nv = useNavigate();
  const [q, setQ] = useState("");
  const L = ({ to, label, I }: any) => (
    <NavLink
      to={to}
      end={to === "/"}
      title={col ? label : undefined}
      onClick={() => setMob(false)}
      className={({ isActive }) => "nav" + (isActive ? " active" : "")}
    >
      <I size={16} />
      {!col && <span>{label}</span>}
    </NavLink>
  );
  return (
    <div className={"app" + (col ? " col" : "") + (mob ? " mob" : "")}>
      <aside className="sidebar">
        <div className="ws">
          <div className="logo">S</div>
          {!col && (
            <>
              <div className="ws-n">
                <b>Pempixel Web Inc</b>
                <small>Test mode</small>
              </div>
              <ChevronsUpDown size={14} />
            </>
          )}
        </div>
        <button
          className="nav search"
          title={col ? "Search" : undefined}
          onClick={() => document.getElementById("gs")?.focus()}
        >
          <Search size={16} />
          {!col && <span>Search</span>}
        </button>
        <nav>
          {nav.map((n) => (
            <L key={n[0]} to={n[0]} label={n[1]} I={n[2]} />
          ))}
          {!col && <div className="sec">Products</div>}
          {nav2.map((n) => (
            <L key={n[0]} to={n[0]} label={n[1]} I={n[2]} />
          ))}
          <Menu
            icon={<MoreHorizontal size={16} />}
            label={col ? undefined : "More"}
            items={[
              { label: "Developers", onClick: () => nv("/settings/api") },
              { label: "Team", onClick: () => nv("/settings/team") },
            ]}
          />
        </nav>
        <div className="side-bot">
          <L to="/settings" label="Settings" I={Settings} />
          <button
            className="nav"
            onClick={() => setCol(!col)}
            title="Toggle sidebar"
          >
            <PanelLeft size={16} />
            {!col && <span>Collapse</span>}
          </button>
        </div>
      </aside>
      {mob && <div className="overlay" onClick={() => setMob(false)} />}
      <div className="main">
        <header className="topbar">
          <button className="icon-btn only-mob" onClick={() => setMob(true)}>
            <MenuIc size={18} />
          </button>
          <b className="tb-name">Pempixel Web Inc</b>
          <div className="gsearch">
            <Search size={14} />
            <input
              id="gs"
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && q) {
                  nv("/transactions?q=" + encodeURIComponent(q));
                  setQ("");
                }
              }}
            />
            <kbd>/</kbd>
          </div>
          <div className="tb-r">
            <button
              className="icon-btn"
              onClick={() => toast("Help centre opened (mock)")}
            >
              <HelpCircle size={16} />
            </button>
            <button
              className="icon-btn"
              onClick={() => toast("No new notifications")}
            >
              <Bell size={16} />
            </button>
            <button className="icon-btn" onClick={() => nv("/settings")}>
              <Settings size={16} />
            </button>
            <Menu
              label={<Avatar />}
              items={[
                {
                  label: "Ezekiel Vincent",
                  onClick: () => nv("/settings/personal"),
                },
                { label: "Profile", onClick: () => nv("/settings/personal") },
                { label: "Security", onClick: () => nv("/settings/security") },
                {
                  label: "Sign out",
                  onClick: () => toast("Signed out (mock)"),
                  danger: true,
                },
              ]}
            />
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
      <div className="toasts">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            {t.m}
          </div>
        ))}
      </div>
    </div>
  );
}
