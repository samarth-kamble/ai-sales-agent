"use client";

import React from "react";
import { Upload, Webcam, Sparkles, ChevronRight } from "lucide-react";
import Image from "next/image";

import OnBoarding from "./_components/OnBoarding";
import FeatureCard from "./_components/FeatureCard";
import FeatureSectionLayout from "./_components/FeatureSectionLayout";
import { potentialCustomer } from "@/lib/data";
import UserInfoCard from "@/components/UserInfoCard";

const HomePage = () => {
  return (
    <div className="w-full mx-auto h-full relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
        {/* Left Section */}
        <div className="w-full lg:flex-1 space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Maximize Your Impact</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Get{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                  Maximum
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/70 to-accent">
                  Conversion
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Transform your webinars into powerful conversion machines with
                our advanced analytics and optimization tools.
              </p>
            </div>
          </div>

          {/* OnBoarding Section */}
          <div className="bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl rounded-2xl border border-border/50 p-6 lg:p-8 shadow-xl">
            <OnBoarding />
          </div>
        </div>

        {/* Right Section - Feature Cards */}
        <div className="w-full lg:w-auto lg:flex-shrink-0">
          <div className="space-y-6">
            {/* Section Header */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Choose Your Path
              </h3>
              <p className="text-muted-foreground">
                Start creating engaging webinars today
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full lg:max-w-md mx-auto lg:mx-0">
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                <FeatureCard
                  Icon={<Upload className="w-10 h-10" />}
                  heading="Browse or drag a pre-recorded webinar file."
                  link="#"
                />
              </div>
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "400ms" }}
              >
                <FeatureCard
                  Icon={<Webcam className="w-10 h-10" />}
                  heading="Record a new webinar using your webcam."
                  link="/webinars"
                />
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center pt-6">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer">
                <span>Need help getting started?</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl bg-background-10">
        <FeatureSectionLayout
          heading="See how far along are your potential customers."
          link="/lead"
        >
          <div className="p-5 flex flex-col gap-4 items-start border rounded-xl border-border backdrop-blur-3xl">
            <div className="w-full flex justify-between items-center gap-3">
              <p className="text-primary font-semibold text-sm">Conversions</p>
              <p className="text-xs text-muted-foreground font-normal">50</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              {Array.from({ length: 3 }).map((_, index) => (
                <Image
                  src="/featurecard.png"
                  alt={`Feature Card ${index + 1}`}
                  width={250}
                  height={250}
                  className="w-full h-full object-cover rounded-xl"
                  key={index}
                />
              ))}
            </div>
          </div>
        </FeatureSectionLayout>
        <FeatureSectionLayout
          heading="See the list of your current customers."
          link="/pipeline"
        >
          <div className="flex gap-4 items-center h-full w-full justify-center relative flex-wrap">
            {potentialCustomer.slice(0, 3).map((customer, index) => (
              <UserInfoCard
                key={index}
                customer={customer}
                tags={customer.tags}
              />
            ))}
          </div>
        </FeatureSectionLayout>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
