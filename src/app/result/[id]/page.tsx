"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ResultadoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLink = async () => {
      const res = await fetch(`/api/link/${id}`);
      const data = await res.json();
      if (data) {
        setOriginalUrl(data.url);
        setShortCode(data.shortened);
      }
      setIsLoading(false);
    };
    fetchLink();
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined" && shortCode) {
      setShortUrl(`${window.location.origin}/${shortCode}`);
    }
  }, [shortCode]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  const extractDomain = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return url;
    }
  };

  const getFaviconUrl = (url: string) => {
    const domain = extractDomain(url);
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Cargando...</h1>
        </div>
      </div>
    );
  }

  if (!originalUrl || !shortCode) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            URL no encontrada
          </h1>
          <Link
            href="/"
            className="bg-[var(--highlight)] hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-lg transition-all"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="pt-20 mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Título principal */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
            ¡ZAP!
          </h1>

          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Tu link está listo para compartir. Cópialo y úsalo donde quieras.
          </p>

          {/* Tarjeta de resultado */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            {/* URL Original */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                URL Original:
              </h3>
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
                <Image
                  src={getFaviconUrl(originalUrl)}
                  alt="Favicon"
                  className="w-6 h-6 mr-3"
                />
                <span className="text-gray-600 truncate flex-1">
                  {originalUrl}
                </span>
              </div>
            </div>

            {/* URL Acortada */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Tu URL acortada es:
              </h3>
              <div className="flex items-center gap-3 bg-[var(--highlight)] bg-opacity-10 rounded-lg p-4">
                <div className="flex-1 text-left">
                  <div className="text-2xl font-bold text-[var(--foreground)]">
                    {shortUrl}
                  </div>
                </div>
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    copied
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--highlight)] hover:bg-opacity-90 text-[var(--foreground)] cursor-pointer"
                  }`}
                >
                  {copied ? "¡Copiado!" : "Copiar"}
                </button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={shortUrl}
                target="_blank"
                className="bg-[var(--primary)] hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-lg transition-all"
              >
                Probar enlace
              </Link>
              <Link
                href="/"
                className="border-2 border-[var(--highlight)] text-[var(--highlight)] hover:bg-[var(--highlight)] hover:text-white font-medium px-6 py-3 rounded-lg transition-all"
              >
                Acortar otro enlace
              </Link>
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-2">💡 Consejos:</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Tu enlace acortado nunca expira</li>
              <li>• Puedes compartirlo en redes sociales, emails o mensajes</li>
              <li>• El enlace redirige automáticamente a la URL original</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
