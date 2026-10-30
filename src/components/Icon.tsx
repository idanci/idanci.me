"use client";

import { LucideProps } from "lucide-react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

const Fallback = () => (
  <div style={{ background: "#ddd", width: 24, height: 24 }} />
);

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

const Icon = ({ name, ...props }: IconProps) => (
  <DynamicIcon name={name} fallback={Fallback} {...props} />
);

export default Icon;
