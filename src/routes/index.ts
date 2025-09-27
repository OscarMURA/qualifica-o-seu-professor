import { Router } from 'express';
import auth from './auth.routes';
import users from './users.routes';
import universities from './universities.routes';
import professors from './professors.routes';

const r = Router();
r.use('/auth', auth);
r.use('/users', users);
r.use('/universities', universities);
r.use('/professors', professors);

export default r;