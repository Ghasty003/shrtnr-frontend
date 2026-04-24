import { forwardRef } from "react";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightSlot?: React.ReactNode;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, rightSlot, disabled, ...inputProps }, ref) => {
    return (
      <div
        className={["flex flex-col gap-2", disabled ? "opacity-50" : ""].join(
          " ",
        )}
      >
        <label className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            disabled={disabled}
            {...inputProps}
            className={[
              "w-full px-4 py-2.75 rounded-xl text-[13px] bg-surface-container-high placeholder:text-muted/40 outline-none border transition-all duration-150",
              disabled
                ? "text-muted border-transparent cursor-not-allowed select-none"
                : "text-white border-transparent focus:border-primary focus:shadow-[0_0_0_3px_rgba(189,157,255,0.1)]",
              error ? "border-red-500/60" : "",
            ].join(" ")}
            style={{ paddingRight: rightSlot ? "2.75rem" : undefined }}
          />
          {rightSlot && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              {rightSlot}
            </div>
          )}
        </div>
        {error && <p className="text-[11px] text-red-400">{error}</p>}
      </div>
    );
  },
);

Field.displayName = "Field";

export default Field;
