import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

const Hero = () => {
    return (
        <section className="text-center py-16 space-y-10 relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
            >
                <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter leading-tight pb-2">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--text-secondary)] to-white opacity-90">
                        The Future of
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-tertiary)] to-[var(--accent-secondary)] animate-gradient-x bg-[length:200%_auto]">
                        Heart Health
                    </span>
                </h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-8 text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto font-light leading-relaxed"
                >
                    Advanced AI analysis for <span className="text-[var(--text-primary)] font-medium">instant, medical-grade</span> cardiovascular risk assessment.
                </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20 px-4">
                {[
                    { icon: Activity, title: '72% Accuracy', desc: 'Validated on extensive clinical datasets' },
                    { icon: ShieldCheck, title: 'Secure & Private', desc: 'Local processing ensures your data stays with you' },
                    { icon: Zap, title: 'Real-time Analysis', desc: 'Complex bio-metrics processed in milliseconds' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: "backOut" }}
                        className="glass-card glass-card-hover p-8 text-center group cursor-default"
                    >
                        <div className="bg-[var(--bg-dark)]/50 w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center border border-[var(--glass-border)] group-hover:border-[var(--accent-primary)] group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                            <item.icon className="w-10 h-10 text-[var(--accent-primary)] group-hover:text-[var(--accent-secondary)] transition-colors duration-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">{item.title}</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Hero;
