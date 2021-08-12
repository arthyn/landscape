import React, { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Dialog, DialogContent } from "../components/Dialog";
import { getApp, removeApp } from "../logic/api";

export const RemoveApp = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { appId } = useParams<{ appId: string }>();
  const { data } = useQuery(['apps', appId], () => getApp(appId));
  const { mutate } = useMutation((id: string) => removeApp(id), {
    onSuccess: () => {
      history.push('/')
      queryClient.invalidateQueries(['apps'])
    }
  })

  // TODO: add optimistic updates
  const handleRemoveApp = useCallback(() => {
    mutate(appId)
  }, [])

  return (
    <Dialog open={true} onOpenChange={(open) => !open && history.push('/')}>
      <DialogContent>
        <h1 className="h4 mb-9">Remove "{data?.name}"</h1>
        <p className="text-base tracking-tight mb-4 pr-6">Explanatory writing about what data will be kept.</p>
        <Button variant="destructive" onClick={handleRemoveApp}>
          Remove
        </Button>
      </DialogContent>
    </Dialog>
  )
}