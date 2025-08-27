"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

function LinkForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(timer); // limpieza para evitar fugas
  }, [error]);

  const sendForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Por favor ingresa una URL");
      return;
    }

    if (!validateUrl(url)) {
      setError(
        "Por favor ingresa una URL válida (debe incluir http:// o https://)"
      );
      return;
    }

    setIsLoading(true);
    // Lógica para acortar el link
    try {
      const res = await fetch("/api/link", {
        method: "POST",
        body: JSON.stringify({ url }),
      });
      const data = await res.json();

      if (res.ok) {
        router.push(`/result/${data._id}`);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error al acortar el link:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Lógica para acortar el link
              sendForm(e);
            }
          }}
          type="text"
          placeholder="https://criskop.com"
          className="w-full sm:flex-1 text-gray-700 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent transition-all"
          disabled={isLoading}
        />
        <button
          onClick={sendForm}
          disabled={isLoading}
          className="cursor-pointer w-full hover:bg-[var(--primary)] text-[var(--background)] sm:w-auto bg-[var(--highlight)] hover:bg-opacity-90 font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Tirando el rayo..." : "Cortar"}
        </button>
      </div>
      {error && (
        <p className="text-left max-w-2xl mx-auto text-red-500 mt-2 text-sm">
          {error}
        </p>
      )}
    </>
  );
}

export default LinkForm;
