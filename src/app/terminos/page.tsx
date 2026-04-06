import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description: "Términos de uso de Jonax.dev",
};

export default function TerminosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Términos de Uso</h1>
      <p className="text-sm text-gray-400 mb-8">Última actualización: abril 2025</p>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-lg font-bold text-gray-800">1. Aceptación de los términos</h2>
          <p>
            Al acceder y utilizar Jonax.dev, aceptas estar sujeto a estos Términos de Uso. Si
            no estás de acuerdo con alguno de los términos aquí descritos, te pedimos que no
            uses este sitio.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800">2. Uso del sitio</h2>
          <p>
            Jonax.dev ofrece herramientas gratuitas de uso personal y educativo: un sorteador
            de nombres, una herramienta de equivalencias musicales y un juego de memorama. Estas
            herramientas se proporcionan &quot;tal cual&quot;, sin garantías de ningún tipo.
          </p>
          <p>
            Queda prohibido utilizar este sitio con fines ilegales, fraudulentos o que puedan
            dañar a otros usuarios o a terceros.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800">3. Propiedad intelectual</h2>
          <p>
            Todo el contenido de este sitio, incluyendo textos, diseño, código y gráficos, es
            propiedad de Jonax.dev o de sus respectivos autores. No está permitido reproducir,
            distribuir o crear obras derivadas sin autorización expresa.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800">4. Limitación de responsabilidad</h2>
          <p>
            Jonax.dev no se hace responsable de los resultados obtenidos mediante el uso de sus
            herramientas, en especial del sorteador de nombres. Los sorteos realizados con esta
            herramienta son de carácter informal y no tienen validez legal.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800">5. Publicidad</h2>
          <p>
            Este sitio muestra anuncios de terceros a través de Google AdSense para financiar
            su operación y mantenerse gratuito. Al usar el sitio, aceptas la presencia de estos
            anuncios.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800">6. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso
            continuado del sitio después de cualquier cambio implica la aceptación de los nuevos
            términos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800">7. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes aplicables en la jurisdicción del operador
            del sitio. Cualquier disputa será resuelta en los tribunales competentes.
          </p>
        </section>
      </div>
    </div>
  );
}
