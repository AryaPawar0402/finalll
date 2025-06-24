import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "./ApprovedShops.css";

export default function ApprovedShops() {
  const [approvedShops, setApprovedShops] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8070/shop/approved", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("✅ Approved shops:", res.data);
        setApprovedShops(res.data);
      })
      .catch((err) =>
        console.error("❌ Error fetching approved shops:", err)
      );
  }, []);

  const columns = [
    { name: "Shop Name", selector: (row) => row.shopName || "N/A", sortable: true },
    { name: "Seller Email", selector: (row) => row.seller?.email || "N/A", sortable: true },
  ];

  return (
    <div className="approved-container">
      <h2>Approved Shops</h2>
      <DataTable
        columns={columns}
        data={approvedShops}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}
