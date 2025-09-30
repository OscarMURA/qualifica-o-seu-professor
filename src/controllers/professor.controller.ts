import { Request, Response } from 'express';
import { ProfessorModel } from '../models/professor.model';

export const createProfessor = async (req: Request, res: Response) => {
  const prof = await ProfessorModel.create(req.body);
  res.status(201).json(prof);
};

export const listProfessors = async (req: Request, res: Response) => {
  const validatedQuery = (req as any).validatedQuery;
  const { university, q } = validatedQuery;
  const filter: any = {};
  if (university) filter.university = university;
  if (q) filter.name = { $regex: q, $options: 'i' };
  const list = await ProfessorModel
    .find(filter)
    .populate('university', 'name')
    .sort({ name: 1 });
  res.json(list);
};

export const getProfessor = async (req: Request, res: Response) => {
  const prof = await ProfessorModel.findById(req.params.id).populate('university', 'name');
  if (!prof) return res.status(404).json({ message: 'Professor not found' });
  res.json(prof);
};

export const updateProfessor = async (req: Request, res: Response) => {
  const prof = await ProfessorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!prof) return res.status(404).json({ message: 'Professor not found' });
  res.json(prof);
};

export const deleteProfessor = async (req: Request, res: Response) => {
  const prof = await ProfessorModel.findByIdAndDelete(req.params.id);
  if (!prof) return res.status(404).json({ message: 'Professor not found' });
  res.status(204).send();
};