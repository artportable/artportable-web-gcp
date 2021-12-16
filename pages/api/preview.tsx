export default function handler(req, res) {
  if (req.query.secret !== 'givemeartpreview') {
    return res.status(401).json({ message: 'Invalid token' })
  }
  res.setPreviewData({}, {
    maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
  })
  res.end('Preview mode enabled')
}