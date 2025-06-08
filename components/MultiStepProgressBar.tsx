"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Trash2,
  Box,
  FileText,
  Calendar,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps: { key: string; icon: React.ElementType }[] = [
  { key: "Postcode", icon: MapPin },
  { key: "Waste Type", icon: Trash2 },
  { key: "Select Skip", icon: Box },
  { key: "Permit Check", icon: FileText },
  { key: "Choose Date", icon: Calendar },
  { key: "Payment", icon: CreditCard },
];

interface MultiStepProgressBarProps {
  currentStep: number;
}

export default function MultiStepProgressBar({
  currentStep,
}: MultiStepProgressBarProps) {
  const activeStep = steps[currentStep - 1];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-card md:bg-transparent">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <React.Fragment key={step.key}>
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={
                      isCurrent
                        ? "active"
                        : isCompleted
                        ? "completed"
                        : "inactive"
                    }
                    variants={{
                      active: {
                        scale: 1.1,
                        transition: { duration: 0.3, yoyo: Infinity },
                      },
                      completed: { scale: 1 },
                      inactive: { scale: 1 },
                    }}
                    className={cn(
                      "relative flex items-center justify-center w-14 h-14 rounded-full border-2 font-semibold transition-all duration-300",
                      isCompleted
                        ? "bg-primary border-primary text-primary-foreground"
                        : isCurrent
                        ? "bg-primary/20 border-primary text-primary shadow-lg ring-4 ring-primary/30"
                        : "bg-muted border-gray-300 text-muted-foreground"
                    )}
                  >
                    <step.icon className="w-7 h-7" />
                  </motion.div>
                  <p
                    className={cn(
                      "mt-3 text-sm font-medium",
                      isCurrent || isCompleted
                        ? "text font-semibold"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.key}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 max-w-20 mx-2 h-1 rounded-full bg-gray-300 relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{
                        width: isCompleted ? "100%" : isCurrent ? "50%" : "0%",
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {steps.length}: {activeStep.key}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <motion.div
              className="bg-primary h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border-2 border-primary text-primary">
                <activeStep.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-lg">{activeStep.key}</p>
                <p className="text-sm text-muted-foreground">
                  Next: {steps[currentStep]?.key || "Done"}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
