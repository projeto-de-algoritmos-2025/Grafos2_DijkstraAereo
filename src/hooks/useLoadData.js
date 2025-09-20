import { useState, useEffect } from "react";
import Papa from "papaparse";

export const useLoadData = (fileName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const response = await fetch(`${import.meta.env.BASE_URL}${fileName}`);
        if (!response.ok) {
          throw new Error(`Erro ao carregar arquivo: ${response.status}`);
        }

        const txt = await response.text();
        const parsed = Papa.parse(txt, {
          header: true,
          skipEmptyLines: true,
        }).data;

        setData(parsed);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setLoading(false);
      }
    }
    loadData();
  }, [fileName]);

  return { data, loading, error };
};
