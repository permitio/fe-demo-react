import React, { useEffect } from 'react';
import './App.css';
import { permitState } from 'permit-fe-sdk';
import { Can } from '@casl/react';
import { getAbility } from './CaslAbility';

export default function Child() {
  const [ability, setAbility] = React.useState<any>(undefined);
  // in this use effect you can get your ability from state or from api
  useEffect(() => {
  getAbility().then((caslAbility: any) => {
    setAbility(caslAbility as any);
  });
  }, []);
  
    return ( 
      ability ? (
      <div> 
        <p>Child Component</p>
        {/* you can check permissions with permit check to permission status */}
        {permitState?.check("create", "file") && <p>permit raw create file</p>}
        {permitState?.check("update", "file") && <p>permit raw update file</p>}
        {/* you can check permissions with casl Can component */}
        <Can I="create" a="file" ability={ability}>
          Yes, you can create file!
        </Can> 
        <Can I="update" a="file" ability={ability}>
          Yes, you can update this file!
        </Can>

      </div>)
      : (
        <div>loading...</div>
      )
    );
  }