import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  RAW_MARKDOWN_CONTENT,
  DIMENSIONS,
  CUBE_CELLS,
} from '../data/mccumberContent';
import {
  Calendar,
  User,
  Lightbulb,
  CheckCircle,
  FileText,
  Clock,
  ArrowRight,
  Image as ImageIcon,
  Box,
  List
} from 'lucide-react';

interface MarkdownViewerProps {
  onGoToCube: () => void;
}

// ponytail: compact top layout and TOC offset aligned with slim header
export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  onGoToCube,
}) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table of Contents Sidebar (Solo Índice) */}
        <aside className="lg:col-span-3 order-2 lg:order-1">
          <div className="sticky top-14 border border-neutral-800 bg-neutral-900/90 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 pb-2.5 border-b border-neutral-800">
              <List className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Índice del Documento
              </span>
            </div>

            <nav className="mt-3 space-y-0.5 text-xs text-neutral-400 font-medium">
              <a
                href="#introduccion"
                className="block px-2 py-1.5 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                1. Introducción y Contexto
              </a>
              <a
                href="#dimensiones"
                className="block px-2 py-1.5 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                2. Las Tres Dimensiones
              </a>
              <a
                href="#eje-cia"
                className="block pl-4 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                • Metas CIA (Y)
              </a>
              <a
                href="#eje-estados"
                className="block pl-4 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                • Estados de Datos (X)
              </a>
              <a
                href="#eje-salvaguardas"
                className="block pl-4 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                • Salvaguardas (Z)
              </a>
              <a
                href="#matriz-27"
                className="block px-2 py-1.5 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                3. Matriz de 27 Intersecciones
              </a>
              <a
                href="#caso-practico"
                className="block px-2 py-1.5 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                4. Caso Práctico de Diagnóstico
              </a>
              <a
                href="#marcos-internacionales"
                className="block px-2 py-1.5 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                5. Relación con ISO 27001 y NIST
              </a>
              <a
                href="#conclusion"
                className="block px-2 py-1.5 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                6. Conclusión
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Article Content */}
        <main className="lg:col-span-9 order-1 lg:order-2">
          {/* Document Header Card */}
          <div className="mb-5 border border-neutral-800 bg-neutral-900/90 p-4 sm:p-5 backdrop-blur-md shadow-lg">
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 pb-3 border-b border-neutral-800 font-mono">
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-blue-400" />
                <span>John McCumber</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-purple-400" />
                <span>1991 (Marco Original)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-400" />
                <span>Lectura: ~7 min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-amber-400" />
                <span>Ciberseguridad y Riesgos</span>
              </div>
            </div>

            {/* Title */}
            <div className="mt-3">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                Cubo de McCumber: Modelo Integral de Ciberseguridad
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Marco conceptual para evaluar y diseñar programas de seguridad cubriendo las 27 intersecciones entre la <strong>Tríada CIA</strong>, los <strong>Estados de Datos</strong> y las <strong>Salvaguardas</strong>.
              </p>
            </div>

            {/* BANNER CTA: EXPLORAR CUBO 3D */}
            <div className="mt-4 border border-cyan-500/50 bg-gradient-to-r from-cyan-950/70 via-blue-950/60 to-neutral-950 p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md shadow-cyan-950/40">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-cyan-500 text-black font-black">
                  <Box className="h-4 w-4 text-neutral-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-cyan-300">
                      Experiencia Interactiva 3D
                    </span>
                    <span className="bg-cyan-400 text-neutral-950 text-[10px] font-mono font-bold px-1 py-0.2">
                      NUEVO
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    Interactúa con las 27 celdas sólidas y rota en 360°.
                  </p>
                </div>
              </div>

              <button
                id="banner-goto-cube-btn"
                onClick={onGoToCube}
                className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider border border-cyan-200 shadow-sm transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Explorar Cubo 3D</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        {/* Rendered Markdown Article */}
        <article className="space-y-8 text-neutral-300 leading-relaxed">
          {/* Section 1: Intro */}
          <section id="introduccion" className="border border-neutral-800 bg-neutral-900/70 p-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center bg-blue-500/20 text-blue-400 text-sm font-bold">
                1
              </span>
              Introducción y Contexto Histórico
            </h2>
            <div className="mt-4 space-y-3 text-sm text-neutral-300">
              <p>
                En 1991, <strong>John McCumber</strong> presentó un artículo pionero titulado <em>"Information Systems Security: A Framework for Business and Government"</em>. En ese momento, la seguridad informática solía tratarse como un problema netamente técnico enfocado en computadoras aisladas. McCumber reconoció que la seguridad de la información no podía reducirse únicamente a herramientas de software y hardware, sino que requería una perspectiva holística.
              </p>
              <p>
                Para ilustrar este enfoque, concibió una representación tridimensional análoga a un <strong>Cubo de Rubik de 3 × 3 × 3</strong>, compuesto por <strong>27 celdas o facetas interconectadas</strong>. Cada celda representa una intersección crítica donde debe evaluarse y garantizarse la protección.
              </p>
            </div>

            {/* Original Diagram Image Figure Card */}
            <div className="mt-6 border border-neutral-800 bg-neutral-950 p-4 sm:p-5 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
                <ImageIcon className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-bold text-white">
                  Diagrama Original del Cubo de McCumber (1991)
                </span>
              </div>

              {/* Image container: limpio y nítido */}
              <div className="mt-4 border border-neutral-800 bg-neutral-900/60 p-3 sm:p-6 flex flex-col items-center justify-center">
                <div className="max-w-md w-full flex items-center justify-center">
                  <img
                    src="/assets/mccumber-cube.png"
                    alt="Cubo de McCumber (Diagrama Original del Modelo de 1991)"
                    className="h-auto max-h-[380px] w-auto max-w-full object-contain shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Image Caption & Legend */}
                <div className="mt-4 w-full text-center">
                  <p className="text-xs font-medium text-neutral-300">
                    <strong>Figura 1:</strong> Representación tridimensional del Modelo McCumber original.
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-500">
                    Ilustración canónica de las 27 intersecciones entre la Tríada CIA, Estados de la Información y Salvaguardas.
                  </p>

                  {/* EYE-CATCHING CTA BUTTON FOR 3D CUBE UNDER FIGURE 1 */}
                  <div className="mt-4 flex items-center justify-center pt-3 border-t border-neutral-800">
                    <button
                      onClick={onGoToCube}
                      className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all hover:scale-105"
                    >
                      <Box className="h-4 w-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
                      <span>Explorar el Cubo en 3D Interactivo</span>
                      <ArrowRight className="h-3.5 w-3.5 text-cyan-200" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Principle Callout */}
            <div className="mt-5 border-l-4 border-emerald-500 bg-emerald-500/10 p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <Lightbulb className="h-4 w-4" />
                <span>Principio Cardinal de McCumber</span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-emerald-100">
                Ninguna estrategia de ciberseguridad es sólida si descuida cualquiera de las 27 intersecciones. La seguridad es tan fuerte como su eslabón más débil: un sistema con el cifrado más avanzado (Tecnología) fracasará si los colaboradores entregan sus contraseñas por teléfono (Factor Humano).
              </p>
            </div>
          </section>

              {/* Section 2: The 3 Dimensions */}
              <section id="dimensiones" className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 text-sm font-bold">
                      2
                    </span>
                    Las Tres Dimensiones del Modelo
                  </h2>
                  <p className="mt-2 text-sm text-neutral-400">
                    El Cubo de McCumber organiza la ciberseguridad en tres ejes complementarios:
                  </p>
                </div>

                {/* 3 Dimensions Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Dim 1: CIA */}
                  <div id="eje-cia" className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-blue-400 uppercase">Eje Y • Metas</span>
                        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] text-blue-300 font-semibold">Tríada CIA</span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-white">1. Metas de Seguridad</h3>
                      <p className="mt-1 text-xs text-neutral-300">¿Qué aspecto de la información defendemos?</p>
                      <ul className="mt-3 space-y-2 text-xs text-neutral-300">
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-400 font-bold">•</span>
                          <span><strong>Confidencialidad:</strong> Acceso reservado a partes autorizadas.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-400 font-bold">•</span>
                          <span><strong>Integridad:</strong> Exactitud y protección contra alteraciones.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-400 font-bold">•</span>
                          <span><strong>Disponibilidad:</strong> Acceso oportuno y continuo para usuarios legítimos.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Dim 2: States */}
                  <div id="eje-estados" className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-purple-400 uppercase">Eje X • Ciclo de Vida</span>
                        <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] text-purple-300 font-semibold">3 Estados</span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-white">2. Estados de Datos</h3>
                      <p className="mt-1 text-xs text-neutral-300">¿En qué fase dinámica reside el dato?</p>
                      <ul className="mt-3 space-y-2 text-xs text-neutral-300">
                        <li className="flex items-start gap-1.5">
                          <span className="text-purple-400 font-bold">•</span>
                          <span><strong>En Reposo:</strong> Guardado en discos duros, bases de datos o cloud.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-purple-400 font-bold">•</span>
                          <span><strong>En Tránsito:</strong> Viajando por redes locales, fibra o Internet.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-purple-400 font-bold">•</span>
                          <span><strong>En Proceso:</strong> Activo en memoria RAM, CPU o ejecución.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Dim 3: Safeguards */}
                  <div id="eje-salvaguardas" className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-emerald-400 uppercase">Eje Z • Mecanismos</span>
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 font-semibold">3 Disciplinas</span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-white">3. Salvaguardas</h3>
                      <p className="mt-1 text-xs text-neutral-300">¿Con qué medios implementamos la defensa?</p>
                      <ul className="mt-3 space-y-2 text-xs text-neutral-300">
                        <li className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span><strong>Tecnología:</strong> Firewalls, cifrado, antivirus, HSM, parches.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span><strong>Políticas:</strong> Normas, directrices de seguridad, auditorías.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span><strong>Personas:</strong> Concientización, simulacros anti-phishing, ética.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: 27 Intersections Table */}
              <section id="matriz-27" className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 text-sm font-bold">
                        3
                      </span>
                      Matriz de las 27 Intersecciones de Seguridad
                    </h2>
                    <p className="mt-1 text-xs text-neutral-400">
                      Desglose de controles específicos para cada combinación tridimensional.
                    </p>
                  </div>
                  <button
                    id="table-goto-cube-btn"
                    onClick={onGoToCube}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors self-start"
                  >
                    <span>Ver en Cubo 3D</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                {/* Interactive Table Container with high-contrast borders */}
                <div className="overflow-x-auto rounded-xl border-2 border-neutral-700 bg-neutral-950 shadow-2xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-neutral-900 border-b-2 border-neutral-600 text-neutral-200 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="px-3.5 py-3 w-12 text-center border-r border-neutral-700">#</th>
                        <th className="px-4 py-3 whitespace-nowrap border-r border-neutral-700">Meta (CIA)</th>
                        <th className="px-4 py-3 whitespace-nowrap border-r border-neutral-700">Estado</th>
                        <th className="px-4 py-3 whitespace-nowrap border-r border-neutral-700">Salvaguarda</th>
                        <th className="px-4 py-3 min-w-[320px]">Mecanismos y Controles Clave</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-700 font-sans">
                      {CUBE_CELLS.map((cell, idx) => (
                        <tr
                          key={cell.id}
                          className={`hover:bg-neutral-800/60 transition-colors align-top ${
                            idx % 2 === 1 ? 'bg-neutral-900/40' : 'bg-neutral-950'
                          }`}
                        >
                          <td className="px-3.5 py-3 font-mono text-neutral-400 font-semibold text-center border-r border-neutral-700 whitespace-nowrap">
                            {idx + 1}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap border-r border-neutral-700">
                            <span
                              className={`inline-block rounded px-2.5 py-0.5 text-[11px] font-semibold border ${
                                cell.ciaId === 'confidentiality'
                                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                  : cell.ciaId === 'integrity'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              }`}
                            >
                              {cell.ciaId === 'confidentiality'
                                ? 'Confidencialidad'
                                : cell.ciaId === 'integrity'
                                ? 'Integridad'
                                : 'Disponibilidad'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-neutral-200 font-medium whitespace-nowrap border-r border-neutral-700">
                            {cell.stateId === 'rest'
                              ? 'En Reposo'
                              : cell.stateId === 'transit'
                              ? 'En Tránsito'
                              : 'En Proceso'}
                          </td>
                          <td className="px-4 py-3 text-neutral-200 font-medium whitespace-nowrap border-r border-neutral-700">
                            {cell.safeguardId === 'technology'
                              ? 'Tecnología'
                              : cell.safeguardId === 'policies'
                              ? 'Políticas'
                              : 'Personas'}
                          </td>
                          <td className="px-4 py-3 text-neutral-200">
                            <ul className="space-y-2">
                              {cell.controls.map((control, cIdx) => (
                                <li key={cIdx} className="flex items-start gap-2.5 leading-relaxed text-neutral-200">
                                  <span className="text-cyan-400 select-none shrink-0 font-black">•</span>
                                  <span className="break-words">{control}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 4: Practical Case */}
              <section id="caso-practico" className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-bold">
                    4
                  </span>
                  Caso Práctico de Diagnóstico con el Cubo
                </h2>
                <p className="text-sm text-neutral-300">
                  Imaginemos un hospital que busca evaluar la seguridad de las historias clínicas de sus pacientes:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                    <div className="text-xs font-bold text-amber-400 uppercase">Escenario A: Datos en Reposo</div>
                    <p className="mt-2 text-xs text-neutral-300">
                      Los servidores tienen discos duros con cifrado AES-256 (<em>Confidencialidad + Reposo + Tecnología</em>).
                    </p>
                    <div className="mt-3 rounded-lg bg-red-500/10 border border-red-500/20 p-2.5 text-xs text-red-200">
                      <strong>Vulnerabilidad:</strong> Los médicos anotan contraseñas en notas Post-it pegadas a monitores (falla en <em>Confidencialidad + Reposo + <strong>Personas</strong></em>).
                    </div>
                  </div>

                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                    <div className="text-xs font-bold text-purple-400 uppercase">Escenario B: Datos en Tránsito</div>
                    <p className="mt-2 text-xs text-neutral-300">
                      Las consultas viajan cifradas con TLS 1.3 (<em>Confidencialidad + Tránsito + Tecnología</em>).
                    </p>
                    <div className="mt-3 rounded-lg bg-red-500/10 border border-red-500/20 p-2.5 text-xs text-red-200">
                      <strong>Vulnerabilidad:</strong> No hay política que prohíba enviar análisis por WhatsApp personal (falla en <em>Confidencialidad + Tránsito + <strong>Políticas</strong></em>).
                    </div>
                  </div>

                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                    <div className="text-xs font-bold text-blue-400 uppercase">Escenario C: Disponibilidad</div>
                    <p className="mt-2 text-xs text-neutral-300">
                      Los servidores replican réplicas continuas a la nube (<em>Disponibilidad + Reposo + Tecnología</em>).
                    </p>
                    <div className="mt-3 rounded-lg bg-red-500/10 border border-red-500/20 p-2.5 text-xs text-red-200">
                      <strong>Vulnerabilidad:</strong> Nadie ha probado restaurar un backup en 3 años (falla en <em>Disponibilidad + Reposo + <strong>Políticas / Personas</strong></em>).
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Standards Alignment */}
              <section id="marcos-internacionales" className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-bold">
                    5
                  </span>
                  Relación con Marcos Internacionales Modernos
                </h2>
                <p className="text-sm text-neutral-300">
                  El modelo conceptual de McCumber (1991) sirve como base directa de los marcos contemporáneos de ciberseguridad:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                    <h3 className="text-sm font-bold text-white">ISO/IEC 27001 & 27002</h3>
                    <p className="mt-1 text-xs text-neutral-400">
                      Clasifica los controles de seguridad en 4 categorías: organizacionales (Políticas), de personas (Factor Humano), físicos y tecnológicos (Tecnología), aplicados a la Tríada CIA.
                    </p>
                  </div>

                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                    <h3 className="text-sm font-bold text-white">NIST Cybersecurity Framework (CSF 2.0)</h3>
                    <p className="mt-1 text-xs text-neutral-400">
                      Estructurado en funciones: Gobernar, Identificar, Proteger, Detectar, Responder y Recuperar, cubriendo datos en reposo, en tránsito y en procesamiento.
                    </p>
                  </div>

                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                    <h3 className="text-sm font-bold text-white">CIS Controls (Center for Internet Security)</h3>
                    <p className="mt-1 text-xs text-neutral-400">
                      18 controles prioritarios que combinan defensas técnicas automatizadas con políticas de gestión y capacitación humana continua.
                    </p>
                  </div>

                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                    <h3 className="text-sm font-bold text-white">Confidential Computing & Zero Trust</h3>
                    <p className="mt-1 text-xs text-neutral-400">
                      Extiende la protección al estado más vulnerable (Datos en Procesamiento) mediante enclaves seguros de CPU y el principio de "nunca confiar, verificar siempre".
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6: Conclusion */}
              <section id="conclusion" className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 text-sm font-bold">
                    6
                  </span>
                  Conclusión
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  El Cubo de McCumber demuestra que <strong>la ciberseguridad no es un producto que se compra, sino un ecosistema multidimensional que se gestiona</strong>. Para mantener una infraestructura verdaderamente segura, cada dato debe estar protegido en todo momento (reposo, tránsito o uso), preservando su tríada (confidencialidad, integridad y disponibilidad), y apoyándose de manera equilibrada en la tecnología, las políticas organizacionales y la formación de los seres humanos.
                </p>
              </section>
            </article>

            {/* Document Footnote / Attribution */}
            <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
              <span className="text-neutral-500">Cubo de McCumber (1991) • Vault Note</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-cyan-500/30">
                <span className="text-neutral-400">Aportado por</span>
                <span className="font-bold text-cyan-300">Nomka0</span>
              </div>
            </div>
        </main>
      </div>
    </div>
  );
};
