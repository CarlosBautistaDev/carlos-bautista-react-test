import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProductDetail.scss";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('user') !== null;
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  if (!product) {
    return <div>Loading product ...</div>;
  }

  return (
    <div className="product-detail">
      <h1 className="products-title">Product Details</h1>
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>{product.category}</p>
      <p>${product.price}</p>
      <p>
        Rating: {product.rating.rate} ({product.rating.count} reviews)
      </p>
    </div>
  );
};

export default ProductDetail;
