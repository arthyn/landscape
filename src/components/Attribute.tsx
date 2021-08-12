import React from 'react';
import _ from 'lodash';

interface AttributeProps {
  attr: string;
  children: React.ReactNode;
  title?: string;
}

export const Attribute = ({ attr, children, title }: AttributeProps) => (
  <div className="h4">
    <h2 className="mb-2 text-gray-500">{ title || _.capitalize(attr) }</h2>
    <p className="font-mono">{ children }</p>
  </div>
)

