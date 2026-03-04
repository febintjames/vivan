import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(options = {}) {
    const { threshold = 0.1, rootMargin = "0px" } = options;
    const targetRef = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const el = targetRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsIntersecting(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold, rootMargin }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return { targetRef, isIntersecting };
}
