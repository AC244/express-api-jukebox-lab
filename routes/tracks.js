const express = require('express')
const router = express.Router()
const Track = require('../models/track')

// CREATE a track
router.post('/tracks', async (req, res) => {
  try {
    const { title, artist } = req.body
    const newTrack = await Track.create({ title, artist })
    res.status(201).json(newTrack)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// all tracks
router.get('/tracks', async (req, res) => {
  try {
    const tracks = await Track.find()
    res.status(200).json(tracks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// single track by ID
router.get('/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id)
    if (!track) return res.status(404).json({ error: 'Track not found' })
    res.status(200).json(track)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// UPDATE a track
router.put('/tracks/:id', async (req, res) => {
  try {
    const { title, artist } = req.body;
    const updatedTrack = await Track.findByIdAndUpdate(
      req.params.id,
      { title, artist },
      { new: true }
    )
    if (!updatedTrack) return res.status(404).json({ error: 'Track not found' })
    res.status(200).json(updatedTrack)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE a track
router.delete('/tracks/:id', async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.id)
    if (!deletedTrack) return res.status(404).json({ error: 'Track not found' })
    res.status(200).json(deletedTrack);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
