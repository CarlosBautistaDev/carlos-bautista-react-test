import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../state/store";
import "../styles/ProductsPage.scss";

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

const ProductsPage = () => {
  const products = useStore((state) => state.products);
  const setProducts = useStore((state) => state.setProducts);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "", direction: "" });
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('user') !== null;
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
        });
    }
  }, []);

  useEffect(() => {
    let filteredProducts = products;
    if (search) {
      filteredProducts = products.filter((product: Product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sort.key) {
      filteredProducts.sort((a: Product, b: Product) => {
        if (a[sort.key as keyof Product] < b[sort.key as keyof Product])
          return sort.direction === "asc" ? -1 : 1;
        if (a[sort.key as keyof Product] > b[sort.key as keyof Product])
          return sort.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setDisplayedProducts(filteredProducts.slice(start, end));
  }, [products, search, sort, page]);
  return (
    <div>
      <h1 className="products-title">Products</h1>
      <label className="search-label" htmlFor="search-input">
        Search by:
      </label>
      <input
        id="search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar productos"
      />
      <table className="styled-table">
        <thead>
          <tr>
            <th
              onClick={() =>
                setSort({
                  key: "title",
                  direction: sort.direction === "asc" ? "desc" : "asc",
                })
              }
            >
              Nombre
            </th>
            <th
              onClick={() =>
                setSort({
                  key: "price",
                  direction: sort.direction === "asc" ? "desc" : "asc",
                })
              }
            >
              Precio
            </th>
            <th
              onClick={() =>
                setSort({
                  key: "description",
                  direction: sort.direction === "asc" ? "desc" : "asc",
                })
              }
            >
              Descripción
            </th>
            <th
              onClick={() =>
                setSort({
                  key: "category",
                  direction: sort.direction === "asc" ? "desc" : "asc",
                })
              }
            >
              Categoría
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedProducts.map((product: Product) => (
            <tr
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {(() => {
          const filteredProducts = products.filter((product: Product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
          );
          const startPage = Math.max(1, page - 2);
          const endPage = Math.min(
            Math.ceil(filteredProducts.length / pageSize),
            page + 2
          );
          return Array(endPage - startPage + 1)
            .fill(0)
            .map((_, index) => (
              <button key={index} onClick={() => setPage(startPage + index)}>
                {startPage + index}
              </button>
            ));
        })()}
      </div>
    </div>
  );
};

export default ProductsPage;
