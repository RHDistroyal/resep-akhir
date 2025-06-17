import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    note: "",
    ingredients: "",
    steps: "",
    time: "",
    category: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name,
          image: data.image,
          note: Array.isArray(data.note) ? data.note.join(", ") : data.note,
          ingredients: Array.isArray(data.ingredients)
            ? data.ingredients.join(", ")
            : data.ingredients,
          steps: Array.isArray(data.steps)
            ? data.steps.join(". ")
            : data.steps,
          time: data.time,
          category: data.category,
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        note: formData.note.split(",").map((item) => item.trim()),
        ingredients: formData.ingredients.split(",").map((item) => item.trim()),
        steps: formData.steps.split(".").map((item) => item.trim()),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Perubahan berhasil disimpan!", {
          position: "top-center",
          autoClose: 1500,
          onClose: () => navigate(`/recipe/${id}`, { replace: true }), // Navigasi ke halaman detail setelah pemberitahuan
        });
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Notes (comma-separated)</label>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Ingredients (comma-separated)</label>
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Steps (period-separated)</label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Time</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
      {/* Komponen ToastContainer untuk menampilkan notifikasi */}
      <ToastContainer />
    </div>
  );
};

export default EditRecipe;
