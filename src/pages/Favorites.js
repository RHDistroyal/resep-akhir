import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/recipes")
      .then((res) => res.json())
      .then((data) => {
        const bookmarkedRecipes = data.filter((recipe) => recipe.isBookmarked);
        setRecipes(bookmarkedRecipes);
      });
  }, []);

  const handleUnbookmark = (id) => {
    fetch(`http://localhost:5000/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBookmarked: false }),
    }).then(() =>
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      )
    );
  };

  if (recipes.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Resep Favorit</h1>
        <p className="text-gray-600">Belum ada resep favorit.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Resep Favorit</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border rounded p-4">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-56 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-bold">{recipe.name}</h2>
            <p className="text-sm text-gray-600">{recipe.category}</p>
            <div className="flex space-x-2 mt-2">
              <Link
                to={`/recipe/${recipe.id}`}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Detail
              </Link>
              <button
                onClick={() => handleUnbookmark(recipe.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Hapus dari Favorit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
