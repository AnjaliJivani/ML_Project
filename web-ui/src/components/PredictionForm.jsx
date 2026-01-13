import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Activity, Droplets, Cigarette, Wine, Dumbbell, ChevronRight, ChevronLeft, Search, Check, ChevronDown } from 'lucide-react';

const steps = [
    {
        title: 'Personal Vitals',
        fields: ['age', 'gender', 'height', 'weight'],
        icons: { age: User, gender: User, height: Activity, weight: Activity },
        types: { age: 'number', gender: 'select', height: 'number', weight: 'number' },
        options: {
            gender: [
                { value: 1, label: 'Male' },
                { value: 2, label: 'Female' }
            ]
        }
    },
    {
        title: 'Clinical Data',
        fields: ['ap_hi', 'ap_lo', 'cholesterol', 'gluc'],
        icons: { ap_hi: Droplets, ap_lo: Droplets, cholesterol: Activity, gluc: Activity },
        types: { ap_hi: 'number', ap_lo: 'number', cholesterol: 'select', gluc: 'select' },
        options: {
            cholesterol: [
                { value: 1, label: 'Normal' },
                { value: 2, label: 'Above Normal' },
                { value: 3, label: 'High' }
            ],
            gluc: [
                { value: 1, label: 'Normal' },
                { value: 2, label: 'Above Normal' },
                { value: 3, label: 'High' }
            ]
        }
    },
    {
        title: 'Lifestyle Factors',
        fields: ['smoke', 'alco', 'active'],
        icons: { smoke: Cigarette, alco: Wine, active: Dumbbell },
        types: { smoke: 'select', alco: 'select', active: 'select' },
        options: {
            smoke: [{ value: 0, label: 'Non-Smoker' }, { value: 1, label: 'Smoker' }],
            alco: [{ value: 0, label: 'No Alcohol' }, { value: 1, label: 'Consumer' }],
            active: [{ value: 0, label: 'Inactive' }, { value: 1, label: 'Active' }]
        }
    }
];

// Custom Animated Dropdown Component
const CustomSelect = ({ value, options, onChange, name, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = options.find(opt => opt.value === value)?.label;

    return (
        <div className="relative" ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-[var(--bg-dark)]/50 border ${isOpen ? 'border-[var(--accent-primary)] ring-1 ring-[var(--accent-primary)]/50' : 'border-[var(--glass-border)]'} 
                rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all duration-300 hover:border-[var(--accent-primary)]/50 group`}
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon className={`w-5 h-5 ${isOpen ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'} transition-colors group-hover:text-[var(--accent-primary)]`} />}
                    <span className="text-[var(--text-primary)] font-medium">{selectedLabel}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--accent-primary)]' : ''}`} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 top-full left-0 right-0 mt-2 bg-[#0a0f29] border border-[var(--glass-border)] rounded-xl shadow-xl overflow-hidden backdrop-blur-xl"
                    >
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => {
                                    onChange({ target: { name, value: option.value } });
                                    setIsOpen(false);
                                }}
                                className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors
                                ${value === option.value ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'}`}
                            >
                                <span className="font-medium">{option.label}</span>
                                {value === option.value && <Check className="w-4 h-4" />}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const PredictionForm = ({ onPredict, isPredicting }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        age: 50, gender: 1, height: 170, weight: 70,
        ap_hi: 120, ap_lo: 80, cholesterol: 1, gluc: 1,
        smoke: 0, alco: 0, active: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const currentFields = steps[currentStep];

    return (
        <div className="glass-card p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-visible">
            {/* Animated Glow Decor */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[var(--accent-primary)]/10 blur-[80px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[var(--accent-secondary)]/10 blur-[80px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.h2
                            key={currentFields.title}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold bg-gradient-to-r from-white to-[var(--text-secondary)] bg-clip-text text-transparent"
                        >
                            {currentFields.title}
                        </motion.h2>
                        <p className="text-[var(--accent-primary)] font-medium mt-2 tracking-wide uppercase text-xs">
                            Step {currentStep + 1} / {steps.length}
                        </p>
                    </div>

                    {/* Step Indicators */}
                    <div className="flex gap-3">
                        {steps.map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    width: currentStep === i ? 32 : 12,
                                    backgroundColor: currentStep === i ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)'
                                }}
                                className="h-3 rounded-full cursor-pointer transition-colors"
                                onClick={() => setCurrentStep(i)}
                            />
                        ))}
                    </div>
                </div>

                {/* Form Fields */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4"
                    >
                        {currentFields.fields.map(field => {
                            const Icon = currentFields.icons[field];
                            const type = currentFields.types[field];
                            const options = currentFields.options?.[field];

                            return (
                                <div key={field} className="space-y-3 group">
                                    <label className="text-sm font-semibold text-[var(--text-secondary)] flex items-center gap-2 uppercase tracking-wider group-focus-within:text-[var(--accent-primary)] transition-colors">
                                        <Icon className="w-4 h-4" />
                                        {field === 'ap_hi' ? 'Systolic BP' : field === 'ap_lo' ? 'Diastolic BP' : field === 'gluc' ? 'Glucose' : field}
                                    </label>

                                    {type === 'select' ? (
                                        <CustomSelect
                                            name={field}
                                            value={formData[field]}
                                            options={options}
                                            onChange={handleChange}
                                            icon={Icon}
                                        />
                                    ) : (
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleChange}
                                                className="w-full bg-[var(--bg-dark)]/50 border border-[var(--glass-border)] rounded-xl px-4 py-3.5 pl-11 focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]/50 outline-none transition-all text-[var(--text-primary)] placeholder-slate-600 font-medium"
                                                placeholder="0"
                                            />
                                            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 border-t border-[var(--glass-border)]">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/5 text-[var(--text-secondary)] hover:text-white'}`}
                    >
                        <ChevronLeft className="w-5 h-5" /> Back
                    </button>

                    {currentStep === steps.length - 1 ? (
                        <button
                            onClick={() => onPredict(formData)}
                            disabled={isPredicting}
                            className="btn-primary w-full md:w-auto px-12 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(var(--accent-primary),0.4)]"
                        >
                            {isPredicting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-black rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    <span>Analyze Now</span>
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={nextStep}
                            className="btn-primary flex items-center gap-2 px-8"
                        >
                            Next Step <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PredictionForm;
