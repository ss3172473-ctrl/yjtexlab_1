import { initialProductData, getDriveImageLink } from './productData';

const STORAGE_KEY = 'yj_archive_data_v1';

export const getProducts = () => {
    // Try to get from LocalStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    let products = saved ? JSON.parse(saved) : initialProductData;

    // Process for display (transform to match component expectations)
    return products.map(p => {
        // Determine Price
        let price = '2,000';
        if (p.group && (p.group.includes('나염') || p.group.includes('Print'))) {
            price = '3,000';
        }

        return {
            id: p.id,
            group: p.group,
            price: price, // Auto-calculated
            images: p.imageIds ? p.imageIds.map(getDriveImageLink).filter(Boolean) : [],
            isSoldOut: p.isSoldOut || false
        };
    });
};

// Admin Functions
export const saveProducts = (newProducts) => {
    // We only save the raw data (id, group, imageIds, isSoldOut), not the calculated price/image URLs
    const rawData = newProducts.map(p => ({
        id: p.id,
        group: p.group,
        imageIds: p.images.map(url => {
            // Extract ID from URL if possible, or keep as URL if manual
            if (url.includes('id=')) return url.split('id=')[1].split('&')[0];
            return url; // fallback
        }),
        isSoldOut: p.isSoldOut
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rawData));
};

export const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
};
