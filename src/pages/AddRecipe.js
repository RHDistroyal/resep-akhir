import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    note: "",
    ingredients: "",
    steps: "",
    time: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        note: formData.note.split(",").map((item) => item.trim()), // Konversi ke array
        ingredients: formData.ingredients.split(",").map((item) => item.trim()),
        steps: formData.steps.split(".").map((item) => item.trim()),
      }),
    })
      .then((res) => res.json())
      .then((newRecipe) => {
        // Redirect ke halaman detail resep dengan replace
        navigate(`/recipe/${newRecipe.id}`, { replace: true });
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tambah Resep</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nama Resep"
          value={formData.name}
          onChange={handleChange}
          className="block border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          name="image"
          placeholder="URL Gambar"
          value={formData.image}
          onChange={handleChange}
          className="block border p-2 rounded mb-2 w-full"
        />
        <textarea
          name="note"
          placeholder="Catatan (pisahkan dengan koma)"
          value={formData.note}
          onChange={handleChange}
          className="block border p-2 rounded mb-2 w-full"
        />
        <textarea
          name="ingredients"
          placeholder="Bahan-bahan (pisahkan dengan koma)"
          value={formData.ingredients}
          onChange={handleChange}
          className="block border p-2 rounded mb-2 w-full"
        />
        <textarea
          name="steps"
          placeholder="Langkah-langkah (pisahkan dengan titik)"
          value={formData.steps}
          onChange={handleChange}
          className="block border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          name="time"
          placeholder="Estimasi Waktu"
          value={formData.time}
          onChange={handleChange}
          className="block border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          name="category"
          placeholder="Kategori"
          value={formData.category}
          onChange={handleChange}
          className="block border p-2 rounded mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
