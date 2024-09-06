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
      title: '',
      price: '',
      description: '',
      image: 'https://i.pravatar.cc',
      category: '',
    });
    const [products, setProducts] = useState<Product[]>([]);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(false);

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
      if (!product.title || !product.price || !product.description || !preview || !product.category) {
        setError('Todos los campos son obligatorios');
        return false;
      }
      if (isNaN(Number(product.price))) {
        setError('El precio debe ser un número');
        return false;
      }
      return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) {
        return;
      }
      setProducts([...products, { ...product, image: preview }]);
      setEditing(true);
    };

    const handleCancel = () => {
      setProduct({
        title: '',
        price: '',
        description: '',
        image: 'https://i.pravatar.cc',
        category: '',
      });
      setEditing(false);
    };

    const handleDelete = (index: number) => {
      const newProducts = [...products];
      newProducts.splice(index, 1);
      setProducts(newProducts);
      handleCancel();
    };

    const handleEdit = (index: number) => {
      const productToEdit = products[index];
      setProduct(productToEdit);
      setPreview(productToEdit.image);
      setEditing(false);
    };

    return (
      <>
        <h1 className="products-title">Products</h1>

        {!editing && (
          <form onSubmit={handleSubmit} className="create-product-form">
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
            <button type="submit">Guardar producto</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
          </form>
        )}

        {editing && (
          <div className="product-details">
            <h2>Detalles del producto (previsualizacion)</h2>
            <p>Título: {product.title}</p>
            <p>Precio: {product.price}</p>
            <p>Descripción: {product.description}</p>
            <p>Categoría: {product.category}</p>
            <img src={preview} className="img" alt="Product" />
            <br />
            <br />
            <button onClick={() => handleEdit(0)}>Editar</button> &nbsp;
            <button onClick={() => handleDelete(0)}>Eliminar</button>
          </div>
        )}
      </>
    );
};

export default CreateProductPage;