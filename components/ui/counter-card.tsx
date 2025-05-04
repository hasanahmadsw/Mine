"use client";

import { useEffect, useState } from "react";
import { 
  DollarSignIcon, 
  UsersIcon, 
  GlobeIcon, 
  StarIcon,
  TrendingUpIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface CounterCardProps {
  title: string;
  value: string;
  description: string;
  icon: "dollar" | "users" | "globe" | "star" | "trending";
}

export function CounterCard({ title, value, description, icon }: CounterCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const currentElement = document.getElementById(`counter-${title.toLowerCase().replace(/\s+/g, '-')}`);
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [title]);
  
  const getIcon = () => {
    switch (icon) {
      case "dollar":
        return <DollarSignIcon className="h-8 w-8" />;
      case "users":
        return <UsersIcon className="h-8 w-8" />;
      case "globe":
        return <GlobeIcon className="h-8 w-8" />;
      case "star":
        return <StarIcon className="h-8 w-8" />;
      case "trending":
        return <TrendingUpIcon className="h-8 w-8" />;
      default:
        return <TrendingUpIcon className="h-8 w-8" />;
    }
  };
  
  return (
    <Card 
      id={`counter-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className={cn(
        "backdrop-blur-sm flex flex-col items-center text-center transition-all duration-500",
        isVisible ? "animate-fade-in-up" : "opacity-0"
      )}
    >
      <CardContent className="pt-6">
        <div className="bg-muted rounded-full p-4 mb-6 mx-auto w-fit">
          {getIcon()}
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold mb-2">{value}</h3>
        <p className="font-medium mb-1">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
} 