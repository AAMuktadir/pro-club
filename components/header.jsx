"use client";
import React, { useEffect, useState } from "react";
import Logout from "./logout";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/clubs", label: "Clubs" },
    { href: "/players", label: "Players" },
  ];

  const authLinks = [
    { href: "/manage-club", label: "Manage Club" },
    { href: "/club-profile", label: "Club Profile" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-glass border-b border-slate-200/60"
          : "bg-white border-b border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
              Pro<span className="text-emerald-500">Club</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(href)
                    ? "bg-emerald-500 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {label}
              </Link>
            ))}

            {isLoggedIn && (
              <>
                {authLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(href)
                        ? "bg-emerald-500 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <div className="ml-2 pl-2 border-l border-slate-200">
                  <Logout />
                </div>
              </>
            )}

            {!isLoggedIn && (
              <Link
                href="/login"
                className="ml-2 inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all duration-200 shadow-sm"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200">
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(href)
                    ? "bg-emerald-500 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {label}
              </Link>
            ))}

            {isLoggedIn && (
              <>
                <hr className="border-slate-200 my-2" />
                {authLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(href)
                        ? "bg-emerald-500 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Logout mobile />
                </div>
              </>
            )}

            {!isLoggedIn && (
              <>
                <hr className="border-slate-200 my-2" />
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all duration-200 w-full"
                >
                  Sign In
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
