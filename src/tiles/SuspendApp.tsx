import React, { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Dialog, DialogContent } from "../components/Dialog";
import { getApp, toggleAppStatus } from "../logic/api";

export const SuspendApp = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { appId } = useParams<{ appId: string }>();
  const { data } = useQuery(['apps', appId], () => getApp(appId));
  const { mutate } = useMutation((id: string) => toggleAppStatus(id), {
    onSuccess: () => {
      history.push('/')
      queryClient.invalidateQueries(['apps'])
    }
  })

  // TODO: add optimistic updates
  const handleSuspendApp = useCallback(() => {
    mutate(appId)
  }, [])

  if (data?.status === 'suspended') {
    <Redirect to="/" />
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && history.push('/')}>
      <DialogContent>
        <h1 className="h4 mb-9">Suspend "{data?.name}"</h1>
        <p className="text-base tracking-tight mb-4 pr-6">Suspending an app will freeze its current state, and render it unable</p>
        <Button variant="destructive" onClick={handleSuspendApp}>
          Suspend
        </Button>
      </DialogContent>
    </Dialog>
  )
}