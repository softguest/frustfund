import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  amount: string;
  icon: LucideIcon;
  details: Array<{ label: string; value: string }>;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function SummaryCard({
  title,
  amount,
  icon: Icon,
  details,
  ctaText = "View Details",
  onCtaClick,
}: SummaryCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Main Summary Section */}
      <div className="bg-accent text-accent-foreground p-8 text-center">
        <div className="w-16 h-16 bg-accent-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-accent-foreground" />
        </div>
        
        <h3 className="text-sm font-medium mb-2 text-accent-foreground/90">{title}</h3>
        
        <p className="text-5xl font-bold mb-6">{amount}</p>
        
        <Button
          variant="cta"
          size="lg"
          onClick={onCtaClick}
          className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 w-full"
        >
          {ctaText}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      
      {/* Details Section */}
      <div className="p-6 space-y-4">
        {details.map((detail, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between pb-4",
              index < details.length - 1 && "border-b border-border"
            )}
          >
            <span className="text-sm font-medium text-muted-foreground">{detail.label}</span>
            <span className="text-sm font-bold text-foreground">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
