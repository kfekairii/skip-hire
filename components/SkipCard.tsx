import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skip } from "@/lib/types";
import Image from "next/image";

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export default function SkipCard({
  skip,
  isSelected,
  onSelect,
}: SkipCardProps) {
  const formatPrice = (priceBeforeVat: number, vat: number) => {
    const total = priceBeforeVat + (priceBeforeVat * vat) / 100;
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(total);
  };

  return (
    <Card
      className={`
        group cursor-pointer transition-all duration-300 ease-in-out
        border-2 hover:border-primary/50
        bg-card hover:bg-accent/20
        transform hover:scale-[1.02]
        ${
          isSelected
            ? "border-primary bg-primary/5 dark:bg-primary/10"
            : "border-border hover:border-primary/30"
        }
      `}
      onClick={() => onSelect(skip.id)}
    >
      <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="relative w-full h-48 sm:h-72 mb-2 sm:mb-4 rounded-lg sm:rounded-xl overflow-hidden bg-muted/50 border-2 border-muted-foreground/10">
          <Image
            src={skip.size >= 20 ? "/skip-20.jpg" : `/skip.jpg`}
            alt={`${skip.size} yard skip`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            width={400}
            height={128}
          />
         
          {isSelected && (
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-primary text-primary-foreground rounded-full px-2 py-1 sm:px-3 sm:py-2 border-2 border-background">
              <span className="text-xs sm:text-sm font-bold">✓ Selected</span>
            </div>
          )}
        </div>
        
        <CardTitle className="text-lg sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
          {skip.size} Yard Skip
        </CardTitle>
        
        <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
          {!skip.allowed_on_road && (
            <Badge 
              variant="destructive" 
              className="text-xs font-medium border border-destructive/20 px-1.5 py-0.5 sm:px-2 sm:py-1"
            >
              <span className="hidden sm:inline">⚠️ Not Road Legal</span>
              <span className="sm:hidden">⚠️ No Road</span>
            </Badge>
          )}
          {skip.allows_heavy_waste && (
            <Badge 
              variant="secondary" 
              className="text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 sm:px-2 sm:py-1"
            >
              <span className="hidden sm:inline">💪 Heavy Waste OK</span>
              <span className="sm:hidden">💪 Heavy OK</span>
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
        <div className="relative">
          <div className="text-2xl sm:text-3xl font-black text-primary mb-0.5 sm:mb-1">
            {formatPrice(skip.price_before_vat, skip.vat)}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            inc. VAT ({skip.vat}%)
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-md sm:rounded-lg p-3 sm:p-4 border border-muted-foreground/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary"></div>
              <span className="text-xs sm:text-sm font-medium text-foreground">Hire Period</span>
            </div>
            <span className="text-base sm:text-lg font-bold text-primary">
              {skip.hire_period_days} days
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-1 sm:pt-2 px-3 sm:px-6 pb-3 sm:pb-6">
        <Button
          className={`
            w-full h-10 sm:h-12 text-sm sm:text-base font-semibold transition-all duration-200
            ${isSelected 
              ? "bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary" 
              : "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
            }
          `}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skip.id);
          }}
        >
          {isSelected ? "✓ Selected" : "Select This Skip"}
        </Button>
      </CardFooter>
    </Card>
  );
}
