// log specific events happening.
export const logEvent = ({
  event,
  params,
  ...args
}: {
  event: string;
  params?: { name: string; value: string }[];
  page?: {
    url: string;
  };
}) => {
  if (!window.dataLayer) return;

  window.dataLayer.push({
    event,
    ga: params,
    ...args,
  });
};
