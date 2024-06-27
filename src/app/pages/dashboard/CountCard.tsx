import React from "react";
// import { KTIcon } from "../../../helpers";

type Props = {
  className: string;
  color: string;
  count?: string;
  iconColor: string;
  title: string;
  titleColor?: string;
  description: string;
  descriptionColor?: string;
};

const CountCard: React.FC<Props> = ({
  className,
  color,
  count,
  iconColor,
  title,
  titleColor,
  description,
  descriptionColor,
}) => {
  return (
    <a
      href="#"
      className={`card bg-${color} hoverable ${className}`}
      style={{ background: `${color}` }}
    >
      <div className="card-body text-center">
        {/* <KTIcon
          iconName={svgIcon}
          className={`text-${iconColor} fs-3x ms-n1`}
        /> */}
        <span className={`text-${titleColor} fs-3x ms-n1`}>{count}</span>

        <div className={`text-${titleColor} fw-bold fs-2 mb-2 mt-5`}>
          {title}
        </div>

        <div className={`fw-semibold text-${descriptionColor}`}>
          {description}
        </div>
      </div>
    </a>
  );
};

export default CountCard;
