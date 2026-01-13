import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sun, Moon } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center glass-card px-8 py-4 bg-[var(--bg-card)]/80 backdrop-blur-md">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            filter: ["drop-shadow(0 0 0px var(--accent-secondary))", "drop-shadow(0 0 10px var(--accent-secondary))", "drop-shadow(0 0 0px var(--accent-secondary))"]
                        }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                        <Heart className="w-8 h-8 text-[var(--accent-secondary)]" fill="currentColor" />
                    </motion.div>
                    <span className="text-2xl font-bold tracking-tighter text-gradient-premium group-hover:opacity-80 transition-opacity">
                        CardioCare<span className="font-light">AI</span>
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-full hover:bg-[var(--glass-border)] transition-all duration-300 hover:rotate-12"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ?
                            <Sun className="w-5 h-5 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]" /> :
                            <Moon className="w-5 h-5 text-slate-700" />
                        }
                    </button>

                    <button
                        onClick={() => document.getElementById('predict-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-primary text-sm whitespace-nowrap"
                    >
                        Start Assessment
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
