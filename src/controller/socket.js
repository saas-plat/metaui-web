import socket from '../socket';

export const query = async(ctx, {name, where})=>{
  return await socket.query(name, where);
}

export const command = async(ctx, {name, args})=>{
  return await socket.command(name, args);
}
