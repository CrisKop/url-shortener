import { Metadata } from "next";
import links from "../../../../public/links.json";
import { redirect } from "next/navigation";

interface Props {
  params: {
    code: string;
  };
}

// Función para generar metadatos dinámicos basados en la ruta
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = params;
  const linkData = links.find((link) => link.shortened === code);

  if (!linkData) {
    return {
      title: "URL no encontrada - UrlShortener",
    };
  }

  return {
    title: `Redirigido por UrlShortener`,
    description: `Serás redirigido a ${linkData.url}`,
  };
}

// Componente principal
export default function RedirectPage({ params }: Props) {
  const { code } = params;
  const linkData = links.find((link) => link.shortened === code);

  if (!linkData) {
    redirect("/");
    return null;
  }

  // Extraer el dominio para mostrar información
  const urlObj = new URL(linkData.url);
  const domain = urlObj.hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Redirigido por UrlShortener</h1>

        <div className="flex items-center justify-center mb-6">
          <img
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
          Serás redirigido automáticamente en 3 segundos...
        </p>

        <a
          href={linkData.url}
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ir ahora
        </a>

        {/* Script para redirigir después de 3 segundos */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              setTimeout(() => {
                window.location.href = "${linkData.url}";
              }, 3000);
            `,
          }}
        />
      </div>
    </div>
  );
}
