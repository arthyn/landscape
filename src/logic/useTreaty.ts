import clipboardCopy from "clipboard-copy";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useDocketState, { Treaty } from "../state/docket";

export function useTreaty() {
  const { ship, desk } = useParams<{ ship: string; desk: string }>();
  const {
    installDocket,
    request
  } = useDocketState(state => ({ 
    request: state.request,
    installDocket: state.installDocket
  }))
  const [treaty, setTreaty] = useState<undefined | Treaty>(undefined);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    (async () => {
      setTreaty(await request(ship, desk));
    })();
  }, [ship, desk]);

  const copyApp = useCallback(async () => {
    clipboardCopy(`${ship}/${desk}`);
  }, [ship, desk]);

  const installApp = () => {
    installDocket(ship, desk);
    setInstalling(true);
  };

  return {
    ship,
    treaty,
    installing,
    installApp,
    copyApp
  }
}