"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import useSWR from "swr";
import MultiStepProgressBar from "@/components/MultiStepProgressBar";
import SkipGrid from "@/components/SkipGrid";
import SkipGridSkeleton from "@/components/SkipGridSkeleton";
import ActionBar from "@/components/ActionBar";
import { ModeToggle } from "@/components/theme-toggle";
import { Skip } from "@/lib/types";

// Fetcher function for SWR
const fetcher = async (url: string): Promise<Skip[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch skips: ${response.status}`);
  }

  return response.json();
};

export default function Home() {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const {
    data: skips,
    error,
    isLoading,
  } = useSWR(
    "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  const handleSkipSelect = (skip: Skip | null) => {
    setSelectedSkip(skip);
  };

  const handleBack = () => {
    console.log("Back button clicked");
  };

  const handleContinue = () => {
    console.log("Continue button clicked", selectedSkip);
  };

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="container mx-auto px-4">
        {/* Mobile header with theme toggle */}
        <div className="flex justify-between items-center py-4 md:hidden">
          <h1 className="text-2xl font-bold text-foreground">Skip Hire</h1>
          <ModeToggle />
        </div>

        <div className="text-center hidden py-12 md:block relative">
          <div className="absolute top-4 right-0">
            <ModeToggle />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Skip Hire
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow our simple 6-step process to book your skip hire service.
            </p>
          </div>
        </div>

        <MultiStepProgressBar currentStep={3} />

        <div className="py-12">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Skip Size
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the perfect skip size for your needs.
            </p>
          </motion.div>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SkipGridSkeleton />
            </motion.div>
          )}

          {error && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-lg font-semibold text-destructive mb-2">
                  Something went wrong
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We couldn&apos;t load the available skips. Please try again.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}

          {skips && !isLoading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {skips.length > 0 ? (
                <SkipGrid
                  skips={skips}
                  selectedSkipId={selectedSkip?.id || null}
                  onSkipSelect={handleSkipSelect}
                />
              ) : (
                <div className="text-center py-12">
                  <div className="bg-muted/50 rounded-lg p-8 max-w-md mx-auto">
                    <div className="text-4xl mb-4">📭</div>
                    <h3 className="text-lg font-semibold mb-2">
                      No Skips Available
                    </h3>
                    <p className="text-muted-foreground">
                      Sorry, no skips are available for your location at the
                      moment.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <ActionBar
        selectedSkip={selectedSkip}
        onBack={handleBack}
        onContinue={handleContinue}
      />
    </main>
  );
}
