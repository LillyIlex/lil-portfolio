type ForceShow = () => void;

const registry = new Map<string, ForceShow>();

/** Called by each LazyMount instance to make itself force-mountable by id. */
export function registerLazySection(id: string, forceShow: ForceShow) {
  registry.set(id, forceShow);
  return () => {
    if (registry.get(id) === forceShow) registry.delete(id);
  };
}

/**
 * Immediately mounts every deferred section up to and including `id`
 * (in the given order), instead of waiting for scroll proximity.
 * Sections above the target must be at their real height too, or the
 * target's scroll position will still be wrong.
 */
export function forceShowUpTo(id: string, orderedIds: string[]) {
  const targetIndex = orderedIds.indexOf(id);
  if (targetIndex === -1) {
    registry.get(id)?.();
    return;
  }
  for (let i = 0; i <= targetIndex; i++) {
    registry.get(orderedIds[i]!)?.();
  }
}
