export function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function formatViews(views) {
    if (views >= 1_000_000) {
      return (
        (views / 1_000_000).toFixed(views % 1_000_000 === 0 ? 0 : 1) + "Tr"
      );
    }

    if (views >= 1_000) {
      return (views / 1_000).toFixed(views % 1_000 === 0 ? 0 : 1) + "N";
    }

    return views.toString();
  }