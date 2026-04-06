import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Jonax.dev — Herramientas gratuitas online</p>
        <div className="flex gap-4">
          <Link href="/privacidad" className="hover:text-indigo-600 transition-colors">
            Privacidad
          </Link>
          <Link href="/terminos" className="hover:text-indigo-600 transition-colors">
            Términos
          </Link>
        </div>
      </div>
    </footer>
  );
}
