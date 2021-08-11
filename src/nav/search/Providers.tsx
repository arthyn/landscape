import { debounce } from 'lodash-es';
import React, { useCallback, useEffect } from 'react'
import { useQuery } from 'react-query';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getProviders } from '../../logic/api';
import { useNavStore } from '../Nav';

type ProvidersProps = RouteComponentProps<{ provider: string; }>

export const Providers = ({ match, history }: ProvidersProps) => {
  const {
    searchInput,
    select 
  } = useNavStore(state => ({ searchInput: state.searchInput, select: state.select }));
  const { push } = history;
  const { path } = match;
  const provider = match?.params.provider;
  const { data } = useQuery(['providers', provider], () => getProviders(provider), {
    enabled: !!provider,
    keepPreviousData: true
  });
  const count = data?.length;

  useEffect(() => {
    select(null, provider);
  }, [])

  const handleSearch = useCallback(debounce((input: string) => {
    push(match?.path.replace(':provider', input.trim()))
  }, 300), [path]);

  useEffect(() => {
    if (searchInput) {
      handleSearch(searchInput);
    }
  }, [searchInput])

  return (
    <div className="dialog-inner-container md:px-6 md:py-8 h4 text-gray-400">
      <div>
        <h2 className="mb-3">Searching Software Providers</h2>
        <p>{count} result{count === 1 ? '' : 's'}</p>
      </div>
      {data && data.map(p => (
        <Link key={p.shipName} to={`${match?.path.replace(':provider', p.shipName)}/apps`} className="flex items-center space-x-3 default-ring ring-offset-2 rounded-lg">
          <div className="flex-none relative w-12 h-12 bg-black rounded-lg">
            {/* TODO: Handle sigils */}
          </div>
          <div className="flex-1 text-black">
            <h3 className="font-mono">{ p.nickname || p.shipName }</h3>
            { p.status && <p className="font-normal">{ p.status }</p>}
          </div>
        </Link>
      ))}
      <p>That's it!</p>
    </div>
  )
}