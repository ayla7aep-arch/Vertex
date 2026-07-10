import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="floating-orb w-96 h-96 bg-lavender-300 top-10 -left-20 animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="floating-orb w-80 h-80 bg-babyblue-300 top-40 right-10 animate-float-delayed"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="floating-orb w-72 h-72 bg-softpink-300 bottom-20 left-1/3 animate-float-slow"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="floating-orb w-64 h-64 bg-peach-200 bottom-40 right-1/4 animate-float"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="floating-orb w-48 h-48 bg-lightpurple-200 top-1/3 left-1/4 animate-float-delayed"
          style={{ animationDelay: '3s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-button px-4 py-2 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-lavender-500" />
          <span className="text-sm font-medium text-gray-700"> Resources for Creators</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
          <span className="text-gray-800">Where editors can find their</span>
          <br />
          <span className="text-gradient">next inspiration.</span>
          <span className="inline-block ml-2 text-3xl sm:text-4xl">✦</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in animation-delay-200">
          Discover premium presets, overlays, sound effects, and creative resources to elevate your
          video editing projects.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-400">
          <Link
            to="/resources"
            className="glass-button-primary px-8 py-4 flex items-center gap-2 text-lg group"
          >
            Explore Resources
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/search"
            className="glass-button px-8 py-4 text-gray-700 font-medium text-lg hover:text-lavender-600"
          >
            Browse All
          </Link>
        </div>


        {/* Bottom Gradient Fade */}
        </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/30 to-transparent" />
    </section>
  );
}
