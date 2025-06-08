import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function SkipCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        {/* Image skeleton */}
        <div className="relative w-full h-32 mb-2 rounded-md overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <div className="animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent absolute inset-0"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="h-7 bg-gray-200 rounded-md w-3/4 mb-3"></div>
        
        {/* Badges skeleton */}
        <div className="flex flex-wrap gap-2">
          <div className="h-5 bg-gray-200 rounded-full w-20"></div>
          <div className="h-5 bg-gray-200 rounded-full w-24"></div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Price skeleton */}
        <div className="h-8 bg-gray-200 rounded-md w-2/3"></div>
        
        {/* Details skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-14"></div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        {/* Button skeleton */}
        <div className="w-full h-9 bg-gray-200 rounded-md"></div>
      </CardFooter>
    </Card>
  );
} 