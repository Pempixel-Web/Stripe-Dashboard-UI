import { useState } from "react";
import { fmt, dt } from "../data";
import { useStore } from "../store";
import { Modal, Field, Badge } from "../ui";
export default function Balances({ title = "Balances" }: { title?: string }) {
  const { payments, toast } = useStore();
  const [avail, setAvail] = useState(2481250);
  const [m, setM] = useState(false);
  const [a, setA] = useState("500");
  const [payouts, setPayouts] = useState([
    {
      id: "po_1N8xKq",
      amt: 184200,
      st: "Paid",
      d: new Date(Date.now() - 2 * 864e5).toISOString(),
    },
    {
      id: "po_1N7wLr",
      amt: 156975,
      st: "Paid",
      d: new Date(Date.now() - 9 * 864e5).toISOString(),
    },
    {
      id: "po_1N6vMs",
      amt: 201430,
      st: "Paid",
      d: new Date(Date.now() - 16 * 864e5).toISOString(),
    },
  ]);
  const pend = payments
    .filter((p) => p.status === "processing")
    .reduce((s, p) => s + p.amount, 0);
  const pay = () => {
    const v = Math.round(parseFloat(a) * 100);
    if (!(v > 0) || v > avail) return toast("Invalid payout amount");
    setAvail((x) => x - v);
    setPayouts((p) => [
      {
        id: "po_" + Math.random().toString(36).slice(2, 8),
        amt: v,
        st: "Pending",
        d: new Date().toISOString(),
      },
      ...p,
    ]);
    setM(false);
    toast("Payout scheduled");
  };
  return (
    <div className="page">
      <div className="ph">
        <h1>{title}</h1>
        <button className="btn primary" onClick={() => setM(true)}>
          Pay out funds
        </button>
      </div>
      <div className="grid g3 mb">
        {[
          ["Available", avail],
          ["Pending", pend],
          ["Total", avail + pend],
        ].map(([l, v]) => (
          <div className="card metric" key={l as string}>
            <div className="l">{l}</div>
            <div className="v">{fmt(v as number)}</div>
          </div>
        ))}
      </div>
      <h2>Currency breakdown</h2>
      <div className="tbl-wrap mb">
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th className="r">Available</th>
              <th className="r">Pending</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USD</td>
              <td className="r">{fmt(avail)}</td>
              <td className="r">{fmt(pend)}</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td className="r">{fmt(184500, "EUR")}</td>
              <td className="r">{fmt(0, "EUR")}</td>
            </tr>
            <tr>
              <td>GBP</td>
              <td className="r">{fmt(92000, "GBP")}</td>
              <td className="r">{fmt(12000, "GBP")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid g2e">
        <div>
          <h2>Balance transactions</h2>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th className="r">Net</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.slice(0, 7).map((p) => (
                  <tr key={p.id}>
                    <td>{p.status === "refunded" ? "Refund" : "Charge"}</td>
                    <td className="r">
                      {fmt(
                        (p.status === "refunded" ? -1 : 1) *
                          (p.amount * 0.971 - 30),
                      )}
                    </td>
                    <td className="muted">{dt(p.created)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2>Payout history</h2>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th className="r">Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td className="r">{fmt(p.amt)}</td>
                    <td>
                      <span
                        className={
                          "badge " +
                          (p.st === "Paid" ? "succeeded" : "processing")
                        }
                      >
                        {p.st}
                      </span>
                    </td>
                    <td className="muted">{dt(p.d)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        open={m}
        onClose={() => setM(false)}
        title="Pay out funds"
        footer={
          <>
            <button className="btn" onClick={() => setM(false)}>
              Cancel
            </button>
            <button className="btn primary" onClick={pay}>
              Pay out
            </button>
          </>
        }
      >
        <Field label={`Amount (available ${fmt(avail)})`}>
          <input
            className="in"
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </Field>
        <small>Mock only — no real funds move.</small>
      </Modal>
    </div>
  );
}
