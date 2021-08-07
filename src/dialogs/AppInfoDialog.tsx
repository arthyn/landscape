import React, { useCallback } from 'react'
import { Dialog, DialogContent } from "../components/Dialog"
import { useHistory, useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { getApp } from '../logic/api';
import { PillButton } from '../components/Button';
import clipboardCopy from 'clipboard-copy';

interface AttributeProps {
  attr: string;
  value: string;
}

/**
 * 
 * @todo handle developer desk rendering
 */
const Attribute = ({ attr, value }: AttributeProps) => (
  <div className="h4">
    <h2 className="mb-2 text-gray-500">{ attr }</h2>
    <p className="font-mono">{ value }</p>
  </div>
)

export const AppInfoDialog = () => {
  const history = useHistory();
  const { appId } = useParams<{ appId: string }>();
  const { data } = useQuery(['apps', appId], () => getApp(appId));

  const copyApp = useCallback(async () => {
    clipboardCopy(data?.url || '')
  }, [data]);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && history.push('/')}>
      <DialogContent className="w-full max-w-3xl max-h-screen overflow-y-auto">
        <header className="flex items-center mb-8">
          <div className="relative w-32 h-32 mr-6 bg-gray-200 rounded-xl" style={{ backgroundColor: data?.color }}>
            {data?.img && <img className="absolute top-1/2 left-1/2 h-[40%] w-[40%] object-contain transform -translate-x-1/2 -translate-y-1/2" src={ data?.img } />}
          </div>
          <div>
            <h1 className="h2">{data?.name}</h1>
            {data?.description && <p className="h4 mt-2 text-gray-500">{data?.description}</p>}
            <div className="flex mt-4 space-x-4">
              <PillButton as="a" href={data?.url} target={data?.name || '_blank'}>Open App</PillButton>
              <PillButton variant="secondary" onClick={copyApp}>Copy App Link</PillButton>
            </div>
          </div>
        </header>
        <hr className="-mx-8" />
        <div className="mt-8 space-y-8">
          {data?.meta && data.meta.map((d, i) => (
            <Attribute key={d.attr + i} {...d} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}