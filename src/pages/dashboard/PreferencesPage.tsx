import { useEffect, useMemo, useState } from 'react';
import {
  Briefcase,
  Globe2,
  Grip,
  Languages,
  LayoutTemplate,
  Mail,
  MapPin,
  MoonStar,
  Pencil,
  ShieldCheck,
  Sparkles,
  UserCircle2,
} from 'lucide-react';
import { Badge, Card, EmptyState, LoadingSpinner } from '@/shared/ui';
import { useAuthStore } from '@/store/authStore';
import { usePreferencesStore } from '@/store/preferencesStore';
import { ProfileEditorModal } from '@/components/preferences/ProfileEditorModal';
import {
  BiographyCard,
  SkillsCard,
  ContactCard,
  ProjectsCard,
  ExperienceCard,
} from '@/components/preferences/ExpandableCards';
import { AccountSecurityCard } from '@/components/preferences/AccountSecurityCard';
import { FormacionCard } from '@/components/preferences/FormacionCard';

const workSignals = [
  'Disponible para colaboraciones de producto y frontend.',
  'Interes por proyectos con impacto visible y buena narrativa visual.',
  'Preferencia por equipos pequenos, iteracion rapida y ownership claro.',
];

// Mock skills data for demo
const initialSkills = [
  { id: '1', name: 'React', category: 'Frontend' },
  { id: '2', name: 'TypeScript', category: 'Frontend' },
  { id: '3', name: 'Node.js', category: 'Backend' },
  { id: '4', name: 'PostgreSQL', category: 'Bases de Datos' },
  { id: '5', name: 'AWS', category: 'Infraestructura' },
];

export default function PreferencesPage() {
  const { user, updateProfile } = useAuthStore();
  const { preferences, loading, error, fetchPreferences } = usePreferencesStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [skills, setSkills] = useState(initialSkills);

  useEffect(() => {
    if (user?.id) {
      fetchPreferences(user.id);
    }
  }, [fetchPreferences, user?.id]);

  const orderedSections = useMemo(() => {
    return preferences?.sectionOrder ?? ['bio', 'skills', 'projects', 'experience', 'contact'];
  }, [preferences?.sectionOrder]);

  const handleBioSave = async (bio: string) => {
    await updateProfile({ bio });
  };

  const handleAddSkill = (skill: { id: string; name: string; category: string }) => {
    setSkills((prev) => [...prev, skill]);
  };

  const handleRemoveSkill = (skillId: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== skillId));
  };

  const handleContactSave = async (contact: { email: string; phone: string; website: string }) => {
    await updateProfile({ website: contact.website });
    // In a real app, you'd also save email and phone to the appropriate fields
  };

  if (loading && !preferences) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <EmptyState
        icon={UserCircle2}
        title="No hay usuario activo"
        description="Inicia sesion como profesional para ver esta pantalla de preferencias."
      />
    );
  }

  return (
    <section className="w-full max-w-full space-y-4 overflow-x-hidden px-4 sm:space-y-6 sm:px-6 xl:space-y-7">
      {/* Hero Card */}
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-card sm:rounded-3xl">
        <div className="relative px-4 py-5 sm:px-8 sm:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.14),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.10),_transparent_28%)]" />
          <div className="relative flex flex-col gap-5 sm:gap-6 lg:grid lg:grid-cols-[1.3fr_0.9fr]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Modo profesional
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Preferencias del perfil profesional
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Personaliza tu identidad, habilidades y secciones del portafolio.
                  Haz clic en cada seccion para expandirla y editarla.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {user.role}
                </Badge>
                <Badge variant="outline">{user.profession}</Badge>
                <Badge variant="outline">Perfil activo</Badge>
              </div>
            </div>

            {/* User Card with Edit Button */}
            <div className="relative w-full rounded-2xl border border-border bg-background/80 p-4 backdrop-blur sm:rounded-3xl sm:p-5">
              {/* Edit Button */}
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary sm:right-4 sm:top-4"
                aria-label="Editar perfil"
              >
                <Pencil className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-3 sm:gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-16 sm:w-16 sm:rounded-2xl"
                />
                <div className="min-w-0 flex-1 pr-8">
                  <p className="truncate text-base font-semibold text-foreground sm:text-lg">{user.name}</p>
                  <p className="truncate text-sm text-primary">{user.profession}</p>
                  <div className="mt-2 space-y-1.5 text-sm text-muted-foreground sm:mt-3 sm:space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{user.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe2 className="h-4 w-4 shrink-0" />
                      <span className="truncate">{user.website || 'Sitio personal pendiente'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <Card className="w-full border-destructive/30 bg-destructive/5 p-3 sm:p-4">
          <p className="text-sm text-muted-foreground">{error}</p>
        </Card>
      )}

      {/* Main Grid */}
      <div className="flex w-full flex-col gap-4 sm:gap-6 xl:grid xl:grid-cols-[1.15fr_0.85fr]">
        {/* Left Column - Interactive Cards */}
        <div className="w-full space-y-3 sm:space-y-4">
          {/* Interactive Section Cards */}
          <BiographyCard
            initialBio={user.bio || ''}
            onSave={handleBioSave}
          />

          <SkillsCard
            skills={skills}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
          />

          <ProjectsCard projectCount={5} />

          <ExperienceCard experienceCount={3} />

          {/* Formacion - Academic Records */}
          <FormacionCard />

          <ContactCard
            contact={{
              email: user.email,
              phone: '',
              website: user.website || '',
            }}
            onSave={handleContactSave}
          />

          {/* Account Security Card */}
          <AccountSecurityCard />
        </div>

        {/* Right Column - Static Info */}
        <div className="w-full space-y-4 sm:space-y-6 xl:sticky xl:top-24 xl:self-start">
          {/* Account Preferences */}
          <Card className="w-full p-4 sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11 sm:rounded-2xl">
                <Languages className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground sm:text-xl">Preferencias de cuenta</h2>
                <p className="text-sm text-muted-foreground">
                  Ajustes base cargados desde el perfil.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <PreferenceTile
                icon={Languages}
                label="Idioma"
                value={preferences?.language === 'en' ? 'English' : 'Espanol'}
                hint="Definido para la interfaz principal."
              />
              <PreferenceTile
                icon={MoonStar}
                label="Tema"
                value={preferences?.theme ?? 'light'}
                hint="Preferencia visual guardada localmente."
              />
              <PreferenceTile
                icon={ShieldCheck}
                label="Heatmap GitHub"
                value={preferences?.showGithubHeatmap ? 'Visible' : 'Oculto'}
                hint="Control rapido para el perfil publico."
              />
              <PreferenceTile
                icon={Briefcase}
                label="Recomendaciones LinkedIn"
                value={preferences?.showLinkedinRecommendations ? 'Activadas' : 'Desactivadas'}
                hint="Ideal para reforzar credibilidad profesional."
              />
            </div>
          </Card>

          {/* Portfolio Order */}
          <Card className="w-full p-4 sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 sm:h-11 sm:w-11 sm:rounded-2xl">
                <Grip className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground sm:text-xl">Orden del portafolio</h2>
                <p className="text-sm text-muted-foreground">
                  Secuencia sugerida para tu perfil publico.
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:gap-3">
              {orderedSections.map((section, index) => (
                <div
                  key={`${section}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-border bg-background/70 px-3 py-2.5 sm:rounded-2xl sm:px-4 sm:py-3"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground sm:h-8 sm:w-8">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground sm:text-base">{formatSectionLabel(section)}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {sectionDescription(section)}
                      </p>
                    </div>
                  </div>
                  <LayoutTemplate className="h-4 w-4 shrink-0 text-muted-foreground" />
                </div>
              ))}
            </div>
          </Card>

          {/* Work Signals */}
          <Card className="w-full p-4 sm:p-6">
            <h2 className="text-base font-semibold text-foreground sm:text-lg">Senales de trabajo</h2>
            <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
              {workSignals.map((signal) => (
                <div key={signal} className="rounded-xl bg-muted/60 px-3 py-2.5 text-sm text-foreground sm:rounded-2xl sm:px-4 sm:py-3">
                  {signal}
                </div>
              ))}
            </div>
          </Card>

          {/* Profile Summary */}
          <Card className="w-full p-4 sm:p-6">
            <h2 className="text-base font-semibold text-foreground sm:text-lg">Resumen del perfil</h2>
            <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-4">
              <SummaryRow label="Slug publico" value={user.slug} />
              <SummaryRow label="Rol activo" value={user.role} />
              <SummaryRow label="Ubicacion" value={user.location} />
              <SummaryRow label="Sitio personal" value={user.website || 'No configurado'} />
            </div>
          </Card>
        </div>
      </div>

      {/* Profile Editor Modal */}
      <ProfileEditorModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </section>
  );
}

function PreferenceTile({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="w-full rounded-xl border border-border bg-background/70 p-3 sm:rounded-2xl sm:p-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-10 sm:w-10 sm:rounded-2xl">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-muted-foreground sm:text-sm">{label}</p>
          <p className="truncate text-sm font-medium text-foreground sm:text-base">{value}</p>
        </div>
      </div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground sm:mt-3">{hint}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="w-full rounded-xl border border-border bg-background/70 px-3 py-2.5 sm:rounded-2xl sm:px-4 sm:py-3">
      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function formatSectionLabel(section: string) {
  const map: Record<string, string> = {
    bio: 'Biografia',
    skills: 'Skills',
    projects: 'Proyectos',
    experience: 'Experiencia',
    formacion: 'Formacion',
    contact: 'Contacto',
  };

  return map[section] ?? section;
}

function sectionDescription(section: string) {
  const map: Record<string, string> = {
    bio: 'Presentacion y contexto profesional.',
    skills: 'Capacidades tecnicas y fortalezas clave.',
    projects: 'Casos visibles y trabajo demostrado.',
    experience: 'Trayectoria y evolucion del perfil.',
    formacion: 'Trayectoria academica y certificaciones.',
    contact: 'Canales de contacto y conversion.',
  };

  return map[section] ?? 'Seccion del portafolio.';
}
