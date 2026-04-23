import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Code2,
  Users,
  ArrowLeft,
  LogOut,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useAuthStore, useUiStore } from '@/store';
import { Avatar, Badge } from '@/shared/ui';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const adminNavItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Metricas Globales' },
  { path: '/admin/users', icon: Users, label: 'Gestion de Usuarios' },
  { path: '/admin/moderation', icon: AlertTriangle, label: 'Moderacion' },
  { path: '/admin/skills', icon: Code2, label: 'Normalizacion de Skills' },
];

export function AdminLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { resolvedTheme, initializeTheme } = useUiStore();
  const isDark = resolvedTheme === 'dark';

  // Force sync theme on mount and whenever resolvedTheme changes
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Ensure dark class is applied to document for OLED black (#000000)
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - OLED Blackout with Lilac accents */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-sans text-lg font-bold text-foreground">EthosHub</span>
            <Badge className="ml-2 border-0 bg-primary/20 text-[10px] text-primary">
              Admin
            </Badge>
          </div>
        </div>

        {/* Back to dashboard */}
        <div className="border-b border-border p-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Dashboard
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {adminNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section & Theme Toggle (Footer) */}
        <div className="border-t border-border p-4">
          {/* Theme Toggle - Using shared component with Lilac accent */}
          <div className="mb-4 flex items-center justify-center">
            <ThemeToggle size="md" className="border-primary/30 hover:border-primary/50 hover:bg-primary/10" />
          </div>

          {/* User info */}
          <div className="flex items-center gap-3">
            <Avatar src={user?.avatar} alt={user?.name} fallback={user?.name} size="md" className="border border-primary/30" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{user?.name}</p>
              <p className="truncate text-xs text-primary">Administrador</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            {t('nav.logout')}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-64 flex flex-1 flex-col bg-background">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <h1 className="font-sans text-lg font-semibold text-foreground">Panel de Administracion</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
