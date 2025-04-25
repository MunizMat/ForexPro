import { useEffect } from 'react';
import api from '../config/axios';

export const useAPIHealthCheck = () => {
  useEffect(() => {
    const controller = new AbortController();

    const checkAPIHealth = async () => {
      if (controller.signal.aborted) return;

      try {
        await api.get('/healthcheck');
      } catch (e) {
        //
      }
    };

    checkAPIHealth();

    return () => {
      controller.abort();
    };
  }, []);
};
