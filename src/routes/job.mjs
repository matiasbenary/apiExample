import { Low, JSONFile } from 'lowdb'
import shortid from 'shortid'


const adapter = new JSONFile('./src/db.json')
const db = new Low(adapter)
await db.read();
db.data = db.data || { jobs: [] }

const { jobs } = db.data

export default (app) => {

  app.get(`/api/jobs`, async (req, res) => {
    const jobsFilter =  req.query.filter?jobs.filter(job=> job.tags.includes(req.query.filter)):jobs
    return res.status(200).send(jobsFilter);
  });

  app.post(`/api/jobs`, async (req, res) => {
    const { jobPosition, entity, tags } = req.body;
    const id = shortid.generate();
    const job = {jobPosition, entity, tags,id};
    jobs.push(job)
    await db.write()
    return res.status(201).send({
      error: false,
      job
    });
  })

  app.put(`/api/jobs`, async (req, res) => {
    const { jobPosition, entity, tags, id } = req.body;

    const index = jobs.findIndex(job=>job.id==id);
    jobs[index] = { jobPosition, entity, tags, id }
    await db.write()

    return res.status(202).send({
      error: false,
      job:jobs[index]
    });
  });

  app.delete(`/api/jobs/:id`, async (req, res) => {
    const { id } = req.params;
    const index = jobs.findIndex(job=>job.id==id);
    jobs.splice(index, 1);
    await db.write()
    
    return res.status(202).send({
      error: false
    })

  })

}
