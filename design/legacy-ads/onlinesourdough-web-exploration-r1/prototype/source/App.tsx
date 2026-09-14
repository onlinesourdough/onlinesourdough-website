import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { SearchDialog } from "./components/SearchDialog";
import { Sidebar } from "./components/Sidebar";
import { SettingsDialog } from "./components/SettingsDialog";
import { siteConfig } from "./config/site";
import { seedCatalog } from "./data/seed-catalog";
import { useAccessState } from "./features/auth/hooks/useAccessState";
import { useCatalog } from "./features/catalog/hooks/useCatalog";
import { applyMeta } from "./lib/meta";
import { getRouteMetadata } from "./lib/pageIdentity";
import { normalizePath, parseRoute } from "./lib/routes";
import { getSidebarSearchResults } from "./lib/sidebarSearch";
import { withExploreFundamentals } from "./lib/sidebarNavigation";
import {
  getInitialSidebarMode,
  persistSidebarMode,
  type SidebarMode,
} from "./lib/sidebarMode";
import { getInitialTheme, type Theme } from "./lib/theme";
import {
  getInitialCompletedTasks,
  getTaskItems,
  persistCompletedTasks,
  toggleCompletedTask,
} from "./lib/tasks";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(() =>
    new URLSearchParams(window.location.search).get("variant") &&
    new URLSearchParams(window.location.search).get("variant") !== "baseline"
      ? "collapsed"
      : getInitialSidebarMode(siteConfig.sidebarStorageKey),
  );
  const [theme, setTheme] = useState<Theme>(() =>
    new URLSearchParams(location.search).has("capture")
      ? "light"
      : getInitialTheme(),
  );
  const accessState = useAccessState();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(() =>
    getInitialCompletedTasks(siteConfig.tasksStorageKey),
  );
  const { catalog: loadedCatalog, isLoading: isCatalogLoading } = useCatalog(
    seedCatalog,
    accessState.hasPaidAccess,
  );
  const catalog = withExploreFundamentals(loadedCatalog);
  const route = parseRoute(currentPath);
  const sidebarOpen = sidebarMode === "expanded";
  const tasks = getTaskItems(catalog);
  const { moduleResults, standaloneResults, hasResults } =
    getSidebarSearchResults({
      catalog,
      currentPath,
      query: searchQuery,
    });

  function navigateTo(path: string) {
    closeSearch();
    const normalizedPath = normalizePath(path);
    window.history.pushState({}, "", normalizedPath);
    setCurrentPath(normalizedPath);
    window.scrollTo({ top: 0 });
  }

  function openSearch() {
    setSettingsOpen(false);
    setSearchOpen(true);
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery("");
  }

  function openSettings() {
    closeSearch();
    setSettingsOpen(true);
  }

  function updateSidebarOpen(open: boolean) {
    const nextSidebarMode: SidebarMode = open ? "expanded" : "collapsed";
    setSidebarMode(nextSidebarMode);
    persistSidebarMode(siteConfig.sidebarStorageKey, nextSidebarMode);
  }

  function updateCompletedTask(taskId: string) {
    const nextCompletedTaskIds = toggleCompletedTask(completedTaskIds, taskId);
    setCompletedTaskIds(nextCompletedTaskIds);
    persistCompletedTasks(siteConfig.tasksStorageKey, nextCompletedTaskIds);
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    function handlePopState() {
      const nextPath = getCurrentPath();
      setCurrentPath(nextPath);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const metadata = getRouteMetadata(route);
    applyMeta({
      title: metadata.title,
      description: metadata.description,
      url: `${siteConfig.siteUrl}${currentPath === "/" ? "/" : currentPath}`,
      themeColor: siteConfig.seo.themeColor,
    });
  }, [currentPath, route]);

  useEffect(() => {
    function openWithShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      }
    }

    window.addEventListener("keydown", openWithShortcut);
    return () => window.removeEventListener("keydown", openWithShortcut);
  }, []);

  return (
    <div
      className={
        sidebarOpen
          ? "site-shell site-shell-sidebar-open"
          : "site-shell site-shell-sidebar-closed"
      }
    >
      {sidebarOpen ? (
        <>
          <button
            className="sidebar-backdrop"
            type="button"
            aria-label="Hide sidebar"
            onClick={() => updateSidebarOpen(false)}
          />
          <Sidebar
            catalog={catalog}
            currentPath={currentPath}
            searchOpen={searchOpen}
            onNavigate={navigateTo}
            onRequestClose={() => updateSidebarOpen(false)}
            onSettingsClick={openSettings}
            onToggleSearch={searchOpen ? closeSearch : openSearch}
          />
        </>
      ) : null}
      <div className="site-main">
        <Header
          accessState={accessState}
          catalog={catalog}
          currentPath={currentPath}
          sidebarOpen={sidebarOpen}
          theme={theme}
          onLoginClick={() => navigateTo("/account")}
          onSidebarToggle={() => updateSidebarOpen(!sidebarOpen)}
          onBack={() => window.history.back()}
          onForward={() => window.history.forward()}
          onThemeChange={setTheme}
        />
        {searchOpen ? (
          <SearchDialog
            hasResults={hasResults}
            moduleResults={moduleResults}
            standaloneResults={standaloneResults}
            query={searchQuery}
            onClose={closeSearch}
            onNavigate={navigateTo}
            onQueryChange={setSearchQuery}
          />
        ) : null}
        {settingsOpen ? (
          <SettingsDialog
            accessState={accessState}
            onClose={() => setSettingsOpen(false)}
            onNavigate={navigateTo}
          />
        ) : null}
        <main className="main-panel">
          <AppRoutes
            route={route}
            catalog={catalog}
            isCatalogLoading={isCatalogLoading}
            accessState={accessState}
            tasks={tasks}
            completedTaskIds={completedTaskIds}
            onTaskToggle={updateCompletedTask}
            onNavigate={navigateTo}
          />
        </main>
        <footer className="site-footer">
          <div>
            <span>copyright 2026 onlinesourdough</span>
          </div>
          <nav aria-label="Footer links">
            <a
              href={siteConfig.landingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              onlinesourdough
            </a>
            <a href={siteConfig.contactUrl}>contact</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}

function getCurrentPath() {
  if (typeof window === "undefined") return "/";
  return normalizePath(window.location.pathname);
}
