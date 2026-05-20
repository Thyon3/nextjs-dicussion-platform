import React, { ReactNode } from "react";

type PageContentProps = {
  children: ReactNode;
};

/**
 * reddit-style content wrapper that manages the feed and sidebar columns.
 * feed (center/left) is responsive, while the sidebar (right) has a fixed width.
 */
const PageContent: React.FC<PageContentProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="flex justify-center w-full min-h-screen pt-5 pb-10">
      <div className="flex w-full max-w-[1100px] px-0 md:px-4">
        {/* Center/Left Feed Column */}
        <div className="flex flex-col w-full lg:w-[640px] xl:w-[740px] shrink-0">
          {childrenArray[0]}
        </div>

        {/* Right Sidebar Column */}
        <div className="hidden lg:flex flex-col flex-1 ml-6 gap-5 max-w-[312px]">
          {childrenArray[1]}
        </div>
      </div>
    </div>
  );
};

export default PageContent;
