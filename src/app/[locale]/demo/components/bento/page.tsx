"use client";

import { useLayout } from "@/contexts/LayoutContext";
import clsx from "clsx";
import { useEffect } from "react";

export default function BentoDemo() {
  const { setShowNavBar, setShowFooter } = useLayout();

  // Configure layout for this page - hide both NavBar and Footer
  useEffect(() => {
    setShowNavBar(false);
    setShowFooter(false);

    // Cleanup: restore defaults when leaving this page
    return () => {
      setShowNavBar(true);
      setShowFooter(true);
    };
  }, [setShowNavBar, setShowFooter]);
  return (
    <div className="p-12 min-h-screen w-full bg-black-50">
      <div className="flex items-center justify-center p4 bg-white">
        <div
          className={clsx(
            "bento-grid",
            "grid w-full p-4",
            "grid-cols-3 grid-rows-[200px_200px_200px_200px_200px] gap-4",
            "m:grid-cols-4 m:grid-rows-[200px_200px_200px] gap-4"
          )}
        >
          <div style={{ gridArea: "box-1" }} className="bg-pink-600">
            1
          </div>
          <div style={{ gridArea: "box-2" }} className="bg-amber-600">
            2
          </div>
          <div style={{ gridArea: "box-3" }} className="bg-blue-600">
            3
          </div>
          <div style={{ gridArea: "box-4" }} className="bg-pink-600">
            4
          </div>
          <div style={{ gridArea: "box-5" }} className="bg-blue-600">
            5
          </div>
          <div style={{ gridArea: "box-6" }} className="bg-amber-600">
            6
          </div>
          <div style={{ gridArea: "box-7" }} className="bg-pink-600">
            7
          </div>
        </div>
      </div>
    </div>
  );
}
