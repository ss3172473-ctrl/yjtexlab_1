import React from 'react';
import '../../styles/main.css';

const MobileContainer = ({ children }) => {
    return (
        <div style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            backgroundColor: 'var(--bg-color)',
            minHeight: '100vh',
            boxShadow: '0 0 20px rgba(0,0,0,0.05)',
            position: 'relative',
            paddingBottom: '80px', // Space for sticky bar
        }}>
            {children}
        </div>
    );
};

export default MobileContainer;
