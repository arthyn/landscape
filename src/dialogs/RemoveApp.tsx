import React, { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Dialog, DialogContent } from "../components/Dialog";
import api from "../state/api";
import {useCharge} from "../state/docket";

export const RemoveApp = () => {
  const history = useHistory();
  const { desk } = useParams<{ desk: string }>();
  const { title } = useCharge(desk);

  // TODO: add optimistic updates
  const handleRemoveApp = useCallback(() => {

    history.push('/')
    api.poke({
      app: 'docket',
      mark: 'docket-uninstall',
      json: desk
    });   

  }, [desk])

  return (
    <Dialog open={true} onOpenChange={(open) => !open && history.push('/')}>
      <DialogContent>
        <h1 className="h4 mb-9">Remove "{title}"</h1>
        <p className="text-base tracking-tight mb-4 pr-6">Explanatory writing about what data will be kept.</p>
        <Button variant="destructive" onClick={handleRemoveApp}>
          Remove
        </Button>
      </DialogContent>
    </Dialog>
  )
}
