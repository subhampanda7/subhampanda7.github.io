import { Fragment } from "react";
import { cn } from "@/lib/utils";

const BOLD = /\*\*(.+?)\*\*/g;

/**
 * Renders the light `**emphasis**` markup used in the content files, so copy
 * can carry highlighting without embedding JSX in data.
 */
export function RichText({
  text,
  className,
  strongClassName = "font-medium text-fg",
}: {
  text: string;
  className?: string;
  strongClassName?: string;
}) {
  const parts = text.split(BOLD);

  return (
    <span className={cn(className)}>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className={strongClassName}>
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </span>
  );
}
