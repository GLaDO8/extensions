import { Detail, Toast, showToast } from "@raycast/api";
import { useState, useEffect } from "react";
import * as Splitwise from "./oauth/splitwise";
import { User } from "./interfaces";

export default function Command() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<User>();

  useEffect(() => {
    (async () => {
      try {
        await Splitwise.authorize();
        const fetchedItems = await Splitwise.fetchItems();
        setItems(fetchedItems);
        // setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        showToast({ style: Toast.Style.Failure, title: String(error) });
      }
    })();
  }, [Splitwise]);

  if (isLoading) {
    return <Detail isLoading={isLoading} />;
  }

  return <Detail markdown={items?.first_name} />;
}

interface Splitwise {
  authorize(): Promise<void>;
  fetchItems(): Promise<{ id: string; title: string }[]>;
}
