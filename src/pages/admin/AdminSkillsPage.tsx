import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  Brain,
  CheckCircle2,
  Clock3,
  Code2,
  Eye,
  Filter,
  Flame,
  Layers3,
  Link2,
  Search,
  ShieldCheck,
  Sparkles,
  Wand2,
  XCircle,
} from 'lucide-react';
import { Badge, Button, Card, Progress } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';

type SkillStatus = 'Aprobada' | 'Observacion';
type QueueSeverity = 'Alta' | 'Media' | 'Baja';

const overviewStats = [
  {
    label: 'Skills catalogadas',
    value: '148',
    change: '+12 este mes',
    icon: Layers3,
    accent: 'from-sky-500/20 to-cyan-500/10 text-sky-500',
  },
  {
    label: 'Pendientes de revision',
    value: '19',
    change: '4 prioritarias',
    icon: Clock3,
    accent: 'from-amber-500/20 to-orange-500/10 text-amber-500',
  },
  {
    label: 'Aprobacion automatica',
    value: '87%',
    change: 'Reglas activas',
    icon: ShieldCheck,
    accent: 'from-emerald-500/20 to-green-500/10 text-emerald-500',
  },
  {
    label: 'Uso semanal',
    value: '32.4k',
    change: '+18.2%',
    icon: Flame,
    accent: 'from-fuchsia-500/20 to-pink-500/10 text-fuchsia-500',
  },
];

const featuredSkills: {
  name: string;
  category: string;
  status: SkillStatus;
  trust: number;
  usage: string;
  description: string;
  tags: string[];
}[] = [
  {
    name: 'AI Writing Assistant',
    category: 'Contenido',
    status: 'Aprobada',
    trust: 96,
    usage: '8.9k ejecuciones',
    description: 'Genera borradores de posteos, resuemenes y copies cortos para perfiles profesionales.',
    tags: ['GPT', 'Copy', 'Templates'],
  },
  {
    name: 'Portfolio SEO Optimizer',
    category: 'Descubrimiento',
    status: 'Observacion',
    trust: 74,
    usage: '5.2k ejecuciones',
    description: 'Propone meta titles, FAQs y estructura de headings para mejorar indexacion publica.',
    tags: ['SEO', 'Schema', 'Audit'],
  },
  {
    name: 'Talent Match Signals',
    category: 'Matching',
    status: 'Aprobada',
    trust: 91,
    usage: '11.7k ejecuciones',
    description: 'Calcula afinidad entre perfil, vacante y evidencias del portfolio con pesos predefinidos.',
    tags: ['Scoring', 'Recruiting', 'Insights'],
  },
];

const moderationQueue: {
  name: string;
  author: string;
  reason: string;
  severity: QueueSeverity;
  eta: string;
}[] = [
  {
    name: 'Freelance Proposal Builder',
    author: 'Studio Norte',
    reason: 'Validar claims de conversion y tono comercial',
    severity: 'Media',
    eta: 'Hoy, 14:30',
  },
  {
    name: 'Auto Portfolio Translator',
    author: 'Open Lingo',
    reason: 'Revisar placeholders no traducidos en portugues',
    severity: 'Baja',
    eta: 'Hoy, 16:00',
  },
  {
    name: 'Resume Keyword Injector',
    author: 'CareerStack',
    reason: 'Ajustar guardrails para evitar keyword stuffing',
    severity: 'Alta',
    eta: 'Manana, 09:15',
  },
];

const healthSignals = [
  { label: 'Consistencia de taxonomia', value: 92, note: '18 categorias activas' },
  { label: 'Cobertura de metadata', value: 84, note: 'Faltan previews en 23 skills' },
  { label: 'Cumplimiento de prompts seguros', value: 97, note: 'Solo 3 revisiones manuales' },
  { label: 'Claridad de descripcion publica', value: 76, note: '11 fichas necesitan copy nuevo' },
];

const recentActivity = [
  {
    title: 'Skill aprobada',
    detail: 'Creative Brief Generator paso a produccion con score 94/100.',
    icon: CheckCircle2,
    tone: 'text-emerald-500 bg-emerald-500/10',
  },
  {
    title: 'Revision abierta',
    detail: 'Lead Enrichment Helper quedo pausada por falta de fuente declarada.',
    icon: Eye,
    tone: 'text-sky-500 bg-sky-500/10',
  },
  {
    title: 'Bloqueo preventivo',
    detail: 'Sales Outreach Turbo fue despublicada hasta corregir mensajes agresivos.',
    icon: XCircle,
    tone: 'text-rose-500 bg-rose-500/10',
  },
  {
    title: 'Nuevo trigger',
    detail: 'Se activo auto-review para skills con integraciones externas.',
    icon: Wand2,
    tone: 'text-violet-500 bg-violet-500/10',
  },
];

const statusClassNames = {
  Aprobada: 'bg-emerald-500/10 text-emerald-500',
  Observacion: 'bg-amber-500/10 text-amber-500',
} as const;

const severityClassNames = {
  Alta: 'bg-rose-500/10 text-rose-500',
  Media: 'bg-amber-500/10 text-amber-500',
  Baja: 'bg-sky-500/10 text-sky-500',
} as const;

export default function AdminSkillsPage() {
  return (
    <div className="max-w-full space-y-4 overflow-x-hidden p-4 md:space-y-6 md:p-6">
      <section className="overflow-hidden rounded-2xl border border-border bg-card md:rounded-3xl">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(251,191,36,0.18),_transparent_24%),linear-gradient(135deg,rgba(15,23,42,0.05),transparent_55%)]" />
          <div className="relative flex flex-col gap-4 p-4 md:gap-6 md:p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
            <div className="max-w-2xl">
              <Badge variant="outline" className="border-sky-500/30 bg-sky-500/5 text-sky-500">
                <Sparkles className="mr-1 h-3 w-3" />
                Centro de Curacion
              </Badge>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:mt-4 md:text-3xl">
                Administracion de Skills
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                Armé una vista estatica con contenido de muestra para que esta seccion ya se vea
                viva: resumen del catalogo, cola de moderacion, calidad de metadata y las skills
                destacadas que podrian promocionarse dentro de EthosHub.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
              <div className="rounded-xl border border-border/70 bg-background/80 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                  Revision activa
                </p>
                <p className="mt-1.5 text-xl font-semibold text-foreground sm:mt-2 sm:text-2xl">07</p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">skills con seguimiento manual</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/80 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                  Con integraciones
                </p>
                <p className="mt-1.5 text-xl font-semibold text-foreground sm:mt-2 sm:text-2xl">41</p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">Slack, GitHub, Notion y CRM</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/80 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                  Ultimo refresh
                </p>
                <p className="mt-1.5 text-xl font-semibold text-foreground sm:mt-2 sm:text-2xl">09:42</p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">snapshot de datos mock</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {overviewStats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card className="relative overflow-hidden p-0">
              <div className={cn('absolute inset-x-0 top-0 h-16 bg-gradient-to-br sm:h-24', item.accent)} />
              <div className="relative p-3 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="rounded-xl border border-border/70 bg-background/80 p-2 sm:rounded-2xl sm:p-3">
                    <item.icon className="h-4 w-4 text-foreground sm:h-5 sm:w-5" />
                  </div>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-background/90 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:gap-1 sm:px-2.5 sm:py-1 sm:text-xs">
                    <ArrowUpRight className="h-2.5 w-2.5 text-emerald-500 sm:h-3 sm:w-3" />
                    <span className="hidden sm:inline">{item.change}</span>
                  </span>
                </div>
                <p className="mt-4 text-xl font-bold text-foreground sm:mt-8 sm:text-3xl">{item.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">{item.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-4 md:p-6">
          <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between sm:pb-5">
            <div>
              <h2 className="text-base font-semibold text-foreground md:text-lg">Catalogo destacado</h2>
              <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
                Skills listas para exhibicion, demo interna o promocion editorial.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 px-2 sm:px-3">
                <Search className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Buscar</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 px-2 sm:px-3">
                <Filter className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Filtrar</span>
              </Button>
              <Button size="sm" className="h-8 px-2 sm:px-3">
                <Code2 className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Nueva ficha</span>
              </Button>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {featuredSkills.map((skill) => (
              <div
                key={skill.name}
                className="rounded-2xl border border-border bg-background/60 p-5 transition-colors hover:bg-background"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-foreground">{skill.name}</h3>
                      <Badge variant="secondary" className={statusClassNames[skill.status]}>
                        {skill.status}
                      </Badge>
                      <Badge variant="outline">{skill.category}</Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {skill.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid min-w-[220px] gap-3 rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Confianza</span>
                      <span className="font-medium text-foreground">{skill.trust}%</span>
                    </div>
                    <Progress value={skill.trust} />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Uso</span>
                      <span className="font-medium text-foreground">{skill.usage}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Actividad reciente</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Eventos sinteticos para poblar la vista.
              </p>
            </div>
            <Brain className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="mt-5 space-y-4">
            {recentActivity.map((item) => (
              <div key={item.title} className="flex gap-3 rounded-2xl border border-border p-4">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-2xl', item.tone)}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Cola de moderacion</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Solicitudes simuladas con prioridad y motivo de revision.
              </p>
            </div>
            <Badge variant="outline" className="text-foreground">
              3 items visibles
            </Badge>
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl border border-border md:mt-5 md:rounded-2xl">
            <div className="hidden min-w-[500px] grid-cols-[1.3fr_1fr_1fr_0.8fr] gap-3 bg-muted/40 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:grid sm:px-4 sm:py-3 sm:text-xs">
              <span>Skill</span>
              <span>Autor</span>
              <span>Motivo</span>
              <span>ETA</span>
            </div>
            {moderationQueue.map((item) => (
              <div
                key={item.name}
                className="grid min-w-[500px] grid-cols-[1.3fr_1fr_1fr_0.8fr] gap-2 border-t border-border px-3 py-3 text-xs sm:gap-3 sm:px-4 sm:py-4 sm:text-sm"
              >
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <Badge variant="secondary" className={severityClassNames[item.severity]}>
                    {item.severity}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{item.author}</p>
                <p className="text-muted-foreground">{item.reason}</p>
                <p className="text-foreground">{item.eta}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground md:text-lg">Salud del ecosistema</h2>
              <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
                Indicadores mock para que la seccion tenga lectura rapida.
              </p>
            </div>
            <Bot className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
          </div>

          <div className="mt-4 space-y-4 md:mt-5 md:space-y-5">
            {healthSignals.map((signal) => (
              <div key={signal.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{signal.label}</span>
                  <span className="text-muted-foreground">{signal.value}%</span>
                </div>
                <Progress value={signal.value} />
                <p className="text-xs text-muted-foreground">{signal.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 rounded-2xl border border-dashed border-border bg-muted/20 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                <Link2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Integraciones observadas</p>
                <p className="text-xs text-muted-foreground">
                  12 skills consumen servicios externos y pasan por doble control.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
