import React from "react";
import LinksList from "./LinksList";

function Inicio() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="pt-20 mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
            Acorta cualquier link con
            <span className="text-[var(--highlight)]"> solo un click</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Así de simple, solo pon el link original y obten uno mas recordable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="https://criskop.com"
              className="w-full sm:flex-1 text-gray-700 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent transition-all"
            />
            <button className="w-full sm:w-auto bg-[var(--highlight)] hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all">
              Acortar
            </button>
          </div>
        </div>
      </section>

      {/* Añadimos el componente de listado de rutas */}
      <LinksList />
    </div>
  );
}

export default Inicio;
