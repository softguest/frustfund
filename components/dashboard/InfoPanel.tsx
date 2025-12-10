import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoPanelProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}

export function InfoPanel({ title, description, icon: Icon, children, className }: InfoPanelProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-8", className)}>
      <div className="flex items-start space-x-4 mb-6">
        {Icon && (
          <div className="w-10 h-10 bg-accent/10 rounded-md flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-accent" />
          </div>
        )}
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground mb-3">{title}</h2>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      
      {children}
    </div>
  );
}
