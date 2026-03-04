"use client";

interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
}

interface LandingTestimonialsProps {
    testimonials: Testimonial[];
}

export default function LandingTestimonials({ testimonials }: LandingTestimonialsProps) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Ce que nos clients en pensent
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        L'avis de ceux qui l'utilisent au quotidien.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((testi, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700 flex flex-col"
                        >
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`material-symbols-outlined text-[22px] ${i < testi.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 dark:text-slate-600'}`}
                                        style={{ fontVariationSettings: i < testi.rating ? "'FILL' 1" : "'FILL' 0" }}
                                    >
                                        star
                                    </span>
                                ))}
                            </div>
                            <blockquote className="flex-1 text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8 italic">
                                "{testi.content}"
                            </blockquote>
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-lg">
                                    {testi.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{testi.name}</h4>
                                    {testi.role && (
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{testi.role}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
