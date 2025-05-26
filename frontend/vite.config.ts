import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env': JSON.stringify(process.env) // Ensures env variables are available
  }
});
