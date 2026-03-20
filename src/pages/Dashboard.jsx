import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  const addProduct = async () => {
    if (!nombre.trim() || !precio || !stock) {
      alert("Todos los campos son obligatorios ⚠️");
      return;
    }

    const precioNum = parseFloat(precio);
    const stockNum = parseInt(stock, 10);

    if (isNaN(precioNum) || isNaN(stockNum)) {
      alert("Precio y stock deben ser números válidos ❌");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("productos")
      .insert([
        {
          nombre: nombre.trim(),
          precio: precioNum,
          stock: stockNum,
        },
      ]);

    setLoading(false);

    if (error) {
      console.error("ERROR:", error);
      alert(`❌ Error: ${error.message}`);
    } else {
      alert("Producto guardado ✅");
      setNombre("");
      setPrecio("");
      setStock("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Dashboard 🔥</h1>
      <h2>Agregar producto</h2>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ display: "block", margin: "10px 0", width: "100%" }}
      />

      <input
        placeholder="Precio"
        type="number"
        step="0.01"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        style={{ display: "block", margin: "10px 0", width: "100%" }}
      />

      <input
        placeholder="Stock"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        style={{ display: "block", margin: "10px 0", width: "100%" }}
      />

      <button onClick={addProduct} disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </div>
  );
}