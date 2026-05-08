import { useCallback, useState } from 'react';

export function useToast(duration = 2400) {
  const [message, setMessage] = useState<string | null>(null);

  const show = useCallback(
    (msg: string) => {
      setMessage(msg);
      window.setTimeout(() => setMessage(null), duration);
    },
    [duration]
  );

  return { message, show };
}
