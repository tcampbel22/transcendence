import { useEffect } from "react";

const useServicePinger = (services: string[]) => {
  useEffect(() => {
    const pingServices = async () => {
      try {
        await Promise.all(
          services.map((service) =>
            fetch(service).catch((err) => console.error(`Failed to ping ${service}`, err))
          )
        );
        console.log("Services pinged successfully");
      } catch (err) {
        console.error("Error pinging services", err);
      }
    };

    const interval = setInterval(pingServices, 120000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      console.log("Stopped pinging services after 20 minutes");
    }, 1200000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [services]);
};

export default useServicePinger;