'use client'
import React from 'react'
import HeroSection from '@/components/hero-section'
import FooterSection from '@/components/footer'
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
                        AI-Guided Mental Health Support
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                        Intelligent chatbot providing 24/7 emotional support with multilingual capabilities. 
                        Early detection algorithms identify students at risk and provide immediate interventions.
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
                        Confidential Counseling
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                        Secure booking system for anonymous counseling sessions. 
                        Connect students with professional counselors while maintaining complete privacy.
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
                        Educational Resources
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                        Comprehensive psychoeducational content covering stress management, 
                        coping strategies, and mental wellness in regional languages.
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
                        Data-Driven Insights
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                        Anonymous analytics dashboard for administrators to track campus mental health trends 
                        and make informed decisions about student support services.
                    </p>
                </div>
            ),
            className: "md:col-span-2",
            thumbnail: "/features/1216465.jpg"
        },
    ];

    const testimonials = [
        "Transformed how we approach student mental health on campus",
        "Early intervention capabilities have helped us support at-risk students",
        "The multilingual support makes mental health accessible to all our students", 
        "Anonymous analytics provide crucial insights for policy decisions",
        "Students feel more comfortable seeking help through this platform",
        "Reduced stigma and increased counseling center efficiency significantly"
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <HeroSection />
            
            {/* Problem Statement Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Addressing the Mental Health Crisis in Higher Education
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
                            Students face unprecedented mental health challenges, but existing support systems fall short. 
                            Our platform bridges the gap with culturally-aware, accessible, and data-driven solutions.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-background rounded-lg shadow-sm border">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">70%</div>
                            <p className="text-sm text-muted-foreground">of students experience mental health challenges during college</p>
                        </div>
                        <div className="text-center p-6 bg-background rounded-lg shadow-sm border">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
                            <p className="text-sm text-muted-foreground">availability ensures support when students need it most</p>
                        </div>
                        <div className="text-center p-6 bg-background rounded-lg shadow-sm border">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
                            <p className="text-sm text-muted-foreground">reduction in stigma through anonymous support options</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Features Section with Layout Grid */}
            <section id="features" className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Comprehensive Mental Health Solution
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover our integrated platform designed specifically for higher education institutions to support student mental wellness
                        </p>
                    </div>
                    
                    <LayoutGrid cards={featureCards} />
                </div>
            </section>

            {/* Security & Privacy Section */}
            <section className="py-16 md:py-24 bg-primary/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Privacy & Security First
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We understand the sensitive nature of mental health data. Our platform is built with enterprise-grade security and complete anonymity.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <h3 className="font-semibold mb-2">End-to-End Encryption</h3>
                            <p className="text-sm text-muted-foreground">All communications and data are fully encrypted</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👤</span>
                            </div>
                            <h3 className="font-semibold mb-2">Anonymous Access</h3>
                            <p className="text-sm text-muted-foreground">Students can access support without revealing identity</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📋</span>
                            </div>
                            <h3 className="font-semibold mb-2">HIPAA Compliant</h3>
                            <p className="text-sm text-muted-foreground">Meets all healthcare data protection standards</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🌐</span>
                            </div>
                            <h3 className="font-semibold mb-2">Regional Compliance</h3>
                            <p className="text-sm text-muted-foreground">Adheres to local data protection laws</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section with Infinite Slider */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What Institutions Say
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Trusted by universities and colleges nationwide
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
                                            <p className="font-medium text-sm">Student Affairs Director</p>
                                            <p className="text-xs text-muted-foreground">University #{index + 1}</p>
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
                            Ready to Transform Student Mental Health?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Join leading educational institutions in creating a supportive environment where every student can thrive mentally and academically
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button asChild size="lg" className="px-8 bg-green-600 hover:bg-green-700">
                                <Link href="/anonymous-session">
                                    Get Help Anonymously
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
            <FooterSection />
        </div>
    )
}

export default Landing
