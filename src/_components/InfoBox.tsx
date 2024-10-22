import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InfoIcon, X } from "lucide-react";
import { useState } from "react";
export default function InfoBox({
  title,
  subtitle,
}: {
  readonly title: string;
  readonly subtitle: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;
  return (
    <Card className="bg-blue-50 border-blue-200 w-full my-2">
      <CardContent className="p-0">
        <div className="flex items-center justify-between space-x-4 p-2 sm:p-3">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-grow">
            <InfoIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <p className="text-blue-700 text-sm">
              <span className="font-semibold">{title}:</span> {subtitle}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-100"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
