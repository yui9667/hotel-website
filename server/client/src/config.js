let BACKEND_URL;
if (typeof window !== 'undefined') {
  BACKEND_URL = import.meta.VITE_BACKEND_URL || 'http://localhost:3002';
} else {
  BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:3002';
}
export default BACKEND_URL;
