import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  // Ambil data pengguna yang login
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAdmin = loggedInUser?.username === "admin";

  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe({ ...data, id: String(data.id) }));
  }, [id]);

  const deleteRecipe = () => {
    fetch(`http://localhost:5000/recipes/${id}`, { method: "DELETE" }).then(() =>
      navigate("/")
    );
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-65 object-cover rounded mb-4"
        />

        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">{recipe.name}</h1>
          <p className="text-gray-600">Kategori: {recipe.category}</p>
          <p className="text-gray-600 mb-4">Estimasi Waktu: {recipe.time}</p>
        </div>

        <div className="mb-4">
            <h2 className="text-lg font-bold">Catatan</h2>
            <ul className="list-disc ml-6">
                {Array.isArray(recipe.note) ? (
                    recipe.note.map((note, index) => <li key={index}>{note}</li>)
                ) : (
                    <li>{recipe.note}</li>
                )}
            </ul>
        </div>


        <div className="mb-4">
          <h2 className="text-lg font-bold">Bahan</h2>
          <ul className="list-disc ml-6">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold">Langkah</h2>
          <ol className="list-decimal ml-6">
            {recipe.steps.map((step, index) => (
              <li key={index} className="mb-2">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Tombol Hapus (Admin atau Pemilik Resep) */}
        <button
          onClick={deleteRecipe}
          disabled={!isAdmin && loggedInUser?.username !== recipe.createdBy}
          className={`${
            isAdmin || loggedInUser?.username === recipe.createdBy
              ? "bg-red-500"
              : "bg-gray-400 cursor-not-allowed"
          } text-white px-4 py-2 rounded`}
        >
          Hapus Resep
        </button>
      </div>
    </div>
  );
}

export default RecipeDetail;
