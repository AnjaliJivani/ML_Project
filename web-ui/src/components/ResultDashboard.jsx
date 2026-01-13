import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { RefreshCcw, AlertTriangle, CheckCircle, TrendingUp, Info, BarChart3, HeartPulse, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultDashboard = ({ prediction, onRestart }) => {
    const [gaugeValue, setGaugeValue] = useState(0);

    if (!prediction || !prediction.importance) {
        return (
            <div className="glass-card p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]">
                <div className="p-6 bg-yellow-500/10 rounded-full border border-yellow-500/20 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                    <AlertTriangle className="w-16 h-16 text-yellow-500" />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--text-secondary)]">Analysis Incomplete</h2>
                <p className="text-[var(--text-secondary)] max-w-md mx-auto text-lg">We couldn't retrieve your complete health profile. Please check your connection and try again.</p>
                <button onClick={onRestart} className="btn-primary mt-4">Restart Assessment</button>
            </div>
        );
    }

    useEffect(() => {
        if (prediction && typeof prediction.probability === 'number') {
            setTimeout(() => setGaugeValue(prediction.probability), 500);
        }

        if (prediction.prediction === 0) {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#00f2ea', '#7000ff', '#ffffff'],
                disableForReducedMotion: true
            });
        }
    }, [prediction]);

    const chartData = {
        labels: prediction.importance.map(i => i.feature),
        datasets: [
            {
                label: 'Contribution %',
                data: prediction.importance.map(i => i.importance),
                backgroundColor: prediction.importance.map(i =>
                    i.impact === 'Positive' ? 'rgba(255, 0, 85, 0.8)' : 'rgba(0, 242, 234, 0.8)'
                ),
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    };

    const chartOptions = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                padding: 16,
                titleFont: { size: 14, family: "'Outfit', sans-serif" },
                bodyFont: { size: 13, family: "'Inter', sans-serif" },
                cornerRadius: 12,
                displayColors: false,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.1)'
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#94a3b8', font: { family: "'Inter', sans-serif" } }
            },
            y: {
                grid: { display: false },
                ticks: { color: '#f8fafc', font: { weight: '600', family: "'Inter', sans-serif" } }
            }
        },
    };

    const riskColor = prediction.prediction === 1 ? '#ff0055' : '#00f2ea';
    const riskLabel = prediction.prediction === 1 ? 'High Risk' : 'Low Risk';

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Risk Score Gauge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-8 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden"
                >
                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${prediction.prediction === 1 ? 'from-red-500 to-pink-600' : 'from-emerald-400 to-cyan-500'}`} />

                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <Activity className="text-[var(--accent-primary)]" />
                        Risk Index
                    </h3>

                    <div className="relative w-64 h-64">
                        <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                            <defs>
                                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor={prediction.prediction === 1 ? '#ff0055' : '#00f2ea'} />
                                    <stop offset="100%" stopColor={prediction.prediction === 1 ? '#7000ff' : '#0ea5e9'} />
                                </linearGradient>
                            </defs>
                            <circle
                                cx="128" cy="128" r="100"
                                fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16"
                                strokeLinecap="round"
                            />
                            <motion.circle
                                cx="128" cy="128" r="100"
                                fill="none"
                                stroke="url(#gaugeGradient)"
                                strokeWidth="16"
                                strokeDasharray={628}
                                initial={{ strokeDashoffset: 628 }}
                                animate={{ strokeDashoffset: 628 - (628 * gaugeValue) / 100 }}
                                transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                                strokeLinecap="round"
                                className="filter drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                                key={Math.round(gaugeValue)}
                                className="text-7xl font-black font-['Outfit'] tracking-tighter"
                            >
                                {Math.round(gaugeValue)}<span className="text-3xl text-[var(--text-secondary)]">%</span>
                            </motion.span>
                            <span className={`text-sm font-bold uppercase tracking-widest mt-2 px-3 py-1 rounded-full border ${prediction.prediction === 1 ? 'border-red-500/30 text-red-500 bg-red-500/10' : 'border-cyan-500/30 text-cyan-500 bg-cyan-500/10'}`}>
                                {riskLabel}
                            </span>
                        </div>
                    </div>

                    <div className="w-full bg-[var(--bg-dark)]/50 rounded-xl p-4 border border-[var(--glass-border)]">
                        <div className="flex items-center justify-between text-sm text-[var(--text-secondary)] mb-2">
                            <span>Analysis Confidence</span>
                            <span className="text-[var(--text-primary)] font-bold">72%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div className="bg-[var(--accent-primary)] h-1.5 rounded-full w-[72%]" />
                        </div>
                    </div>
                </motion.div>

                {/* Feature Importance Chart */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-card p-8 lg:col-span-2 flex flex-col"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                            <BarChart3 className="text-[var(--accent-tertiary)]" />
                            Contribution Factors
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                            <Info className="w-4 h-4 text-[var(--accent-primary)]" />
                            <span>AI Model Weights</span>
                        </div>
                    </div>

                    <div className="flex-grow min-h-[300px]">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </motion.div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-6 border-l-4 border-[var(--accent-secondary)]"
                >
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[var(--accent-secondary)]" /> Primary Risk Factor
                    </h4>
                    <p className="text-[var(--text-secondary)]">
                        Your <span className="text-[var(--text-primary)] font-bold">{prediction.importance[0].feature}</span> shows the highest deviation from optimal ranges, contributing significantly to the risk score.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-6 border-l-4 border-[var(--success)]"
                >
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <HeartPulse className="w-5 h-5 text-[var(--success)]" /> Strongest Protection
                    </h4>
                    <p className="text-[var(--text-secondary)]">
                        Your <span className="text-[var(--text-primary)] font-bold">{[...prediction.importance].reverse().find(i => i.impact === 'Negative')?.feature || 'Activity Level'}</span> is your strongest health asset, helping to lower your overall risk.
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center pt-8"
            >
                <button
                    onClick={onRestart}
                    className="group relative px-8 py-4 bg-[var(--glass-border)] hover:bg-[var(--glass-highlight)] rounded-2xl font-bold transition-all hover:scale-105 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                        <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                        Start New Assessment
                    </span>
                </button>
            </motion.div>
        </div>
    );
};

export default ResultDashboard;
