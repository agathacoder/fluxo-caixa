import React from "react";
import { DollarSign, BookOpen, Coffee, Landmark, HelpCircle, Menu, X } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: "inicio", label: "Início", icon: Landmark },
    { id: "historia", label: "História da Ana", icon: Coffee },
    { id: "conceitos", label: "Conceitos", icon: BookOpen },
    { id: "simulador", label: "Simulador Caixa", icon: DollarSign },
    { id: "quiz", label: "Quiz Desafio", icon: HelpCircle },
  ];

  return (
    <nav className="bg-[#005ca9] text-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("inicio")}>
            <div className="bg-[#ff9e1b] p-2 rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition-transform">
              <Landmark className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-xl tracking-tight block text-white leading-none">FLUXO CAIXA</span>
              <span className="text-[10px] font-mono text-orange-200 uppercase tracking-widest block font-semibold mt-1">Giro Inteligente</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg font-sans text-sm font-medium transition-all duration-200 border-b-2 ${
                    isActive
                      ? "bg-[#004b8a] text-[#ff9e1b] border-[#ff9e1b]"
                      : "text-slate-100 border-transparent hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#004b8a] px-2 pt-2 pb-3 space-y-1 shadow-inner border-t border-white/5 animate-in fade-in duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md font-sans text-base font-medium transition-colors ${
                  isActive
                    ? "bg-[#002f5a] text-[#ff9e1b] border-l-4 border-[#ff9e1b]"
                    : "text-slate-100 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
