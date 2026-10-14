"use client";

import { useEffect, useState } from "react";
import { useCommerceStore } from "@/stores/commerce-store";

export function StoreHydrator() {
  useEffect(() => { void useCommerceStore.persist.rehydrate(); }, []);
  return null;
}

export function useStoreReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setReady(useCommerceStore.persist.hasHydrated());
    sync();
    return useCommerceStore.persist.onFinishHydration(sync);
  }, []);
  return ready;
}
