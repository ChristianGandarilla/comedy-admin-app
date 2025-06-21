import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function PageHeader({
  title,
  description,
  buttonText,
  onButtonClick,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <h1 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {buttonText && (
        <Button onClick={onButtonClick}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      )}
    </div>
  );
}
