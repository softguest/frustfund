import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon?: LucideIcon;
  subtitle?: string;
  variant?: "default" | "accent";
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  subtitle,
  variant = "default",
  className,
}: MetricCardProps) {
  const isAccent = variant === "accent";

  return (
    <div
      className={cn(
        "rounded-lg p-6 transition-all hover:shadow-md",
        isAccent
          ? "bg-accent text-accent-foreground"
          : "bg-card text-card-foreground border border-border",
        className
      )}
    >
      {Icon && (
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center mb-4",
            isAccent ? "bg-accent-foreground/10" : "bg-accent/10"
          )}
        >
          <Icon className={cn("w-6 h-6", isAccent ? "text-accent-foreground" : "text-accent")} />
        </div>
      )}
      
      <p
        className={cn(
          "text-sm font-medium mb-2",
          isAccent ? "text-accent-foreground/90" : "text-muted-foreground"
        )}
      >
        {title}
      </p>
      
      <p
        className={cn(
          "text-3xl font-bold mb-1",
          isAccent ? "text-accent-foreground" : "text-foreground"
        )}
      >
        {value}
      </p>
      
      {subtitle && (
        <p
          className={cn(
            "text-sm",
            isAccent ? "text-accent-foreground/80" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
