
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  onSelect: () => void;
  link: string;
}

export function PricingCard({
  title,
  description,
  price,
  period,
  features,
  popular = false,
  buttonText,
  onSelect,
  link
}: PricingCardProps) {
  return (
    <Card className={cn(
      "relative transition-all duration-200 hover:shadow-lg",
      popular && "border-primary shadow-lg scale-105"
    )}>
      {popular && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
          Most Popular
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="flex items-baseline mt-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-1">/{period}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button 
            className="w-full" 
            variant={popular ? "default" : "outline"}
          >
            {buttonText}
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
