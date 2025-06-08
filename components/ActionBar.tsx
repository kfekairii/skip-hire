"use client";

import { Skip } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ActionBarProps {
  selectedSkip: Skip | null;
  onBack: () => void;
  onContinue: () => void;
}

export default function ActionBar({ selectedSkip, onBack, onContinue }: ActionBarProps) {
  if (!selectedSkip) {
    return null;
  }

  const totalPrice = selectedSkip.price_before_vat + selectedSkip.vat;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
          {/* Left Side - Selection Summary */}
          <div className="flex-1 text-center sm:text-left">
            <div className="text-foreground">
              <span className="font-bold text-lg">{selectedSkip.size} Yard Skip</span>
              <span className="text-primary font-semibold ml-2">
                £{totalPrice.toFixed(2)}
              </span>
              <span className="text-muted-foreground ml-2">
                {selectedSkip.hire_period_days} day hire
              </span>
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex gap-4 shrink-0">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Back
            </Button>
            <Button 
              variant="default" 
              onClick={onContinue}
              disabled={!selectedSkip}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Continue →
            </Button>
          </div>
        </div>

        {/* Disclaimer Text */}
        <div className="px-4 pb-4 pt-0">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
          </p>
        </div>
      </div>
    </div>
  );
} 