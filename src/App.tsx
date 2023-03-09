import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { permitState } from 'permit-fe-sdk';
import Child from './Child';
import Parent  from './Parent';
import { getAbility } from './CaslAbility';

function App() {
  // {create-board: true, update-board: false}
  // const [createBoard, setCreateBoard] = React.useState(false);
  // const [updateBoard, setUpdateBoard] = React.useState(false);
  const [isLoading] = React.useState(false);
  const [ability, setAbility] = React.useState<any>(undefined);

  useEffect(() => {
  // It is good to load permission state as soon as possible in the app
  getAbility().then((caslAbility: any) => {
    setAbility(caslAbility as any);
  });
  }, []);


  // useEffect(() => {
  //   setCreateBoard(permitState?.check("create", "board"))
  //   setUpdateBoard(permitState?.check("update", "board"))
  // }, [isLoading]);
return (
ability ? (
<Parent>
<Child/>
</Parent>
) : (
<div>
  lodding...
</div>));
//   return (
//     ability ? <div>loading</div> :
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           {createBoard && <p>
//             create board.
//           </p>}
//           {updateBoard && <p>
//             update board.
//           </p>}
//           <Child1></Child1>
//           <Child></Child>
//           <Can I="create" a="board" ability={ability}>
//   Yes, you can do this! ;)
// </Can>
//           <Can I="update" a="board" ability={ability}>
//   Yes, you can do this update! ;)
// </Can>

//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
  // );
}


export default App;
