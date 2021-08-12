import React, { useCallback } from 'react'
import { Dialog, DialogContent } from "../components/Dialog"
import { useCharge } from '../state/docket';
import { useHistory, useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { getApp } from '../logic/api';
import { PillButton } from '../components/Button';
import clipboardCopy from 'clipboard-copy';
import _ from 'lodash';
import {DocketHeader} from '../components/DocketHeader';

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
    <h2 className="mb-2 text-gray-500">{ _.capitalize(attr) }</h2>
    <p className="font-mono">{ value }</p>
  </div>
)

const meta = ["license", "website", "version"] as const;

export const AppInfoDialog = () => {
  const history = useHistory();
  const { desk } = useParams<{ desk: string }>();
  const charge = useCharge(desk);
  const { base, info, title, ...attrs } = charge;
  const color = `#${attrs.color.slice(2).replace('.', '')}`.toUpperCase();


  const copyApp = useCallback(async () => {
    //clipboardCopy(data?.url || '')
  }, []);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && history.push('/')}>
      <DialogContent showClose={false} containerClass="w-full max-w-3xl p-4 max-h-screen overflow-y-auto">
        <DocketHeader docket={charge} >
          <div className="col-span-2 md:col-span-1 flex items-center space-x-4">
            <PillButton as="a" href={`/apps/${base}`} target={base}>Open App</PillButton>
            <PillButton variant="secondary" onClick={copyApp}>Copy App Link</PillButton>
          </div>          
        </DocketHeader>
        <hr className="-mx-5 sm:-mx-8" />
        <div className="mt-5 sm:mt-8 space-y-5 sm:space-y-8">
          {meta.map((d, i) => (
            <Attribute key={d} attr={d} value={attrs[d]} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
