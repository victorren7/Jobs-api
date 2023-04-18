const Job = require('../models/Job')
const { BadRequestError, NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
  
  res.status(StatusCodes.OK).json({jobs, count: jobs.length})

}

const getJob = async (req, res) => {
  const {user: {userId}, params: {id: jobsId}} = req

  const job = await Job.findOne({
    _id: jobsId,
    createdBy: userId
  })

  if (!job) {
    throw new NotFoundError(`No job with ${jobsId}`)
  }

  res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)

  res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
  const {   
    body: {company, position},
    user: {userId}, 
    params: {id: jobsId}
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }

  const job = await Job.findOneAndUpdate(
    {_id: jobsId, createdBy: userId}, 
    req.body, 
    {new: true, runValidators: true}
  )

  res.status(StatusCodes.OK).json({job})

}

const deleteJob = async (req, res) => {
  const {user: {userId}, params: {id: jobsId}} = req

  const job = await Job.findOneAndRemove({
    _id: jobsId,
    createdBy: userId
  })

  if (!job) {
    throw new NotFoundError(`No job with id ${jobsId}`)
  }

  res.status(StatusCodes.OK).send()

}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}