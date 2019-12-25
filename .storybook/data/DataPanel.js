import React from 'react';
import {
  useParameter,
  useAddonState
} from '@storybook/api';

export default () => {
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
  return <textarea style={{width:'100%',height:'100%',border: 'none'}}
    value={JSON.stringify(state, null,2)}></textarea>
}
