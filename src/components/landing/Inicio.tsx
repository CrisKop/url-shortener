import React from "react";
import LinksList from "@/components/landing/LinksList";
import LinkForm from "@/components/cutLink/LinkForm";

function Inicio() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="pt-20 mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
            Corta tus links al
            <span className="text-[var(--highlight)]"> instante</span>, con el
            poder de
            <span className="text-[var(--highlight)]"> un rayo⚡</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Así de simple, solo pon el link original y obten uno cortado por un
            rayo.
          </p>
          <LinkForm />
        </div>
      </section>

      {/* Añadimos el componente de listado de rutas */}
      <LinksList />
    </div>
  );
}

export default Inicio;
