export interface DimensionItem {
  id: string;
  name: string;
  shortName: string;
  englishName: string;
  color: string;
  iconName: string;
  summary: string;
  details: string[];
}

export interface Dimension {
  id: 'cia' | 'states' | 'safeguards';
  title: string;
  subtitle: string;
  description: string;
  color: string;
  items: DimensionItem[];
}

export interface CubeCell {
  id: string; // e.g., 'conf-rest-tech'
  ciaId: 'confidentiality' | 'integrity' | 'availability';
  stateId: 'rest' | 'transit' | 'processing';
  safeguardId: 'technology' | 'policies' | 'people';
  title: string;
  shortDescription: string;
  objective: string;
  controls: string[];
  realWorldExample: string;
  standardReference: string;
  riskMitigated: string;
}

export interface CanvasNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'text' | 'group' | 'file';
  color?: string;
  label?: string;
  text?: string;
  file?: string;
  alt?: string;
}

export interface CanvasEdge {
  id: string;
  fromNode: string;
  toNode: string;
  fromSide?: 'top' | 'right' | 'bottom' | 'left';
  toSide?: 'top' | 'right' | 'bottom' | 'left';
  label?: string;
  color?: string;
}

export const DIMENSIONS: Dimension[] = [
  {
    id: 'cia',
    title: 'Metas de Seguridad (Tríada CIA)',
    subtitle: 'Los objetivos primordiales de la protección de la información',
    description: 'Los tres pilares esenciales que determinan qué aspecto de la información se está resguardando contra amenazas.',
    color: '#3b82f6', // blue
    items: [
      {
        id: 'confidentiality',
        name: 'Confidencialidad',
        shortName: 'Conf.',
        englishName: 'Confidentiality',
        color: '#3b82f6',
        iconName: 'Shield',
        summary: 'Garantizar que la información sea accesible únicamente por las partes autorizadas.',
        details: [
          'Previene la divulgación indebida o espionaje de datos sensibles.',
          'Mecanismos clave: Criptografía (simétrica y asimétrica), control de acceso estricto (RBAC, ABAC), enmascaramiento de datos y acuerdos de confidencialidad (NDA).'
        ]
      },
      {
        id: 'integrity',
        name: 'Integridad',
        shortName: 'Integ.',
        englishName: 'Integrity',
        color: '#10b981',
        iconName: 'CheckCircle2',
        summary: 'Asegurar la exactitud, completitud y confiabilidad de los datos, evitando alteraciones no autorizadas.',
        details: [
          'Protege contra modificaciones intencionadas (manipulación) o accidentales (corrupción).',
          'Mecanismos clave: Funciones hash criptográficas (SHA-256), firmas digitales, sumas de verificación (checksums), control de versiones y no repudio.'
        ]
      },
      {
        id: 'availability',
        name: 'Disponibilidad',
        shortName: 'Disp.',
        englishName: 'Availability',
        color: '#f59e0b',
        iconName: 'Clock',
        summary: 'Garantizar el acceso oportuno y confiable a los sistemas e información para los usuarios legítimos.',
        details: [
          'Protege contra interrupciones de servicio, ataques de denegación de servicio (DoS/DDoS) y fallos de infraestructura.',
          'Mecanismos clave: Redundancia de servidores y red (HA), planes de recuperación ante desastres (DRP), copias de seguridad (backups) y mantenimiento preventivo.'
        ]
      }
    ]
  },
  {
    id: 'states',
    title: 'Estados de la Información',
    subtitle: 'Las fases en las que existen los datos dentro del ciclo de vida digital',
    description: 'La información adopta diferentes formas dinámicas y estáticas; cada una presenta vectores de ataque y vulnerabilidades específicas.',
    color: '#8b5cf6', // purple
    items: [
      {
        id: 'rest',
        name: 'En Reposo (Almacenamiento)',
        shortName: 'Reposo',
        englishName: 'Data at Rest / Storage',
        color: '#8b5cf6',
        iconName: 'HardDrive',
        summary: 'Información almacenada en medios estáticos como discos duros, bases de datos, cintas o nubes.',
        details: [
          'Vectores de amenaza: Robo físico de discos, accesos no autorizados a bases de datos, ransomware local.',
          'Controles: Cifrado a nivel de disco completo (FDE, BitLocker, LUKS), cifrado de bases de datos (TDE), gestión segura de claves (KMS).'
        ]
      },
      {
        id: 'transit',
        name: 'En Tránsito (Transmisión)',
        shortName: 'Tránsito',
        englishName: 'Data in Transit / Transmission',
        color: '#ec4899',
        iconName: 'Network',
        summary: 'Información que viaja a través de redes locales, enlaces inalámbricos o el Internet público.',
        details: [
          'Vectores de amenaza: Interceptación (Man-in-the-Middle), sniffing de paquetes, suplantación (spoofing).',
          'Controles: Protocolos seguros de transporte (TLS 1.3, HTTPS, SSH, IPsec VPN), segmentación de red y cifrado punto a punto.'
        ]
      },
      {
        id: 'processing',
        name: 'En Procesamiento (Uso)',
        shortName: 'Proceso',
        englishName: 'Data in Process / Usage',
        color: '#06b6d4',
        iconName: 'Cpu',
        summary: 'Información siendo activamente leída, transformada o manipulada en memoria RAM, registros o CPU.',
        details: [
          'Vectores de amenaza: Volcados de memoria (RAM dumps), inyección de código, ataques de canal lateral, elevación de privilegios.',
          'Controles: Computación confidencial (enclaves seguros como Intel SGX / AMD SEV), limpieza de memoria, validación estricta de entradas y sanitización.'
        ]
      }
    ]
  },
  {
    id: 'safeguards',
    title: 'Medidas de Seguridad (Salvaguardas)',
    subtitle: 'Los medios y recursos desplegados para implementar la protección',
    description: 'La seguridad efectiva no es sólo técnica: requiere una combinación equilibrada de herramientas tecnológicas, procesos formales y concientización humana.',
    color: '#10b981', // emerald
    items: [
      {
        id: 'technology',
        name: 'Tecnología',
        shortName: 'Tecno.',
        englishName: 'Technology',
        color: '#38bdf8',
        iconName: 'Laptop',
        summary: 'Herramientas de software, hardware y arquitectura técnica implementadas para proteger la información.',
        details: [
          'Ejemplos: Firewalls de última generación (NGFW), sistemas de prevención de intrusos (IPS/IDS), software antivirus/EDR, sistemas SIEM/SOAR y criptografía.'
        ]
      },
      {
        id: 'policies',
        name: 'Políticas y Prácticas',
        shortName: 'Políticas',
        englishName: 'Policies & Practices',
        color: '#fbbf24',
        iconName: 'FileText',
        summary: 'Regulaciones, normativas organizacionales, procedimientos operativos estándar y marcos de gobernanza.',
        details: [
          'Ejemplos: Políticas de contraseñas, directrices de teletrabajo seguro, procedimientos de respuesta a incidentes, auditorías periódicas y alineación con ISO 27001 o NIST.'
        ]
      },
      {
        id: 'people',
        name: 'Personas (Factor Humano)',
        shortName: 'Personas',
        englishName: 'People / Awareness',
        color: '#f87171',
        iconName: 'Users',
        summary: 'Concientización, educación continua, cultura organizacional y entrenamiento del personal.',
        details: [
          'Es a menudo el eslabón más vulnerable o la primera línea de defensa (human firewall).',
          'Ejemplos: Simulacros periódicos de phishing, talleres de ingeniería social, capacitación en desarrollo seguro y fomento de reporte de incidentes.'
        ]
      }
    ]
  }
];

// Generar las 27 celdas del Cubo de McCumber (3 x 3 x 3)
export const CUBE_CELLS: CubeCell[] = [
  // 1. Confidencialidad x Reposo x Tecnología
  {
    id: 'conf-rest-tech',
    ciaId: 'confidentiality',
    stateId: 'rest',
    safeguardId: 'technology',
    title: 'Cifrado de Almacenamiento y Control de Acceso Técnico',
    shortDescription: 'Criptografía y controles técnicos para datos guardados en reposo.',
    objective: 'Impedir que actores no autorizados lean datos sensibles en discos, bases de datos o backups.',
    controls: ['Cifrado AES-256 de disco completo (BitLocker, LUKS)', 'Cifrado transparente de bases de datos (TDE)', 'Módulos HSM para custodia de llaves criptográficas', 'Control de acceso basado en roles (RBAC) con MFA'],
    realWorldExample: 'Un atacante roba físicamente el disco duro de un servidor corporativo o una laptop extraviada en un aeropuerto; no puede acceder a ningún archivo porque la unidad está completamente cifrada.',
    standardReference: 'ISO/IEC 27001 A.10 (Criptografía) & NIST CSF PR.DS-1',
    riskMitigated: 'Robo físico de servidores, filtración de respaldos en cinta, accesos ilícitos al storage.'
  },
  // 2. Confidencialidad x Reposo x Políticas
  {
    id: 'conf-rest-pol',
    ciaId: 'confidentiality',
    stateId: 'rest',
    safeguardId: 'policies',
    title: 'Políticas de Clasificación y Retención de Datos',
    shortDescription: 'Normativas que definen cómo se almacena y destruye la información sensible.',
    objective: 'Establecer formalmente niveles de confidencialidad (Público, Interno, Confidencial, Secreto) y reglas para su almacenamiento.',
    controls: ['Política de clasificación de información corporativa', 'Procedimientos de destrucción segura de soportes magnéticos (DoD 5220.22-M)', 'Acuerdos de confidencialidad (NDA) para administradores de sistemas', 'Políticas de retención y purga periódica de datos'],
    realWorldExample: 'La política estipula que los expedientes médicos inactivos deben almacenarse en repositorios segregados con acceso restringido y ser purgados a los 5 años.',
    standardReference: 'ISO/IEC 27001 A.8.2 (Clasificación de información)',
    riskMitigated: 'Almacenamiento indiscriminado de datos privados en carpetas públicas o servidores sin dueño.'
  },
  // 3. Confidencialidad x Reposo x Personas
  {
    id: 'conf-rest-peop',
    ciaId: 'confidentiality',
    stateId: 'rest',
    safeguardId: 'people',
    title: 'Cultura de Escritorio Limpio y Custodia de Medios',
    shortDescription: 'Concientización de los colaboradores al gestionar soportes físicos y digitales.',
    objective: 'Asegurar que los empleados no dejen soportes de almacenamiento expuestos ni compartan credenciales de acceso.',
    controls: ['Política de pantalla bloqueada (Win+L) y escritorio limpio', 'Capacitación sobre no uso de pendrives USB personales no autorizados', 'Protocolo de reporte ante extravío de computadoras o teléfonos corporativos'],
    realWorldExample: 'Un empleado se levanta de su estación de trabajo y bloquea la pantalla inmediatamente, evitando que visitantes en la oficina lean documentos confidenciales en pantalla.',
    standardReference: 'ISO/IEC 27001 A.11.2.9 (Política de puesto de trabajo limpio)',
    riskMitigated: 'Espionaje visual (shoulder surfing), robo de pendrives con copias de bases de datos.'
  },

  // 4. Confidencialidad x Tránsito x Tecnología
  {
    id: 'conf-trans-tech',
    ciaId: 'confidentiality',
    stateId: 'transit',
    safeguardId: 'technology',
    title: 'Cifrado en Tránsito de Enlaces y Redes (TLS / VPN)',
    shortDescription: 'Uso de protocolos criptográficos en canales de comunicación.',
    objective: 'Evitar que paquetes interceptados en redes públicas o locales sean leídos por terceros.',
    controls: ['Protocolo TLS 1.3 para servicios web (HTTPS) y APIs', 'Túneles VPN con IPsec / WireGuard para teletrabajo y enlaces site-to-site', 'Cifrado SSH v2 para administración remota', 'S/MIME o PGP para correo electrónico confidencial'],
    realWorldExample: 'Un empleado trabaja desde la red Wi-Fi abierta de una cafetería; el tráfico entre su laptop y los servidores de la empresa viaja cifrado dentro de un túnel VPN, haciendo inútil el sniffing del hacker local.',
    standardReference: 'NIST SP 800-52 Rev. 2 (Guidelines for TLS implementations)',
    riskMitigated: 'Ataques Man-in-the-Middle (MitM), interceptación de credenciales en Wi-Fi pública.'
  },
  // 5. Confidencialidad x Tránsito x Políticas
  {
    id: 'conf-trans-pol',
    ciaId: 'confidentiality',
    stateId: 'transit',
    safeguardId: 'policies',
    title: 'Políticas de Canales Aprobados de Comunicación',
    shortDescription: 'Reglas institucionales que prohíben el envío de secretos por canales no seguros.',
    objective: 'Evitar la transmisión de datos clasificados a través de canales personales, chat no corporativo o HTTP sin cifrar.',
    controls: ['Reglamento de uso exclusivo de canales cifrados para datos de clientes', 'Prohibición explícita de transferir contraseñas o tokens por WhatsApp o Slack público', 'Norma de uso obligatorio de VPN en conexiones remotas'],
    realWorldExample: 'La política sanciona a cualquier empleado que envíe listas de tarjetas de crédito o contraseñas en texto plano por correo convencional o aplicaciones de mensajería no autorizadas.',
    standardReference: 'ISO/IEC 27001 A.13.2 (Transferencia de información)',
    riskMitigated: 'Fuga de información confidencial por descuido o uso de aplicaciones no corporativas (Shadow IT).'
  },
  // 6. Confidencialidad x Tránsito x Personas
  {
    id: 'conf-trans-peop',
    ciaId: 'confidentiality',
    stateId: 'transit',
    safeguardId: 'people',
    title: 'Prevención de Ingeniería Social y Tráfico No Autorizado',
    shortDescription: 'Formación para reconocer intentos de interceptación o desvío de comunicaciones.',
    objective: 'Capacitar al personal para que no comparta información sensible por vías dudosas ante solicitudes fraudulentas.',
    controls: ['Entrenamiento para verificar destinatarios antes de enviar correos con adjuntos confidenciales', 'Detección de solicitudes sospechosas de redireccionamiento de pagos (Business Email Compromise - BEC)', 'Cultura de verificación por canal alterno'],
    realWorldExample: 'Un analista contable recibe un correo solicitando cambiar la cuenta bancaria de un proveedor; en lugar de responder, llama al número oficial registrado para verificar la autenticidad antes de transmitir los datos.',
    standardReference: 'CIS Control 14 (Security Awareness and Skills Training)',
    riskMitigated: 'Ataques de suplantación de identidad (BEC), envío accidental a destinatarios equivocados.'
  },

  // 7. Confidencialidad x Proceso x Tecnología
  {
    id: 'conf-proc-tech',
    ciaId: 'confidentiality',
    stateId: 'processing',
    safeguardId: 'technology',
    title: 'Computación Confidencial y Protección de Memoria',
    shortDescription: 'Mecanismos que resguardan los datos mientras residen en memoria RAM o CPU.',
    objective: 'Impedir que procesos no autorizados o administradores de hipervisores lean secretos durante el cómputo activo.',
    controls: ['Enclaves seguros de hardware (Intel SGX, AMD SEV, AWS Nitro Enclaves)', 'Limpieza segura de variables en memoria tras su uso (Memory wiping / SecureZeroMemory)', 'Prevención de volcados de memoria (Core dump encryption) y ASLR'],
    realWorldExample: 'Un banco procesa transacciones criptográficas en la nube pública; utiliza enclaves de hardware para que ni siquiera el proveedor de la nube pueda inspeccionar la memoria RAM donde se descifran las llaves maestras.',
    standardReference: 'Confidential Computing Consortium Architecture & NIST SP 800-193',
    riskMitigated: 'Ataques tipo Meltdown/Spectre, volcados de memoria RAM por malware residente en memoria.'
  },
  // 8. Confidencialidad x Proceso x Políticas
  {
    id: 'conf-proc-pol',
    ciaId: 'confidentiality',
    stateId: 'processing',
    safeguardId: 'policies',
    title: 'Estándares de Codificación Segura y Gestión de Secretos',
    shortDescription: 'Reglas de desarrollo y operaciones para no exponer datos durante el procesamiento.',
    objective: 'Garantizar que el código fuente no imprima secretos en logs del sistema ni exponga variables en memoria.',
    controls: ['Estándar OWASP de desarrollo seguro para el manejo de credenciales', 'Políticas que prohíben el volcado de datos sensibles (PII, tarjetas) en logs de aplicación', 'Revisión estricta de código (Code Reviews) enfocadas en privacidad'],
    realWorldExample: 'Las directrices de desarrollo prohíben guardar tokens de sesión en el almacenamiento local del navegador (`localStorage`) o imprimirlos en los archivos de registro del servidor.',
    standardReference: 'ISO/IEC 27001 A.14.2 (Seguridad en los procesos de desarrollo y soporte)',
    riskMitigated: 'Exposición accidental de contraseñas y tokens en archivos de trazas o salidas de depuración.'
  },
  // 9. Confidencialidad x Proceso x Personas
  {
    id: 'conf-proc-peop',
    ciaId: 'confidentiality',
    stateId: 'processing',
    safeguardId: 'people',
    title: 'Buenas Prácticas de Desarrolladores y Operadores',
    shortDescription: 'Conciencia técnica de los programadores y analistas sobre la confidencialidad en ejecución.',
    objective: 'Sensibilizar a los ingenieros de software para evitar depurar en producción con datos reales de clientes.',
    controls: ['Capacitación continua en Secure Coding (OWASP Top 10)', 'Concientización sobre el principio de menor privilegio en cuentas de servicio y scripts de proceso', 'Prohibición de copiar bases de datos de producción a entornos locales de desarrollo'],
    realWorldExample: 'Un desarrollador junior necesita probar una nueva función; en lugar de descargar clientes reales, utiliza un generador sintético de datos anonimizados.',
    standardReference: 'NIST CSF PR.AT-1 & OWASP Proactive Controls',
    riskMitigated: 'Fuga de bases de datos completas a las computadoras personales de los programadores.'
  },

  // 10. Integridad x Reposo x Tecnología
  {
    id: 'integ-rest-tech',
    ciaId: 'integrity',
    stateId: 'rest',
    safeguardId: 'technology',
    title: 'Checksums, Hashing y Almacenamiento Inmutable',
    shortDescription: 'Validación algorítmica contra alteraciones de archivos y bases de datos.',
    objective: 'Detectar y bloquear cualquier modificación no autorizada o silenciosa en archivos guardados.',
    controls: ['Hashes criptográficos (SHA-256 / SHA-512) calculados para archivos maestros', 'Sistemas de almacenamiento WORM (Write Once, Read Many) para logs y auditoría', 'Sistemas de archivos con autorreparación (ZFS, Btrfs)', 'Sistemas de detección de cambios en archivos (File Integrity Monitoring - FIM como OSSEC o Wazuh)'],
    realWorldExample: 'Una herramienta FIM detecta que el archivo binario del sistema `/etc/passwd` fue modificado fuera de una ventana de mantenimiento y alerta de inmediato al SOC.',
    standardReference: 'PCI-DSS Req 11.5 (Despliegue de FIM) & NIST SP 800-53 SI-7',
    riskMitigated: 'Modificación maliciosa de configuraciones del sistema, reemplazo de binarios por rootkits, corrupción de bases de datos.'
  },
  // 11. Integridad x Reposo x Políticas
  {
    id: 'integ-rest-pol',
    ciaId: 'integrity',
    stateId: 'rest',
    safeguardId: 'policies',
    title: 'Gestión de Cambios y Principio de Doble Autorización',
    shortDescription: 'Procedimientos formales para modificar datos maestros y esquemas de base de datos.',
    objective: 'Garantizar que ninguna modificación a registros o bases de datos se realice sin justificación y aprobación.',
    controls: ['Procedimiento formal de gestión de cambios (Change Management / ITIL)', 'Requisito de 4 ojos (dos personas aprueban cambios en bases de datos productivas)', 'Auditorías periódicas de conciliación de datos'],
    realWorldExample: 'Cualquier modificación manual a la tabla de saldos contables requiere la apertura de un ticket formal aprobado por el gerente de finanzas y el CISO.',
    standardReference: 'ISO/IEC 27001 A.12.1.2 (Gestión de cambios)',
    riskMitigated: 'Alteración arbitraria de registros contables o comerciales por administradores deshonestos.'
  },
  // 12. Integridad x Reposo x Personas
  {
    id: 'integ-rest-peop',
    ciaId: 'integrity',
    stateId: 'rest',
    safeguardId: 'people',
    title: 'Responsabilidad y Segregación de Funciones en Datos Almacenados',
    shortDescription: 'Compromiso de los administradores y usuarios con la veracidad de la información almacenada.',
    objective: 'Evitar que una sola persona tenga el poder de ingresar, aprobar y alterar información sin contrapesos.',
    controls: ['Matriz de Segregación de Funciones (SoD - Separation of Duties)', 'Capacitación en ética profesional y responsabilidad legal en el manejo de registros corporativos', 'Reporte inmediato de discrepancias en inventarios y balances'],
    realWorldExample: 'El empleado que crea una orden de compra en el ERP no tiene permisos para autorizar el pago ni modificar los datos bancarios del beneficiario.',
    standardReference: 'COBIT 2019 DSS05.04 & ISO 27001 A.6.1.2',
    riskMitigated: 'Fraudes internos, sabotaje de datos por empleados disgustados o colusión.'
  },

  // 13. Integridad x Tránsito x Tecnología
  {
    id: 'integ-trans-tech',
    ciaId: 'integrity',
    stateId: 'transit',
    safeguardId: 'technology',
    title: 'Firmas Digitales, HMAC y Protocolos de Verificación de Integridad',
    shortDescription: 'Técnicas para comprobar que los datos en red no fueron alterados en ruta.',
    objective: 'Garantizar que el mensaje recibido por el destinatario sea idéntico byte a byte al mensaje emitido.',
    controls: ['Códigos de autenticación de mensajes basados en hash (HMAC-SHA256)', 'Firmas digitales basadas en certificados X.509 (PKI)', 'Validación estricta de registros SPF, DKIM y DMARC en correos entrantes', 'Cifrado autenticado AEAD (ej. AES-GCM) en túneles de red'],
    realWorldExample: 'Un servidor de actualizaciones descarga un parche de software; antes de ejecutarlo, verifica la firma digital del fabricante con su clave pública. Si un byte fue cambiado, la instalación se rechaza.',
    standardReference: 'NIST FIPS 198-1 (The Keyed-Hash Message Authentication Code)',
    riskMitigated: 'Ataques de inyección de paquetes, alteración de descargas por troyanos, suplantación de remitentes en correo.'
  },
  // 14. Integridad x Tránsito x Políticas
  {
    id: 'integ-trans-pol',
    ciaId: 'integrity',
    stateId: 'transit',
    safeguardId: 'policies',
    title: 'Políticas de Transmisión de Datos e Intercambio Seguro',
    shortDescription: 'Reglas para el intercambio electrónico de datos entre socios comerciales.',
    objective: 'Definir acuerdos de nivel operativo que exijan validaciones de no repudio y cotejo de transacciones.',
    controls: ['Acuerdos formales de intercambio electrónico de datos (EDI / API agreements)', 'Protocolos de confirmación de entrega y acusas de recibo con firma electrónica', 'Políticas que prohíben el uso de protocolos obsoletos e inseguros (HTTP, Telnet, FTP)'],
    realWorldExample: 'El contrato de integración B2B exige que todos los pedidos transmitidos por API contengan un encabezado de firma criptográfica y un timestamp que expire en 60 segundos para evitar ataques de replay.',
    standardReference: 'ISO/IEC 27001 A.13.2.2 (Acuerdos sobre transferencia de información)',
    riskMitigated: 'Alteración de facturas electrónicas en tránsito, repetición de transacciones (replay attacks).'
  },
  // 15. Integridad x Tránsito x Personas
  {
    id: 'integ-trans-peop',
    ciaId: 'integrity',
    stateId: 'transit',
    safeguardId: 'people',
    title: 'Verificación Humana de Canales y Detección de Mensajes Alterados',
    shortDescription: 'Instrucción a los usuarios para no aceptar enlaces o archivos adulterados.',
    objective: 'Dotar a los usuarios de habilidades para sospechar de comunicaciones digitales incongruentes o anómalas.',
    controls: ['Verificación fuera de banda (out-of-band) para instrucciones críticas', 'Capacitación para identificar alertas de certificados SSL inválidos en el navegador', 'Cultura de "no hacer clic" si el certificado muestra advertencias de seguridad'],
    realWorldExample: 'Un usuario ve una advertencia en su navegador de "Certificado no válido o no seguro" al entrar al portal corporativo; en lugar de hacer clic en "Avanzar de todos modos", detiene la conexión y reporta al equipo de TI.',
    standardReference: 'SANS Security Awareness Worksheets',
    riskMitigated: 'Aceptación inconsciente de ataques de interceptación SSL/TLS proxy.'
  },

  // 16. Integridad x Proceso x Tecnología
  {
    id: 'integ-proc-tech',
    ciaId: 'integrity',
    stateId: 'processing',
    safeguardId: 'technology',
    title: 'Validación de Entradas, Control de Tipos y Detección de Fallos',
    shortDescription: 'Controles en tiempo de ejecución para asegurar que el cómputo sea fidedigno.',
    objective: 'Prevenir que datos corruptos, inyecciones de código o errores de memoria alteren el flujo de ejecución.',
    controls: ['Validación estricta de tipos y esquemas de entrada (JSON schema, sanitización contra SQLi y XSS)', 'Uso de lenguajes de memoria segura (Rust, Go, Swift o mitigaciones como Stack Canaries)', 'Transacciones ACID con reversión automática (Rollback) ante inconsistencias'],
    realWorldExample: 'Un usuario malicioso intenta inyectar código SQL en un formulario de búsqueda; el framework utiliza sentencias parametrizadas, tratando el payload como texto plano e impidiendo la corrupción de la base de datos.',
    standardReference: 'OWASP Top 10 A03:2021 (Injection) & CWE-20 (Improper Input Validation)',
    riskMitigated: 'Inyecciones SQL/NoSQL, desbordamientos de búfer (Buffer Overflow), desincronización de memoria.'
  },
  // 17. Integridad x Proceso x Políticas
  {
    id: 'integ-proc-pol',
    ciaId: 'integrity',
    stateId: 'processing',
    safeguardId: 'policies',
    title: 'Ciclo de Vida de Desarrollo Seguro (S-SDLC) y Pruebas Continuas',
    shortDescription: 'Políticas de control de calidad y seguridad durante el diseño y compilación del software.',
    objective: 'Garantizar que todo el software en ejecución haya pasado por filtros rigurosos de integridad.',
    controls: ['Implementación de pipelines DevSecOps con análisis estático (SAST) y dinámico (DAST)', 'Requisitos de cobertura de pruebas unitarias y de integración antes del pase a producción', 'Aprobaciones de despliegue mediante Pull Requests obligatorios'],
    realWorldExample: 'La política corporativa de ingeniería bloquea automáticamente cualquier despliegue a producción si las pruebas automatizadas detectan un fallo de lógica en el cálculo de impuestos.',
    standardReference: 'NIST SP 800-218 (Secure Software Development Framework - SSDF)',
    riskMitigated: 'Liberación de código con errores de lógica de negocio o puertas traseras.'
  },
  // 18. Integridad x Proceso x Personas
  {
    id: 'integ-proc-peop',
    ciaId: 'integrity',
    stateId: 'processing',
    safeguardId: 'people',
    title: 'Validación Cruzada y Revisión por Pares (Peer Review)',
    shortDescription: 'Prácticas humanas que aseguran que el código y los procesos procesen datos fielmente.',
    objective: 'Aprovechar la colaboración y revisión humana para detectar errores o manipulaciones en los algoritmos.',
    controls: ['Revisión obligatoria de código por al menos dos ingenieros sénior', 'Capacitación en detección de vulnerabilidades lógicas complejas', 'Cultura de pruebas exhaustivas y pruebas de regresión'],
    realWorldExample: 'Durante la revisión de código, un segundo ingeniero detecta que una función matemática redondea incorrectamente decimales financieros y corrige el algoritmo antes de compilar.',
    standardReference: 'SEI CERT Coding Standards',
    riskMitigated: 'Errores humanos en la lógica matemática o de negocio que vicien los datos computados.'
  },

  // 19. Disponibilidad x Reposo x Tecnología
  {
    id: 'avail-rest-tech',
    ciaId: 'availability',
    stateId: 'rest',
    safeguardId: 'technology',
    title: 'Redundancia de Almacenamiento (RAID) y Copias de Seguridad 3-2-1',
    shortDescription: 'Mecanismos para garantizar que los datos almacenados nunca se pierdan de forma irrecuperable.',
    objective: 'Permitir la continuidad del acceso a los datos almacenados ante fallas de hardware, desastres físicos o ransomware.',
    controls: ['Arreglos de discos redundantes (RAID 1, 5, 6, 10) con tolerancia a fallas de discos', 'Estrategia de respaldo 3-2-1 (3 copias, 2 soportes distintos, 1 copia off-site o cloud inmutable)', 'Snapshots periódicos con protección contra borrado accidental o ransomware', 'Almacenamiento geodistribuido en la nube (Multi-region storage)'],
    realWorldExample: 'Un disco duro de un servidor se descompone a mitad de la jornada; el arreglo RAID 5 continúa operando sin pérdida de datos ni interrupción perceptible para los clientes.',
    standardReference: 'ISO/IEC 27001 A.12.3 (Copias de seguridad) & NIST SP 800-34',
    riskMitigated: 'Pérdida definitiva de información por fallos mecánicos de discos, desastres naturales o cifrado por ransomware.'
  },
  // 20. Disponibilidad x Reposo x Políticas
  {
    id: 'avail-rest-pol',
    ciaId: 'availability',
    stateId: 'rest',
    safeguardId: 'policies',
    title: 'Políticas de Backup, RTO, RPO y Retención de Respaldos',
    shortDescription: 'Compromisos organizacionales que definen tiempos de recuperación admisibles.',
    objective: 'Establecer formalmente cuánto tiempo puede estar caído un servicio y cuántos datos es admisible perder.',
    controls: ['Definición de RTO (Recovery Time Objective) y RPO (Recovery Point Objective) por sistema', 'Cronograma formal de respaldo diario, semanal y mensual', 'Pruebas obligatorias de restauración periódica (Backup Restoral Drills)'],
    realWorldExample: 'La política corporativa exige que el sistema de facturación tenga un RPO de 15 minutos y un RTO de 2 horas, obligando al equipo de infraestructura a realizar réplicas continuas.',
    standardReference: 'ISO 22301 (Sistemas de Gestión de Continuidad del Negocio)',
    riskMitigated: 'Incapacidad de restaurar copias de seguridad por falta de pruebas previas o falta de espacio de almacenamiento.'
  },
  // 21. Disponibilidad x Reposo x Personas
  {
    id: 'avail-rest-peop',
    ciaId: 'availability',
    stateId: 'rest',
    safeguardId: 'people',
    title: 'Simulacros de Recuperación ante Desastres y Custodia de Medios',
    shortDescription: 'Entrenamiento del equipo para ejecutar restauraciones bajo presión.',
    objective: 'Asegurar que los administradores sepan exactamente cómo levantar los datos almacenados en una contingencia.',
    controls: ['Simulacros semestrales de restauración de servidores en frío (Disaster Recovery Drills)', 'Designación formal de custodios de llaves y bóvedas físicas de respaldos', 'Roles de guardia (on-call) 24/7 con escalamiento claro'],
    realWorldExample: 'Durante un simulacro sorpresa de caída del centro de datos principal, el equipo técnico ejecuta el manual de procedimientos y levanta el respaldo en el centro de datos alterno en 45 minutos.',
    standardReference: 'DRI International Professional Practices',
    riskMitigated: 'Pánico y errores operativos de administradores durante un incidente real de pérdida de datos.'
  },

  // 22. Disponibilidad x Tránsito x Tecnología
  {
    id: 'avail-trans-tech',
    ciaId: 'availability',
    stateId: 'transit',
    safeguardId: 'technology',
    title: 'Enlaces de Red Redundantes, BGP y Mitigación Anti-DDoS',
    shortDescription: 'Infraestructura de conectividad resiliente que soporta picos y ataques.',
    objective: 'Mantener las vías de comunicación abiertas ante saturaciones, ataques volumétricos o caídas de operadores.',
    controls: ['Conexiones a Internet redundantes con distintos proveedores (Multi-homed BGP)', 'Protección perimetral y en la nube contra ataques de denegación de servicio (Cloudflare, AWS Shield)', 'Balanceadores de carga (Load Balancers) con conmutación por error (Failover automático)', 'Redes de distribución de contenido (CDN) para absorber tráfico masivo'],
    realWorldExample: 'Un grupo cibercriminal lanza un ataque DDoS de 500 Gbps contra la pasarela de pagos; el servicio de mitigación en la nube absorbe el tráfico anómalo y los usuarios legítimos continúan operando sin caída.',
    standardReference: 'NIST SP 800-189 (Resilient Interdomain Traffic Routing)',
    riskMitigated: 'Caídas del servicio por ataques masivos de denegación de servicio o cortes de fibra óptica del proveedor de internet.'
  },
  // 23. Disponibilidad x Tránsito x Políticas
  {
    id: 'avail-trans-pol',
    ciaId: 'availability',
    stateId: 'transit',
    safeguardId: 'policies',
    title: 'Acuerdos de Nivel de Servicio (SLA) y Gestión de Ancho de Banda',
    shortDescription: 'Contratos y directrices para priorizar el tráfico crítico del negocio.',
    objective: 'Garantizar contractualmente la disponibilidad de los canales y priorizar servicios esenciales en contingencias.',
    controls: ['Acuerdos de nivel de servicio (SLAs) con proveedores de telecomunicaciones que garanticen 99.99% de uptime', 'Políticas de Calidad de Servicio (QoS) para priorizar voz y aplicaciones ERP sobre tráfico de ocio', 'Planes de contingencia de comunicación de emergencia'],
    realWorldExample: 'El SLA con el operador de telecomunicaciones establece penalizaciones financieras severas si el enlace troncal permanece caído por más de 10 minutos al mes.',
    standardReference: 'ISO/IEC 20000-1 (Gestión de servicios de TI)',
    riskMitigated: 'Saturación de enlaces por tráfico recreativo o demoras excesivas de proveedores en reparar cortes.'
  },
  // 24. Disponibilidad x Tránsito x Personas
  {
    id: 'avail-trans-peop',
    ciaId: 'availability',
    stateId: 'transit',
    safeguardId: 'people',
    title: 'Monitoreo de Tráfico por el SOC y Alertas Tempranas',
    shortDescription: 'Personal técnico monitoreando la salud y capacidad de los enlaces de red.',
    objective: 'Detectar patrones de congestión, saturación o degradación antes de que provoquen una interrupción total.',
    controls: ['Monitoreo continuo 24/7 por analistas del Centro de Operaciones de Red (NOC/SOC)', 'Procedimientos claros de escalamiento ante caídas de enlaces', 'Canales de comunicación alternos de emergencia (telefonía satelital, radios o mensajería segura externa)'],
    realWorldExample: 'Un operador del NOC detecta un aumento inusual en el tiempo de respuesta de los enlaces hacia Sudamérica a las 3:00 AM y redirige el tráfico por la ruta secundaria antes de que los usuarios noten lentitud.',
    standardReference: 'CREST SOC Criteria',
    riskMitigated: 'Caídas prolongadas de red que pasan desapercibidas para el equipo de TI.'
  },

  // 25. Disponibilidad x Proceso x Tecnología
  {
    id: 'avail-proc-tech',
    ciaId: 'availability',
    stateId: 'processing',
    safeguardId: 'technology',
    title: 'Clustering, Escalabilidad Automática y Tolerancia a Fallos de CPU',
    shortDescription: 'Arquitecturas de procesamiento elásticas y redundantes.',
    objective: 'Asegurar que los servidores y aplicaciones sigan procesando transacciones aunque se dañe un procesador o nodo.',
    controls: ['Clústeres de servidores en alta disponibilidad (Kubernetes, VMware vSphere HA)', 'Autoescalado horizontal de contenedores e instancias virtuales según demanda de CPU/RAM', 'Fuentes de poder redundantes y hardware hot-swappable en servidores físicos', 'Sistemas de alimentación ininterrumpida (UPS) y generadores eléctricos en Data Center'],
    realWorldExample: 'Durante una campaña de ventas masiva (Black Friday), el consumo de CPU se dispara al 95%; el clúster de Kubernetes crea automáticamente 20 nuevos pods de la aplicación para distribuir la carga sin interrupción.',
    standardReference: 'Uptime Institute Tier Standards & AWS Well-Architected Framework (Reliability Pillar)',
    riskMitigated: 'Saturación y colapso de servidores por sobrecarga de procesamiento, caídas por fallos en placas madre o apagones.'
  },
  // 26. Disponibilidad x Proceso x Políticas
  {
    id: 'avail-proc-pol',
    ciaId: 'availability',
    stateId: 'processing',
    safeguardId: 'policies',
    title: 'Planes de Continuidad del Negocio (BCP) y Recuperación (DRP)',
    shortDescription: 'Marcos organizacionales integrales que guían la operación durante desastres.',
    objective: 'Definir cómo opera la empresa si el centro de procesamiento principal sufre una catástrofe total.',
    controls: ['Plan de Continuidad del Negocio (BCP - Business Continuity Plan)', 'Plan de Recuperación ante Desastres (DRP - Disaster Recovery Plan)', 'Análisis de Impacto en el Negocio (BIA - Business Impact Analysis) que identifique procesos críticos', 'Políticas de mantenimiento preventivo de hardware y licenciamiento'],
    realWorldExample: 'Tras un incendio en el edificio corporativo, la gerencia activa el BCP; los empleados clave se trasladan a la sede alterna y continúan operando con los sistemas alojados en la nube.',
    standardReference: 'ISO 22301:2019 (Business Continuity Management Systems)',
    riskMitigated: 'Cese total de operaciones comerciales ante catástrofes físicas o fallas sistémicas.'
  },
  // 27. Disponibilidad x Proceso x Personas
  {
    id: 'avail-proc-peop',
    ciaId: 'availability',
    stateId: 'processing',
    safeguardId: 'people',
    title: 'Equipos de Respuesta a Incidentes (CSIRT) y Procedimientos Manuales',
    shortDescription: 'Personal capacitado para mantener la operación en marcha incluso sin sistemas.',
    objective: 'Contar con personas listas para restaurar servicios caídos o ejecutar planes de contingencia manual.',
    controls: ['Equipo de Respuesta a Incidentes de Seguridad Informática (CSIRT / CIRT) formalmente entrenado', 'Manuales impresos de contingencia operativa ("modo degradado" o manual en papel)', 'Capacitación en primeros auxilios técnicos y conmutación manual de sistemas'],
    realWorldExample: 'El sistema hospitalario de registro digital queda inoperativo por un fallo de actualización; los médicos y enfermeros activan el protocolo en papel para admisiones de urgencia mientras el CSIRT soluciona el problema.',
    standardReference: 'NIST SP 800-61 Rev. 2 (Computer Security Incident Handling Guide)',
    riskMitigated: 'Parálisis total de actividades humanas cuando falla la tecnología.'
  }
];

// Datos para la visualización del Obsidian Canvas (Cubo_de_McCumber.canvas)
export const CANVAS_NODES: CanvasNode[] = [
  {
    id: 'group-cube',
    x: -30,
    y: -40,
    width: 1420,
    height: 820,
    type: 'group',
    label: '🧊 CUBO DE McCUMBER (John McCumber, 1991) — Marco Integral de Ciberseguridad',
    color: '#334155'
  },
  // Nodo Central
  {
    id: 'node-center',
    x: 480,
    y: 30,
    width: 380,
    height: 170,
    type: 'text',
    color: '#6366f1',
    text: `### 🎯 Cubo de McCumber (1991)
Modelo tridimensional que asegura que **ningún ángulo de la ciberseguridad** quede descubierto.

- **3 Metas:** Confidencialidad, Integridad, Disponibilidad
- **3 Estados:** Reposo, Tránsito, Procesamiento
- **3 Salvaguardas:** Tecnología, Políticas, Personas
- **Total:** 3 × 3 × 3 = **27 facetas interconectadas**`
  },
  // Nodo de Imagen Original (Pasted image 20260918111734.png)
  {
    id: 'node-image',
    x: 900,
    y: 15,
    width: 320,
    height: 200,
    type: 'file',
    file: '/assets/mccumber-cube.png',
    alt: 'Pasted image 20260918111734.png - Diagrama Original del Cubo de McCumber',
    label: '🖼️ Pasted image 20260918111734.png',
    color: '#06b6d4'
  },
  // Dimensión 1: Tríada CIA
  {
    id: 'node-cia',
    x: 40,
    y: 260,
    width: 380,
    height: 240,
    type: 'text',
    color: '#3b82f6',
    text: `### 🛡️ Dimensión 1: Metas de Seguridad (Tríada CIA)
¿Qué aspecto de la información estamos defendiendo?

- **Confidencialidad:** Evitar que ojos no autorizados lean los datos.
- **Integridad:** Asegurar que los datos no sean modificados ni corrompidos.
- **Disponibilidad:** Garantizar que los sistemas y datos estén siempre accesibles cuando se requieran.`
  },
  // Dimensión 2: Estados de la Información
  {
    id: 'node-states',
    x: 490,
    y: 260,
    width: 380,
    height: 240,
    type: 'text',
    color: '#8b5cf6',
    text: `### 💾 Dimensión 2: Estados de la Información
¿En qué momento o fase del ciclo de vida está el dato?

- **En Reposo (Storage):** Guardado en discos duros, bases de datos o la nube.
- **En Tránsito (Transmission):** Viajando a través de redes locales o Internet.
- **En Procesamiento (Processing):** Activo en memoria RAM, CPU o aplicaciones.`
  },
  // Dimensión 3: Salvaguardas
  {
    id: 'node-safeguards',
    x: 940,
    y: 260,
    width: 380,
    height: 240,
    type: 'text',
    color: '#10b981',
    text: `### ⚙️ Dimensión 3: Medidas de Seguridad
¿Con qué herramientas y medios aplicamos la defensa?

- **Tecnología:** Firewalls, cifrado, antivirus, IDS/IPS, autenticación.
- **Políticas y Prácticas:** Normas, estándares, procedimientos, auditorías.
- **Personas (Factor Humano):** Concientización, entrenamiento, cultura de seguridad.`
  },
  // Nodo de Síntesis / Aplicación
  {
    id: 'node-application',
    x: 240,
    y: 560,
    width: 880,
    height: 180,
    type: 'text',
    color: '#f59e0b',
    text: `### 🚀 El Principio de las 27 Intersecciones
Para tener una postura de seguridad completa, una organización debe preguntarse:
*"¿Qué **tecnología**, qué **políticas** y qué **capacitación humana** tenemos implementadas para proteger la **confidencialidad**, la **integridad** y la **disponibilidad** de nuestros datos cuando están **en reposo**, **en tránsito** y **en procesamiento**?"*

Si dejas una sola celda vacía (ej. descuidar el factor humano en datos en procesamiento), por ahí entrará el adversario.`
  }
];

export const CANVAS_EDGES: CanvasEdge[] = [
  {
    id: 'e-img',
    fromNode: 'node-center',
    toNode: 'node-image',
    fromSide: 'right',
    toSide: 'left',
    label: 'Diagrama Adjunto',
    color: '#06b6d4'
  },
  {
    id: 'e1',
    fromNode: 'node-center',
    toNode: 'node-cia',
    fromSide: 'bottom',
    toSide: 'top',
    label: 'Eje Y: Objetivos',
    color: '#3b82f6'
  },
  {
    id: 'e2',
    fromNode: 'node-center',
    toNode: 'node-states',
    fromSide: 'bottom',
    toSide: 'top',
    label: 'Eje X: Ciclo de Datos',
    color: '#8b5cf6'
  },
  {
    id: 'e3',
    fromNode: 'node-center',
    toNode: 'node-safeguards',
    fromSide: 'bottom',
    toSide: 'top',
    label: 'Eje Z: Mecanismos',
    color: '#10b981'
  },
  {
    id: 'e4',
    fromNode: 'node-cia',
    toNode: 'node-application',
    fromSide: 'bottom',
    toSide: 'top',
    label: 'Cobertura',
    color: '#f59e0b'
  },
  {
    id: 'e5',
    fromNode: 'node-states',
    toNode: 'node-application',
    fromSide: 'bottom',
    toSide: 'top',
    label: 'Convergencia',
    color: '#f59e0b'
  },
  {
    id: 'e6',
    fromNode: 'node-safeguards',
    toNode: 'node-application',
    fromSide: 'bottom',
    toSide: 'top',
    label: 'Implementación',
    color: '#f59e0b'
  }
];

// Contenido completo del documento Markdown original (Cubo_de_McCumber.md)
export const RAW_MARKDOWN_CONTENT = `# Cubo de McCumber: Modelo Integral de Ciberseguridad

> **Autor del Modelo:** John McCumber  
> **Año de creación:** 1991  
> **Propósito:** Proporcionar un marco integral tridimensional para evaluar, diseñar e implementar programas de seguridad de la información eficaces y completos.  
> **Formato:** Obsidian Note & Visual Canvas

---

## 📌 Introducción y Contexto Histórico

En 1991, **John McCumber** presentó un artículo pionero titulado *"Information Systems Security: A Framework for Business and Government"*. En ese momento, la seguridad informática solía tratarse como un problema netamente técnico enfocado en computadoras aisladas. McCumber reconoció que la seguridad de la información no podía reducirse únicamente a herramientas de software y hardware, sino que requería una perspectiva holística.

Para ilustrar este enfoque, concibió una representación tridimensional análoga a un **Cubo de Rubik** de 3 × 3 × 3, compuesto por **27 celdas o facetas interconectadas**. Cada celda representa una intersección crítica donde debe evaluarse y garantizarse la protección.

![Cubo de McCumber (Diagrama Original)](/assets/mccumber-cube.png)
> *Adjunto original de Obsidian: \`![[Pasted image 20260918111734.png]]\`*

> [!TIP]
> **La regla de oro del Cubo:**  
> Ninguna estrategia de ciberseguridad es sólida si descuida cualquiera de las 27 intersecciones. La seguridad es tan fuerte como su eslabón más débil: un sistema con el cifrado más avanzado (Tecnología) fracasará si los empleados entregan sus contraseñas por teléfono (Factor Humano).

---

## 🧊 Las Tres Dimensiones del Modelo

El Cubo de McCumber organiza la ciberseguridad en tres ejes independientes pero profundamente interdependientes:

\`\`\`
                          +-------------------------+
                         /     SALVAGUARDAS        /|
                        /  Tecnología, Políticas  / |
                       /       y Personas        /  |
                      +-------------------------+   |
                      |                         |   |
                      |      TRÍADA CIA         |   |
                      |  Confidencialidad,      |   +
                      |  Integridad,            |  /
                      |  Disponibilidad         | / ESTADOS DE DATOS
                      |                         |/  Reposo, Tránsito, Proceso
                      +-------------------------+
\`\`\`

### 1. Eje Y: Metas de Seguridad (La Tríada CIA)
Representa los objetivos fundamentales que la organización busca garantizar sobre sus activos de información:

- 🛡️ **Confidencialidad (Confidentiality):** Asegura que la información sensible no sea divulgada a individuos, entidades o procesos no autorizados. *(Ejemplo: Cifrado, control de acceso RBAC, acuerdos de no divulgación).*
- 🔒 **Integridad (Integrity):** Garantiza la exactitud, consistencia y fiabilidad de los datos durante todo su ciclo de vida, previniendo alteraciones no autorizadas o accidentales. *(Ejemplo: Hashes criptográficos SHA-256, firmas digitales, checksums).*
- ⚡ **Disponibilidad (Availability):** Garantiza que los usuarios autorizados tengan acceso oportuno y confiable a los sistemas, redes y datos siempre que lo requieran. *(Ejemplo: Redundancia, respaldos 3-2-1, balanceadores de carga, protección anti-DDoS).*

### 2. Eje X: Estados de la Información
La información digital no es estática; fluye y cambia de estado continuamente en el ecosistema informático:

- 💾 **Datos en Reposo (Data at Rest / Almacenamiento):** Información guardada en medios de almacenamiento estáticos (discos duros, bases de datos, cintas de backup, nubes de almacenamiento tipo AWS S3).
- 🌐 **Datos en Tránsito (Data in Transit / Transmisión):** Información que se traslada de un punto a otro a través de redes locales (LAN), enlaces inalámbricos (Wi-Fi, 5G) o Internet público.
- ⚡ **Datos en Procesamiento (Data in Process / Uso):** Información que está siendo activamente manipulada, calculada o transformada en la memoria de acceso aleatorio (RAM), registros del procesador o memoria caché.

### 3. Eje Z: Medidas de Seguridad (Salvaguardas / Contramedidas)
Los recursos multidisciplinarios utilizados para implementar las defensas:

- 💻 **Tecnología (Technology):** Soluciones de hardware, software y criptografía (Firewalls, Antivirus/EDR, IDS/IPS, HSM, parches de seguridad).
- 📜 **Políticas y Prácticas (Policies and Practices):** Directrices administrativas, procedimientos operativos estándar (SOPs), políticas de contraseñas, auditorías y gobernanza (ISO 27001, NIST, SOC 2).
- 👥 **Personas / Factor Humano (People / Awareness):** Concientización, entrenamiento contra phishing, programas de educación continua y una cultura organizacional de seguridad.

---

## 📊 Matriz de las 27 Intersecciones de Seguridad

A continuación se detallan las 27 combinaciones exactas y las salvaguardas recomendadas para cada escenario:

| # | Meta (CIA) | Estado de la Información | Salvaguarda | Controles Clave y Mecanismos |
|---|---|---|---|---|
| **1** | Confidencialidad | En Reposo | Tecnología | Cifrado AES-256 de disco completo (BitLocker, LUKS), TDE en bases de datos |
| **2** | Confidencialidad | En Reposo | Políticas | Políticas de clasificación de datos y retención formal de expedientes |
| **3** | Confidencialidad | En Reposo | Personas | Política de escritorio limpio, bloqueo de pantalla (Win+L), custodia física |
| **4** | Confidencialidad | En Tránsito | Tecnología | Protocolos TLS 1.3 (HTTPS), VPNs IPsec / WireGuard, túneles SSH |
| **5** | Confidencialidad | En Tránsito | Políticas | Prohibición de transmitir credenciales por chat o correos en texto plano |
| **6** | Confidencialidad | En Tránsito | Personas | Entrenamiento para no usar redes Wi-Fi públicas sin VPN y verificar destinatarios |
| **7** | Confidencialidad | En Proceso | Tecnología | Enclaves seguros (Intel SGX, AMD SEV), sanitización de memoria y ASLR |
| **8** | Confidencialidad | En Proceso | Políticas | Estándares OWASP de desarrollo seguro, no escribir credenciales en logs |
| **9** | Confidencialidad | En Proceso | Personas | Prohibir el uso de bases de datos de producción en entornos locales de pruebas |
| **10** | Integridad | En Reposo | Tecnología | Hashes SHA-256, File Integrity Monitoring (FIM / OSSEC), discos WORM |
| **11** | Integridad | En Reposo | Políticas | Gestión formal de cambios (ITIL), principio de cuatro ojos para bases de datos |
| **12** | Integridad | En Reposo | Personas | Segregación de funciones (SoD), auditoría ética en balance contable |
| **13** | Integridad | En Tránsito | Tecnología | Firmas digitales (PKI), HMAC-SHA256, autenticación de correo (DKIM, DMARC) |
| **14** | Integridad | En Tránsito | Políticas | Acuerdos formales de intercambio EDI con acuse de recibo criptográfico |
| **15** | Integridad | En Tránsito | Personas | Instruir a usuarios en no ignorar advertencias de certificados inválidos |
| **16** | Integridad | En Proceso | Tecnología | Validación estricta de entradas (anti-SQLi/XSS), transacciones ACID con rollback |
| **17** | Integridad | En Proceso | Políticas | Metodología DevSecOps obligatoria, análisis estático (SAST) en pipelines CI/CD |
| **18** | Integridad | En Proceso | Personas | Revisión de código por pares (Peer Review) de lógica matemática crítica |
| **19** | Disponibilidad | En Reposo | Tecnología | Arreglos RAID 1/5/6, backups 3-2-1 con copias inmutables off-site |
| **20** | Disponibilidad | En Reposo | Políticas | Definición formal de RTO / RPO y pruebas periódicas de restauración de backups |
| **21** | Disponibilidad | En Reposo | Personas | Simulacros semestrales de levantamiento de servidores en frío por TI |
| **22** | Disponibilidad | En Tránsito | Tecnología | Enlaces BGP redundantes con múltiples ISPs, mitigación anti-DDoS en la nube |
| **23** | Disponibilidad | En Tránsito | Políticas | Acuerdos de Nivel de Servicio (SLA 99.99%) con ISPs, reglas de QoS prioritarias |
| **24** | Disponibilidad | En Tránsito | Personas | Monitoreo 24/7 por analistas del NOC/SOC con escalamiento inmediato |
| **25** | Disponibilidad | En Proceso | Tecnología | Clústeres Kubernetes con autoescalado, fuentes redundantes y UPS en Datacenter |
| **26** | Disponibilidad | En Proceso | Políticas | Planes de Continuidad del Negocio (BCP) y Recuperación ante Desastres (DRP) |
| **27** | Disponibilidad | En Proceso | Personas | Entrenamiento del CSIRT y procedimientos manuales degradados en papel |

---

## 🎯 Caso Práctico de Diagnóstico con el Cubo

Imaginemos un hospital que busca evaluar la seguridad de las historias clínicas de sus pacientes:

1. **Escenario A:** Los servidores del hospital tienen discos duros con cifrado AES-256 (Confidencialidad + Reposo + Tecnología).  
   *Vulnerabilidad detectada:* Los médicos escriben las contraseñas en notas Post-it pegadas a los monitores (falla en Confidencialidad + Reposo + **Personas**).
2. **Escenario B:** Las consultas médicas viajan por HTTPS con TLS 1.3 (Confidencialidad + Tránsito + Tecnología).  
   *Vulnerabilidad detectada:* No existe una política que restrinja el envío de resultados médicos por mensajería instantánea no corporativa (falla en Confidencialidad + Tránsito + **Políticas**).
3. **Escenario C:** Los servidores cuentan con réplicas automáticas en la nube (Disponibilidad + Reposo + Tecnología).  
   *Vulnerabilidad detectada:* Nadie ha realizado una prueba de restauración de la copia en 3 años, y cuando se necesita, el archivo está corrupto (falla en Disponibilidad + Reposo + **Políticas / Personas**).

> [!NOTE]
> El Cubo de McCumber permite al CISO y a los auditores identificar exactamente qué cuadrante carece de defensas antes de que un ciberdelincuente lo explote.

---

## 🔗 Relación con Marcos Internacionales Modernos

El modelo de McCumber sentó las bases conceptuales que hoy encontramos en marcos internacionales:

- **NIST Cybersecurity Framework (CSF 2.0):** Gobierna, Identifica, Protege, Detecta, Responde y Recupera.
- **ISO/IEC 27001 e ISO/IEC 27002:** Catálogo de controles organizacionales, de personas, físicos y tecnológicos.
- **CIS Controls (Center for Internet Security):** Guía prescriptiva priorizada para defensa de redes e infraestructura.
- **MITRE ATT&CK:** Matriz táctica de adversarios para correlacionar amenazas en cada estado de los datos.

---

## 💡 Conclusión

El Cubo de McCumber demuestra que **la ciberseguridad no es un producto que se compra, sino un ecosistema multidimensional que se gestiona**. Para mantener una infraestructura segura, cada dato debe estar protegido en todo momento (reposo, tránsito o uso), preservando su tríada (confidencialidad, integridad y disponibilidad), y apoyándose tanto en la tecnología como en los procesos organizacionales y la formación de los seres humanos.
`;
