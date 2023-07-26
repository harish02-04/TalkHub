export function getnameinitials(username) {
  const splitname = username.toUpperCase().split(' ');
  if (splitname.length > 1) {
    return splitname[0][0] + splitname[1][0];
  } else {
    return splitname[0][0];
  }
}
export function transform(snap) {
  console.log(snap);
  return snap
    ? Object.keys(snap).map(roomid => {
        return { ...snap[roomid], id: roomid };
      })
    : [];
}