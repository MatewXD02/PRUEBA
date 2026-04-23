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
  Moon,
  Sun,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { useAuthStore, useUiStore } from '@/store';
import { Avatar, Badge } from '@/shared/ui';

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
  const { resolvedTheme, setTheme, initializeTheme } = useUiStore();
  const isDark = resolvedTheme === 'dark';

  // Force sync theme on mount and whenever resolvedTheme changes
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      {/* Sidebar - OLED Blackout with Lilac accents */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white dark:border-violet-500/20 dark:bg-black">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-4 dark:border-violet-500/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-sans text-lg font-bold text-black dark:text-white">EthosHub</span>
            <Badge className="ml-2 border-0 bg-violet-500/20 text-[10px] text-violet-700 dark:text-violet-300">
              Admin
            </Badge>
          </div>
        </div>

        {/* Back to dashboard */}
        <div className="border-b border-gray-200 p-4 dark:border-violet-500/20">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-300/70 dark:hover:text-violet-300"
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
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                        : 'text-gray-600 hover:bg-violet-500/10 hover:text-violet-600 dark:text-violet-300/70 dark:hover:text-violet-300'
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
        <div className="border-t border-gray-200 p-4 dark:border-violet-500/20">
          {/* Theme Toggle - Lilac accent */}
          <button
            type="button"
            onClick={handleToggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium transition-all hover:border-violet-500/40 hover:bg-violet-500/10 dark:border-violet-500/20 dark:bg-violet-500/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ scale: 0, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex items-center gap-2"
                >
                  <Moon className="h-4 w-4 text-violet-400" />
                  <span className="text-violet-300">Modo Oscuro</span>
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ scale: 0, rotate: 90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex items-center gap-2"
                >
                  <Sun className="h-4 w-4 text-violet-600" />
                  <span className="text-violet-600">Modo Claro</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* User info */}
          <div className="flex items-center gap-3">
            <Avatar src={user?.avatar} alt={user?.name} fallback={user?.name} size="md" className="border border-violet-500/30" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-black dark:text-white">{user?.name}</p>
              <p className="truncate text-xs text-violet-600 dark:text-violet-400">Administrador</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-600 transition-colors hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-600 dark:border-violet-500/20 dark:text-violet-300/70 dark:hover:text-violet-300"
          >
            <LogOut className="h-4 w-4" />
            {t('nav.logout')}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-64 flex flex-1 flex-col bg-gray-50 dark:bg-black">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-violet-500/20 dark:bg-black/95 dark:supports-[backdrop-filter]:bg-black/80">
          <h1 className="font-sans text-lg font-semibold text-black dark:text-white">Panel de Administracion</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
