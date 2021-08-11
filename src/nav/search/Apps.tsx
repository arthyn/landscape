import React from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Link, RouteComponentProps } from 'react-router-dom';
import slugify from 'slugify';
import { App, getApps } from '../../logic/api';
import { useNavStore } from '../Nav';

type AppsProps = RouteComponentProps<{ provider: string; }>

export const Apps = ({ match }: AppsProps) => {
  const queryClient = useQueryClient();
  const { select } = useNavStore();
  const provider = match?.params.provider;
  const { data } = useQuery(['apps', provider], () => getApps(provider), {
    enabled: !!provider
  });
  const count = data?.length;

  useEffect(() => {
    select(`Apps by ${provider}`);
  }, [])

  const preloadApp = useCallback((app: App) => {
    queryClient.setQueryData(['apps', app.name], app);
  }, [queryClient]);

  return (
    <div className="dialog-inner-container md:px-6 md:py-8 h4 text-gray-400">
      <div>
        <h2 className="mb-3">Software developed by <span className="font-mono">{provider}</span></h2>
        <p>{count} result{count === 1 ? '' : 's'}</p>
      </div>
      {data && data.map(app => (
        <Link 
          key={app.name} 
          to={`${match?.path.replace(':provider', provider)}/${slugify(app.name)}`} 
          className="flex items-center space-x-3 default-ring ring-offset-2 rounded-lg"
          onClick={() => preloadApp(app)}
        >
          <div className="flex-none relative w-12 h-12 bg-gray-200 rounded-lg" style={{ backgroundColor: app.color }}>
            {app.img && <img className="absolute top-1/2 left-1/2 h-[40%] w-[40%] object-contain transform -translate-x-1/2 -translate-y-1/2" src={ app.img } />}
          </div>
          <div className="flex-1 text-black">
            <h3>{app.name}</h3>
            { app.description && <p className="font-normal">{app.description}</p>}
          </div>
        </Link>
      ))}
      <p>That's it!</p>
    </div>
  )
}