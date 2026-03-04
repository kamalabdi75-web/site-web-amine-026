"use client";

interface Feature {
    title: string;
    description: string;
    icon: string;
}

interface LandingFeaturesProps {
    features: Feature[];
}

export default function LandingFeatures({ features }: LandingFeaturesProps) {
    if (!features || features.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Pourquoi choisir ce produit ?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Découvrez toutes les caractéristiques qui font de ce produit un choix exceptionnel.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group flex gap-4 md:flex-col md:text-center md:items-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex-shrink-0 w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors duration-300">
                                <span className="material-symbols-outlined text-3xl">
                                    {feature.icon || 'star'}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
