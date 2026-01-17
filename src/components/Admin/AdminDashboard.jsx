import React, { useState, useEffect } from 'react';
import { getProducts, saveProducts, resetData } from '../../api/productManager';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const data = getProducts();
        setProducts(data);
    }, []);

    const handleLogin = () => {
        if (password === 'yj1234') { // Simple hardcoded password
            setIsAuthenticated(true);
        } else {
            alert('Password Incorrect');
        }
    };

    const updateProduct = (id, field, value) => {
        const updated = products.map(p => {
            if (p.id === id) {
                return { ...p, [field]: value };
            }
            return p;
        });
        setProducts(updated);
    };

    const handleSave = () => {
        saveProducts(products);
        alert('저장되었습니다! (브라우저에만 저장됨)');
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(products, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "products_export.json";
        a.click();
    };

    if (!isAuthenticated) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>관리자 로그인</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    style={{ padding: '8px', fontSize: '1rem' }}
                />
                <button onClick={handleLogin} style={{ padding: '8px 16px', marginLeft: '8px' }}>Login</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1>관리자 페이지</h1>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={handleSave} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', marginRight: '10px' }}>저장하기</button>
                <button onClick={handleExport} style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white' }}>데이터 내보내기 (개발자 전달용)</button>
                <button onClick={resetData} style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', float: 'right' }}>데이터 초기화</button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f0f0f0' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>그룹</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>가격 (자동)</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>품절</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.id}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <input
                                    value={p.group || ''}
                                    onChange={(e) => updateProduct(p.id, 'group', e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.price}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                <input
                                    type="checkbox"
                                    checked={p.isSoldOut}
                                    onChange={(e) => updateProduct(p.id, 'isSoldOut', e.target.checked)}
                                />
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {/* Simplified Check - In a real app we'd have inputs for images */}
                                {p.images.length} images
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
