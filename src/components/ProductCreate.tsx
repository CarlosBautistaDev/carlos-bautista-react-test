import React, { useState } from "react";
import "../styles/ProductCreate.scss";

type Product = {
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
};

const CreateProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    title: "",
    price: "",
    description: "",
    image: "https://i.pravatar.cc",
    category: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    status: string;
    message: string;
  } | null>(null);
  const [previewing, setPreviewing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    if (
      !product.title ||
      !product.price ||
      !product.description ||
      !preview ||
      !product.category
    ) {
      setError("Todos los campos son obligatorios");
      return false;
    }
    if (isNaN(Number(product.price))) {
      setError("El precio debe ser un número");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product, image: preview }),
      });
      const data = await response.json();
      if (data) {
        setProducts([...products, { ...product, image: preview }]);
        setResponse({
          status: "success",
          message: "Producto creado con éxito",
        });
        setPreviewing(true);
      } else {
        setError("Error al crear el producto");
      }
    } catch (error) {
      setError("Error al crear el producto");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setProduct({
      title: "",
      price: "",
      description: "",
      image: "https://i.pravatar.cc",
      category: "",
    });
    setEditing(false);
    setPreviewing(false);
    setPreview("");
    setError("");
    setResponse(null);  
  };

  const handleDelete = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    handleCancel();
  };
  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setPreviewing(true);
  };

  const handleEdit = () => {
    setEditing(false);
    setPreviewing(false);
  };

  return (
    <div className="product-create">
      <h1 className="products-title">Create Products</h1>

      {loading && <div className="loader">Cargando...</div>}

      {!loading && response && previewing && (
        <div className="response">
          <p>{(response as { message: string }).message}</p>
          <button className="new-product-button" onClick={handleCancel}>
            Crear nuevo producto
          </button>
        </div>
      )}

      {!loading && !response && !previewing && (
        <form className="create-product-form">
          {error && <p className="error">{error}</p>}

          <label>
            Título:
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Precio:
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Descripción:
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Imagen:
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
            />
            {preview && <img src={preview} alt="Preview" />}
          </label>
          <label>
            Categoría:
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </label>

          <button type="button" onClick={handlePreview}>
            Previsualizar producto
          </button>
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        </form>
      )}

      {!loading && !response && (editing || previewing) && (
        <div className="product-details">
          <h2>Detalles del producto (previsualización)</h2>
          <p>Título: {product.title}</p>
          <p>Precio: {product.price}</p>
          <p>Descripción: {product.description}</p>
          <p>Categoría: {product.category}</p>
          <img src={preview} className="img" alt="Product" />
          <br />
          <br />
          <button className="edit-button" onClick={() => handleEdit()}>
            Editar
          </button>{" "}
          &nbsp;
          <button className="delete-button" onClick={() => handleDelete(0)}>
            Eliminar
          </button>
          <button className="submit-button" onClick={handleSubmit}>
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateProductPage;
