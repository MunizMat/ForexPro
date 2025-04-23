import { useEffect } from 'react';
import api from '../config/axios';

const INTERVAL_DELAY = 3000;
const MAX_RETRIES = 100;

export const useAPIHealthCheck = () => {
  useEffect(() => {
    const controller = new AbortController();
    let attempts = 0;
    // eslint-disable-next-line prefer-const
    let isAPIHealthy = false;

    const checkAPIHealth = async () => {
      if (controller.signal.aborted) return;

      try {
        const { status, data } = await api.get('/healthcheck');

        console.log({ status, data });

        if (status === 200 && data === 'OK') isAPIHealthy = true;
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
};
