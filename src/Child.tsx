import React, { useEffect } from 'react';
import './App.css';
import { permitState } from 'permit-fe-sdk';
import { Can } from '@casl/react';
import { getAbility } from './CaslAbility';

export default function Child() {
  const [ability, setAbility] = React.useState<any>(undefined);
  useEffect(() => {
  getAbility().then((caslAbility: any) => {
    setAbility(caslAbility as any);
    console.log(caslAbility);
  });
  }, []);
  
    return (
      ability ? (
      <div>
        <p>Child</p>
        {permitState?.check("create", "board") && <p>permit raw create board</p>}
        {permitState?.check("update", "board") && <p>permit raw update board</p>}
        <Can I="create" a="board" ability={ability}>
          Yes, you can do this!
        </Can>

      </div>)
      : (
        <div>loading...</div>
      )
    );
  }