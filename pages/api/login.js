export default async function handler(req, res) {
  if (
    req.method === 'POST' &&
    req.body.matric !== undefined &&
    req.body.matric !== ''
  ) {
    let matric = req.body.matric.toUpperCase().trim();
    const end = matric.slice(-2);
    const patt = new RegExp('^[0-9]{4}/[0-9]{1}/[0-9]{5}' + end + '$');

    if ((end === 'AR' || end === 'EC') && patt.test(matric)) {
      return res.status(200).json({ matric: matric });
    }
    res.status(400).json({ message: 'Invalid matric number' });
  } else {
    return res.status(400).json({ message: 'Invalid matric number' });
  }
}
