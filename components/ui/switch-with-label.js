import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SwitchWithLabel({ children }) {
  return (
    <div className="flex items-center space-x-2 h-9">
      <Switch id={`${children}-mode`} />
      <Label htmlFor={`${children}-mode`}>{children}</Label>
    </div>
  );
}
