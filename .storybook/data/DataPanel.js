import React from 'react';
import {
  useParameter,
  useAddonState
} from '@storybook/api';
import {
  observer
} from "mobx-react";

export default observer(() => {
  const state = useParameter('data', '');
  // if (!value){
  //   return null;
  // }
  // const [state, setState] = useAddonState('changes', value);
  // const updateData = () => {
  //   Object.keys(state).forEach(key => {
  //     value[key] = state[key];
  //   })
  // }
  // const saveChagne = e => {
  //   try {
  //     setState(JSON.parse(e.target.value))
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  //   onChange={saveChagne} onBlur={updateData}
  return <div style={{width:'100%',height:'100%'}}>
      <textarea style={{width:'100%',height:'100%',border: 'none',padding:0}} value={JSON.stringify(state, null, 4)}></textarea>
    </div>
})
