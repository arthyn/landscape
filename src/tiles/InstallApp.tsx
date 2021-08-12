import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Dialog, DialogContent } from "../components/Dialog";
import { DocketHeader } from "../components/DocketHeader";
import useDocketState, { Treaty, useCharges } from "../state/docket";
import { PillButton } from "../components/Button";
import clipboardCopy from 'clipboard-copy';
import {TreatyMeta} from "../components/TreatyMeta";
import api from "../state/api";

export function InstallApp() {
  const history = useHistory();
  const charges = useCharges();
  const { ship, desk } = useParams<{ ship: string; desk: string }>();
  const [treaty, setTreaty] = useState<undefined | Treaty>(undefined);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    (async () => {
      setTreaty(await useDocketState.getState().request(ship, desk));
    })();
  }, [ship, desk]);

  const copyApp = useCallback(async () => {
    clipboardCopy(`${ship}/${desk}`);
  }, [ship, desk]);
  const installApp = () => {
    api.poke({
      app: 'hood',
      mark: 'kiln-install',
      json: {
        ship,
        desk,
        local: desk
      }
    });
    setInstalling(true);
  };

  useEffect(() => {
    if(desk in charges) {
      history.push('/');
    }
  }, [charges, desk]);



  return (
    <Dialog open onOpenChange={(open) => !open && history.push("/")}>
      <DialogContent>
        {(installing || !treaty) ? (
          <span>Loading...</span>
        ) : (
          <>
          <DocketHeader docket={treaty}>
            <div className="col-span-2 md:col-span-1 flex items-center space-x-4">
              <PillButton as="button" onClick={installApp}>
                Get App
              </PillButton>
              <PillButton variant="secondary" onClick={copyApp}>
                Copy App Link
              </PillButton>
            </div>
          </DocketHeader>
          <hr className="-mx-5 sm:-mx-8" />
          <TreatyMeta treaty={treaty} />
        </>
        )}
      </DialogContent>
    </Dialog>
  );
}
