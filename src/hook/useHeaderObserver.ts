import { useEffect, useState } from "react";

export default function useHeaderObserver(query: string) {
  const [activeIdSet, setActiveIdSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          if (entry.isIntersecting)
            setActiveIdSet((prev) => new Set([...prev, id]));
          else
            setActiveIdSet((prev) => {
              prev.delete(id);
              return new Set(prev);
            });
        });
      },
      { threshold: 1.0 }
    );

    document.querySelectorAll(query).forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.querySelectorAll(query).forEach((el) => observer.unobserve(el));
    };
  }, []);

  return activeIdSet;
}
