import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  // Ambil data pengguna yang login
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAdmin = loggedInUser?.username === "admin";

  // Fetch data dari JSON Server
  useEffect(() => {
    fetch("http://localhost:5000/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  // Toggle favorite status
  const toggleFavorite = (id, isBookmarked) => {
    fetch(`http://localhost:5000/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBookmarked: !isBookmarked }),
    }).then(() =>
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === id ? { ...recipe, isBookmarked: !isBookmarked } : recipe
        )
      )
    );
  };

  // Filter dan pencarian
  const filteredRecipes = recipes.filter(
    (recipe) =>
      (category === "Semua" || recipe.category === category) &&
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Resep</h1>

      {/* Input pencarian dan filter kategori */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari resep..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="Semua">Semua</option>
          <option value="Makanan Pembuka">Makanan Pembuka</option>
          <option value="Makanan Utama">Makanan Utama</option>
          <option value="Makanan Penutup">Makanan Penutup</option>
        </select>
      </div>

      {/* Daftar resep */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="border rounded p-4">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-56 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-bold">{recipe.name}</h2>
            <p className="text-sm text-gray-600">{recipe.category}</p>
            <div className="flex space-x-2 mt-2">
              {/* Tombol Detail */}
              <Link
                to={`/recipe/${recipe.id}`}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Detail
              </Link>

              {/* Tombol Edit (Admin atau Pemilik Resep) */}
              {isAdmin || recipe.createdBy === loggedInUser?.username ? (
                <Link
                  to={`/edit-recipe/${recipe.id}`}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </Link>
              ) : null}

              {/* Tombol Favorite */}
              <button
                onClick={() => toggleFavorite(recipe.id, recipe.isBookmarked)}
                className={`px-2 py-1 rounded ${
                  recipe.isBookmarked
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {recipe.isBookmarked ? "Unfavorite" : "Favorite"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
