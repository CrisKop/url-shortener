"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RedirectPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const router = useRouter();
  const { code } = use(params);
  const [linkData, setLinkData] = useState<Link | null>(null);
  const [time, setTime] = useState(3);

  const countDown = () => {
    setTime(time - 1);
  };

  useEffect(() => {
    if (!linkData) {
      //router.replace("/");
      return;
    }

    if (time === 0) {
      router.push(linkData.url);
      return;
    }
    const timer = setInterval(countDown, 1000);
    return () => clearInterval(timer);
  }, [time, router, linkData, countDown]);

  useEffect(() => {
    async function fetchLink() {
      try {
        const res = await fetch(`/api/link/${code}`);
        if (!res.ok) {
          //  router.replace("/");
          return;
        }
        const data = await res.json();
        setLinkData(data);
      } catch (error) {
        console.error("Error cargando link:", error);
        //  router.replace("/");
      }
    }

    fetchLink();
  }, [code, router]);

  //Incrementar vistas
  useEffect(() => {
    if (!linkData) return;

    fetch(`/api/link/${linkData._id}/visited`, {
      method: "POST",
    }).catch((err) => console.error("Error incrementando visitas:", err));
  }, [linkData]);

  if (!linkData)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Link No Encontrado</h1>
          <p className="mb-6">El link no existe o ha sido eliminado.</p>
          <Link
            href="/"
            className="inline-block bg-[var(--highlight)] text-[var(--background)] px-6 py-2 rounded-lg hover:bg-[var(--primary)] transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );

  const urlObj = new URL(linkData.url);
  const domain = urlObj.hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Redirigido por ZapCut</h1>

        <div className="flex items-center justify-center mb-6">
          <Image
            width={64}
            height={64}
            src={faviconUrl}
            alt={`Logo de ${domain}`}
            className="w-16 h-16 mr-4"
          />
          <div className="text-left">
            <p className="text-lg font-semibold">{domain}</p>
            <p className="text-gray-600 truncate max-w-xs">{linkData.url}</p>
          </div>
        </div>

        <p className="mb-6">
          Serás redirigido automáticamente en {time} segundos...
        </p>

        <Link
          href={linkData.url}
          className="inline-block bg-[var(--highlight)] text-[var(--background)] px-6 py-2 rounded-lg hover:bg-[var(--primary)] transition-colors"
        >
          Ir ahora
        </Link>
      </div>
    </div>
  );
}
