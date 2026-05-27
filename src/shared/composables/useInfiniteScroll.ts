import { useIntersectionObserver } from "@vueuse/core";

export function useInfiniteScroll(
  onIntersect: () => void,
  refName = "sentinel",
) {
  const sentinel = useTemplateRef<HTMLElement>(refName);

  useIntersectionObserver(sentinel, ([entry]) => {
    if (entry?.isIntersecting) onIntersect();
  });
}
