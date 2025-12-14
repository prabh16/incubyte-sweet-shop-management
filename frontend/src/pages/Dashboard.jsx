
import { useEffect, useState } from "react";
import {
  getSweets,
  searchSweets,
  purchaseSweet,
  addSweet,
  updateSweet,
  deleteSweet,
  restockSweet,
  logout,
} from "../services/api";



export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");

  // Admin form state
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const loadSweets = async () => {
    const data = await getSweets(token);
    setSweets(data);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  const handleSearch = async (value) => {
    setSearch(value);
    const data = await searchSweets(value, token);
    setSweets(data);
  };

const handleAdd = async () => {
  try {
    await addSweet(
      {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      },
      token
    );

    // reset form
    setForm({ name: "", category: "", price: "", quantity: "" });

    await loadSweets(); // reload list
  } catch (err) {
    console.error("Add sweet failed", err);
    alert("Failed to add sweet");
  }
};


  return (
    <div>
      <h2>Sweet Shop Dashboard</h2>

            <button
        onClick={() => {
            logout();
            window.location.reload();
        }}
        >
        Logout
        </button>

      {/* Search */}
      <div>
        <input
          placeholder="Search sweets"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Admin Add Sweet */}
      <h3>Add Sweet (Admin)</h3>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        placeholder="Quantity"
        type="number"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      />
      <button onClick={handleAdd}>Add Sweet</button>

      <hr />

      {/* Sweets List */}
      {Array.isArray(sweets) && sweets.map((s) => (
        <div key={s.id} style={{ marginBottom: "10px" }}>
          <strong>{s.name}</strong> ({s.category}) – ₹{s.price}  
          <br />
          Quantity: {s.quantity}

          <br />

          <button
            disabled={s.quantity === 0}
            onClick={() => purchaseSweet(s.id, token).then(loadSweets)}
          >
            Purchase
          </button>

          <button
            onClick={() =>
              restockSweet(s.id, 5, token).then(loadSweets)
            }
          >
            Restock +5 (Admin)
          </button>

          <button
            onClick={() => deleteSweet(s.id, token).then(loadSweets)}
          >
            Delete (Admin)
          </button>

          <button
            onClick={() =>
                updateSweet(
                s.id,
                { price: s.price + 5 },
                token
                ).then(loadSweets)
            }
            >
            Increase Price +5 (Admin)
            </button>
        </div>
      ))}
    </div>
  );
}
