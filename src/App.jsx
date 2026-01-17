
import React, { useEffect, useState } from 'react';
import MobileContainer from './components/Layout/MobileContainer';
import ProductGrid from './components/Catalog/ProductGrid';
import DetailModal from './components/Product/DetailModal';
import AdminDashboard from './components/Admin/AdminDashboard';
import { getProducts } from './api/productManager';

function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.pathname.startsWith('/admin'));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Basic routing check
    if (window.location.pathname.startsWith('/admin')) {
      setIsAdmin(true);
    }

    const loadData = () => {
      const data = getProducts();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <MobileContainer>
      <header style={{
        padding: '24px 16px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '8px' }}>영진원단</h1>

      </header>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>
      ) : (
        <>
          <ProductGrid products={products} onProductClick={handleProductClick} />

          {/* Footer Kakao Link */}
          <div style={{ textAlign: 'center', padding: '40px 0 20px', color: '#999' }}>
            <button
              onClick={() => window.open('http://pf.kakao.com/_LRAAX/chat', '_blank')}
              style={{ background: 'none', textDecoration: 'underline', color: '#999', fontSize: '0.9rem' }}
            >
              카카오톡 상담하기
            </button>
          </div>
        </>
      )}

      {/* Sticky Bottom Bar */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        backgroundColor: '#fff',
        padding: '16px',
        borderTop: '1px solid #eee',
        display: 'flex',
        gap: '10px',
        boxShadow: '0 -4px 10px rgba(0,0,0,0.05)',
        zIndex: 50,
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
      }}>
        <button onClick={() => window.open('https://tally.so/r/eqrK1Q', '_blank')} style={{
          flex: 1,
          padding: '16px',
          backgroundColor: 'var(--primary-color)',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
          fontSize: '1.2rem'
        }}>
          전체 주문서 작성하기
        </button>
      </div>

      {selectedProduct && (
        <DetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </MobileContainer>
  );
}

export default App;
