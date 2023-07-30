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
export async function getuserupdate(userid, key, value, database) {
  console.log(value);
  const updates = {};
  updates[`profiles/${userid}/${key}`] = value;
  const getmessages = database
    .ref('/messages')
    .orderByChild('author/uid')
    .equalTo(userid)
    .once('value');
  const getrooms = database
    .ref('/rooms')
    .orderByChild('lastmessage/author/uid')
    .equalTo(userid)
    .once('value');
  const [msnap, rsnap] = await Promise.all([getmessages, getrooms]);
  msnap.forEach(ms => {
    updates[`/messages/${ms.key}/author/${key}`] = value;
  });
  rsnap.forEach(rs => {
    updates[`/rooms/${rs.key}/lastmessage/author/${key}`] = value;
  });

  return updates;
}

export function transformToarr(snap) {
  return snap ? Object.keys(snap) : [];
}

export function groupBy(arr, gkeyFn) {
  return arr.reduce((result, item) => {
    const gkey = gkeyFn(item);
    if (!result[gkey]) {
      result[gkey] = [];
    }
    result[gkey].push(item);
    return result;
  }, {});
}
