/* =============================================
   SneakPeak — API Connection to Backend
   ============================================= */

const API_URL = 'http://localhost:3000/api';

const apiRequest = async (endpoint, options = {}) => {
    try {
        const token  = localStorage.getItem('sneakpeak_token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
            },
            ...options
        };

        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data     = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};