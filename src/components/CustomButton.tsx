import { ReactNode, useState } from "react";
import clsx from "clsx";

interface CustomButtonProps {
  icon?: ReactNode;
  label?: string;
  tooltip?: string;
  className?: string;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  icon,
  label,
  tooltip,
  className,
  onClick,
}) => {
  const [tooltipHover, setTooltipHover] = useState(false);

  return (
    <div className="custom-btn-container">
      <button
        className={clsx("btn", icon && !label && "icon-btn", className)}
        type="button"
        onMouseEnter={() => setTooltipHover(true)}
        onMouseLeave={() => setTooltipHover(false)}
        onClick={onClick}
      >
        {icon && !label && icon}
        {!icon && label && label}
        {icon && label && (
          <>
            <span className="pe-1">{icon}</span>
            <span>{label}</span>
          </>
        )}
      </button>

      {tooltip && tooltipHover && (
        <div
          className="custom-tooltip"
          style={{ width: `${tooltip.length}ch` }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default CustomButton;
