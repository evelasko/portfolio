import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

type CalloutType = "info" | "warning" | "success" | "error";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutStyles: Record<
  CalloutType,
  { container: string; icon: React.ReactNode }
> = {
  info: {
    container: "bg-black-10 border-black-30",
    icon: <Info className="w-5 h-5 text-black-98" />,
  },
  warning: {
    container: "bg-orange-100/10 border-orange-100/30",
    icon: <AlertTriangle className="w-5 h-5 text-orange-100" />,
  },
  success: {
    container: "bg-green-500/10 border-green-500/30",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
  error: {
    container: "bg-red-500/10 border-red-500/30",
    icon: <XCircle className="w-5 h-5 text-red-500" />,
  },
};

/**
 * Callout component for highlighting important information in MDX
 */
export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = calloutStyles[type];

  return (
    <div className={clsx("my-6 p-4 rounded-lg border", styles.container)}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
        <div className="flex-1">
          {title && (
            <div
              className={clsx(
                TYPOGRAPHY.text16,
                "font-semibold mb-2 text-black-100"
              )}
            >
              {title}
            </div>
          )}
          <div className={clsx(TYPOGRAPHY.text16, "text-black")}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
