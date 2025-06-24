import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "./PendingShops.css";

export default function PendingShops() {
  const [pendingShops, setPendingShops] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8070/shop/pending", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("✅ Pending shops:", res.data);
        setPendingShops(res.data);
      })
      .catch((err) =>
        console.error("❌ Error fetching pending shops:", err)
      );
  }, []);

  const approveShop = async (shopId) => {
    try {
      await axios.put(
        `http://localhost:8070/shop/approve/${shopId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingShops((prev) => prev.filter((shop) => shop.id !== shopId));
      alert("✅ Shop approved successfully!");
    } catch (err) {
      console.error("❌ Error approving shop:", err);
      alert("❌ Failed to approve shop.");
    }
  };

  const columns = [
    { name: "Shop Name", selector: (row) => row.shopName || "N/A", sortable: true },
    { name: "Email", selector: (row) => row.seller?.email || "N/A", sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <button onClick={() => approveShop(row.id)} className="approve-button">
          Approve
        </button>
      ),
    },
  ];

  return (
    <div className="pending-shops-container">
      <h2>Pending Shops</h2>
      <DataTable
        columns={columns}
        data={pendingShops}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}
