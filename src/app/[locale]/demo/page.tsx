import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Demo() {
  return (
    <div>
      <h1>Demo</h1>
      <Link href="/demo/styles" className="mr-4 ml-4">
        <Button variant="outline">Styles</Button>
      </Link>
      <Link href="/demo/components" className="mr-4 ml-4">
        <Button variant="outline">Components</Button>
      </Link>
    </div>
  );
}
