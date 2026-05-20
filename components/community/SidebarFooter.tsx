import React from "react";
import Link from "next/link";

const SidebarFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="font-reddit flex flex-col p-4 mt-2">
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
        <Link href="#" className="text-[8pt] text-muted-foreground hover:text-foreground transition-colors">About</Link>
        <Link href="#" className="text-[8pt] text-muted-foreground hover:text-foreground transition-colors">Careers</Link>
        <Link href="#" className="text-[8pt] text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
        <Link href="#" className="text-[8pt] text-muted-foreground hover:text-foreground transition-colors">Content Policy</Link>
        <Link href="#" className="text-[8pt] text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
      </div>
      <p className="text-[8pt] text-gray-600">
        © {currentYear} Circus Inc. All rights reserved.
      </p>
    </div>
  );
};

export default SidebarFooter;
