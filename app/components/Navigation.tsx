"use client";

import { Button } from "@/app/components/ui/button";
import { Search, Download, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchMenu,fetchWebsiteSettings } from "@/app/lib/cms";
interface MenuItem {
  id?: number;
  title: string;
  slug?: string | null;
  url?: string | null;
  position?: number;
  children?: MenuItem[];
}

interface WebsiteSettings {
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  base_font_size: string;
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);

  /* ---------------- Scroll effect ---------------- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- Load Menus ---------------- */
  useEffect(() => {
    const loadMenus = async () => {
      try {
        const data = await fetchMenu();
        const sortedMenus = (data?.result || []).sort(
          (a: MenuItem, b: MenuItem) =>
            (a.position || 0) - (b.position || 0),
        );
        setMenus(sortedMenus);
      } catch (error) {
        console.error("Menu fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMenus();
  }, []);

  /* ---------------- Load Website Settings ---------------- */
  useEffect(() => {
    const loadWebsiteSettings = async () => {
      try {
        const data = await fetchWebsiteSettings();
        setSettings(data);
        console.log(data,'rahul')

        // Apply global styles
        const root = document.documentElement;
        root.style.setProperty("--primary-color", data.primary_color);
        root.style.setProperty("--secondary-color", data.secondary_color);
        root.style.setProperty("--base-font-size", data.base_font_size);
        root.style.fontFamily = data.font_family;
      } catch (error) {
        console.error("Website settings fetch failed:", error);
      }
    };

    loadWebsiteSettings();
  }, []);

  const redirect = () =>
    (window.location.href = "/a1-selector-next/employers");
  const jobRedirect = () =>
    (window.location.href = "/a1-selector-next/jobseekers");

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-100 ${
        isScrolled
          ? "bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-b border-white/30"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={settings?.logo_url || "/a1-selector-next/logo2.jpg"}
              alt="Logo"
              className="w-12 h-12 object-contain rounded-sm"
            />
            <a
              href="/a1-selector-next/"
              className="ml-3 text-xl font-bold"
              style={{
                background: settings
                  ? `linear-gradient(to right, ${settings.primary_color}, ${settings.secondary_color})`
                  : undefined,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              A1&nbsp;Selectors
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {!loading &&
              menus.map((menu, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() =>
                    menu.children?.length &&
                    setActiveDropdown(menu.slug || null)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.a
                    href={menu.url || "#"}
                    className={`font-medium flex items-center gap-1 ${
                      isScrolled ? "text-gray-700" : "text-black"
                    }`}
                    style={{
                      color: isScrolled
                        ? "#374151"
                        : settings?.primary_color,
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {menu.title}
                  </motion.a>

                  <AnimatePresence>
                    {menu.children?.length &&
                      activeDropdown === menu.slug && (
                        <motion.div
                          className="absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-lg border z-50"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <ul className="py-2">
                            {menu.children.map((child, cIndex) => (
                              <li key={cIndex}>
                                <a
                                  href={child.url || "#"}
                                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                                  style={{
                                    color: settings?.primary_color,
                                  }}
                                >
                                  {child.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              size="sm"
              onClick={redirect}
              style={{
                borderColor: settings?.primary_color,
                color: settings?.primary_color,
              }}
            >
              <Search className="w-4 h-4 mr-2" />
              Hire Talent
            </Button>

            <Button
              size="sm"
              onClick={jobRedirect}
              style={{
                background: settings
                  ? `linear-gradient(to right, ${settings.primary_color}, ${settings.secondary_color})`
                  : undefined,
                color: "#fff",
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Get Hired
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-6 py-4 space-y-4">
              {!loading &&
                menus.map((menu, index) => (
                  <div key={index}>
                    <a
                      href={menu.url || "#"}
                      className="block font-medium"
                      style={{ color: settings?.primary_color }}
                    >
                      {menu.title}
                    </a>

                    {menu.children?.length && (
                      <div className="pl-4 mt-2 space-y-1 border-l">
                        {menu.children
                          .sort(
                            (a, b) =>
                              (a.position || 0) - (b.position || 0),
                          )
                          .map((child, cIndex) => (
                            <a
                              key={cIndex}
                              href={child.url || "#"}
                              className="block text-gray-600"
                            >
                              {child.title}
                            </a>
                          ))}
                      </div>
                    )}
                  </div>
                ))}

              <div className="pt-4 space-y-3 border-t">
                <Button
                  onClick={redirect}
                  className="w-full"
                  style={{
                    borderColor: settings?.primary_color,
                    color: settings?.primary_color,
                  }}
                >
                  Hire Talent
                </Button>
                <Button
                  onClick={jobRedirect}
                  className="w-full"
                  style={{
                    background: settings
                      ? `linear-gradient(to right, ${settings.primary_color}, ${settings.secondary_color})`
                      : undefined,
                    color: "#fff",
                  }}
                >
                  Get Hired
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
