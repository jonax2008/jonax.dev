import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de Jonax.dev",
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Política de Privacidad</h1>
      <p className="text-sm text-gray-400 mb-8">Última actualización: abril 2025</p>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-lg font-bold text-gray-800">1. Información que recopilamos</h2>
          <p>
            Jonax.dev no recopila información personal de forma directa. Las herramientas
            disponibles en este sitio (sorteador, equivalencias musicales y memorama) funcionan
            exclusivamente en el navegador del usuario. Ningún dato ingresado en estas
            herramientas es enviado a nuestros servidores.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800">2. Cookies y tecnologías de seguimiento</h2>
          <p>
            Este sitio utiliza <strong>Google AdSense</strong> para mostrar anuncios relevantes.
            Google y sus socios pueden usar cookies para personalizar los anuncios que ves según
            tu historial de navegación. Puedes configurar tus preferencias de cookies en la
            sección de configuración de tu navegador o visitando el{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline"
            >
              Centro de preferencias de anuncios de Google
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800">3. Google Analytics</h2>
          <p>
            Podemos utilizar Google Analytics para entender cómo los visitantes interactúan con
            el sitio. Esta información es anónima y agregada; no permite identificar a usuarios
            individuales.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800">4. Terceros</h2>
          <p>
            Los anuncios mostrados en este sitio son servidos por Google AdSense. Google puede
            utilizar la información de tus visitas a este y otros sitios para proporcionar
            anuncios sobre productos y servicios de tu interés. Consulta la{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline"
            >
              Política de Privacidad de Google
            </a>{" "}
            para más información.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800">5. Cambios a esta política</h2>
          <p>
            Nos reservamos el derecho de actualizar esta política de privacidad en cualquier
            momento. Los cambios serán efectivos inmediatamente después de su publicación en
            esta página.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800">6. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través
            de la sección de contacto del sitio.
          </p>
        </section>
      </div>
    </div>
  );
}
