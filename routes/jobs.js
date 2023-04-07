const express = require('express');
const { getAllJobs, createJob, getJob, deleteJob, updateJob } = require('../controllers/jobs');
const router = express.Router()

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router