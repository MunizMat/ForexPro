import { useEffect, useMemo, useState } from 'react';
import api from '../config/axios';

const INTERVAL_DELAY = 3000;
const MAX_RETRIES = 100;

export const useAPIHealthCheck = () => {
  const [isAPIHealthy, setIsAPIHealthy] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let attempts = 0;

    const checkAPIHealth = async () => {
      if (controller.signal.aborted) return;

      try {
        const { status, data } = await api.get('/healthcheck');

        if (status === 200 && data.status === 'OK') setIsAPIHealthy(true);
      } catch (e) {
        console.error(e);
      }

      attempts++;
    };

    const interval = setInterval(() => {
      if (
        controller.signal.aborted ||
        isAPIHealthy ||
        attempts >= MAX_RETRIES
      ) {
        clearInterval(interval);
        controller.abort();
        return;
      }

      checkAPIHealth();
    }, INTERVAL_DELAY);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  return useMemo(() => {
    isAPIHealthy;
  }, [isAPIHealthy]);
};
