'use client'
import React from 'react'
import HeroSection from '@/components/hero-section'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { LayoutGrid } from '@/components/ui/layout-grid'
import Link from 'next/link'
import Image from 'next/image'

const Landing = () => {
    const featureCards = [
        {
            id: 1,
            content: (
                <div>
                    <p className="font-bold md:text-4xl text-xl text-white">
                        Fast Development
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                        Build 10x faster with our pre-built, customizable components. 
                        Save weeks of development time and focus on what matters most - your unique features.
                    </p>
                </div>
            ),
            className: "md:col-span-2",
            thumbnail: "/features/1151242.jpg"
        },
        {
            id: 2,
            content: (
                <div>
                    <p className="font-bold md:text-4xl text-xl text-white">
                        Modern Design
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                        Beautiful, responsive designs that work seamlessly across all devices. 
                        Built with modern design principles and attention to detail.
                    </p>
                </div>
            ),
            className: "col-span-1",
            thumbnail: "/features/1151243.jpg"
        },
        {
            id: 3,
            content: (
                <div>
                    <p className="font-bold md:text-4xl text-xl text-white">
                        Performance
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                        Optimized for speed and performance. Lightning-fast load times 
                        and smooth animations that delight your users.
                    </p>
                </div>
            ),
            className: "col-span-1",
            thumbnail: "/features/1214925.jpg"
        },
        {
            id: 4,
            content: (
                <div>
                    <p className="font-bold md:text-4xl text-xl text-white">
                        Customizable
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                        Highly customizable components that adapt to your brand. 
                        Change colors, styles, and layouts to match your vision perfectly.
                    </p>
                </div>
            ),
            className: "md:col-span-2",
            thumbnail: "/features/1216465.jpg"
        },
    ];

    const testimonials = [
        "Amazing components that saved us weeks of development time",
        "Beautiful designs that our users love",
        "The best component library we've ever used",
        "Incredible performance and customization options",
        "Outstanding developer experience",
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <HeroSection />
            
            {/* Features Section with Layout Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Why Choose Our Components?
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover the power of our carefully crafted UI components through these interactive feature cards
                        </p>
                    </div>
                    
                    <LayoutGrid cards={featureCards} />
                </div>
            </section>

            {/* Testimonials Section with Infinite Slider */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What Developers Say
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Trusted by developers worldwide
                        </p>
                    </div>
                    
                    <div className="relative">
                        <InfiniteSlider 
                            gap={32} 
                            speed={50} 
                            speedOnHover={20}
                            className="py-8"
                        >
                            {testimonials.map((testimonial, index) => (
                                <div 
                                    key={index} 
                                    className="flex-shrink-0 w-80 bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="flex items-start space-x-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-yellow-400">⭐</span>
                                        ))}
                                    </div>
                                    <p className="text-card-foreground italic">
                                        "{testimonial}"
                                    </p>
                                    <div className="mt-4 flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                            <span className="text-sm">👤</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">Developer #{index + 1}</p>
                                            <p className="text-xs text-muted-foreground">Tech Company</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </InfiniteSlider>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-primary/5">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <div className="relative">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Start Building?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Join thousands of developers who are already building amazing apps with our components
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button asChild size="lg" className="px-8">
                                <Link href="#start">
                                    Get Started Now
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="px-8">
                                <Link href="#docs">
                                    View Documentation
                                </Link>
                            </Button>
                        </div>
                        
                        <ProgressiveBlur 
                            className="absolute inset-0 pointer-events-none opacity-30"
                            direction="top"
                            blurLayers={10}
                            blurIntensity={0.5}
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center">
                        <p className="text-muted-foreground">
                            © 2025 NS Components. Built with Next.js and modern UI components.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Landing
