'use client';

import { ToastContainer } from 'react-toastify';

export default function ClientToastContainer() {
  return <ToastContainer autoClose={5000} pauseOnHover={false} />;
}
