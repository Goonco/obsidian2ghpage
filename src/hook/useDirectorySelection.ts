import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function useDirectorySelection() {
  const [selectedDir, setSelectedDir] = useState<string>("root");

  useEffect(() => {
    selectDir(selectedDir);
  }, []);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  function selectDir(selection: string) {
    setSelectedDir(selection);

    const params = new URLSearchParams(searchParams);
    params.set("directory", encodeURI(selection));
    replace(`${pathname}?${params.toString()}`);
  }

  return { selectedDir, selectDir };
}
