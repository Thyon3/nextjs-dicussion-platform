import React, { ReactNode } from "react";

type PageContentProps = {
  children: ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="flex justify-center p-4">
      <div className="flex w-[95%] justify-center max-w-[1200px]">
        {/* Left */}
        <div className="flex flex-col w-full md:w-[65%] md:mr-6">
          {childrenArray[0]}
        </div>
        {/* Right */}
        <div className="hidden md:flex flex-col flex-grow">
          {childrenArray[1]}
        </div>
      </div>
    </div>
  );
};

export default PageContent;
