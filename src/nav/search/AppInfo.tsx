import React, { useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery } from 'react-query';
import { getApp } from '../../logic/api';
import { PillButton } from '../../components/Button';
import clipboardCopy from 'clipboard-copy';
import { useNavStore } from '../Nav';
import { useEffect } from 'react';
import { ShipName } from '../../components/ShipName';

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

type AppInfoProps = RouteComponentProps<{
  provider: string;
  appId: string;
}>

export const AppInfo = ({ match }: AppInfoProps) => {
  const select = useNavStore(state => state.select);
  const { provider, appId } = match.params;
  const { data } = useQuery(['apps', appId], () => getApp(appId || ''), {
    enabled: !!appId
  });

  useEffect(() => {
    select(<>Apps by <ShipName name={provider} className="font-mono" />: {data?.name}</>)
  }, [data?.name])

  const copyApp = useCallback(async () => {
    clipboardCopy(data?.url || '')
  }, [data]);

  return (
    <div className="dialog-inner-container text-black">
      <header className="grid grid-cols-[5rem,1fr] md:grid-cols-[8rem,1fr] auto-rows-min grid-flow-row-dense mb-5 sm:mb-8 gap-x-6 gap-y-4">
        <div className="flex-none row-span-1 md:row-span-2 relative w-20 h-20 md:w-32 md:h-32 bg-gray-200 rounded-xl" style={{ backgroundColor: data?.color }}>
          {data?.img && <img className="absolute top-1/2 left-1/2 h-[40%] w-[40%] object-contain transform -translate-x-1/2 -translate-y-1/2" src={ data?.img } />}
        </div>
        <div className="col-start-2">
          <h1 className="h2">{data?.name}</h1>
          {data?.description && <p className="h4 mt-2 text-gray-500">{data?.description}</p>}
        </div>
        <div className="col-span-2 md:col-span-1 flex items-center space-x-4">
          <PillButton as="a" href={data?.url} target={data?.name || '_blank'}>Open App</PillButton>
          <PillButton variant="secondary" onClick={copyApp}>Copy App Link</PillButton>
        </div>          
      </header>
      <hr className="-mx-5 sm:-mx-8" />
      <div className="mt-5 sm:mt-8 space-y-5 sm:space-y-8">
        {data?.meta && data.meta.map((d, i) => (
          <Attribute key={d.attr + i} {...d} />
        ))}
      </div>
    </div>
  )
}