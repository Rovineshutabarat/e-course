import React from "react";

type EmptyListProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const EmptyList = ({ title, description, icon, children }: EmptyListProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {icon}
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="text-muted-foreground text-sm mb-8 text-center max-w-md">
        {description}
      </p>
      {children}
    </div>
  );
};

export default EmptyList;
