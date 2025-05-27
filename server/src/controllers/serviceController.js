import Service from '../models/Service.js';
import fs from 'fs';
import path from 'path';

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    const newService = new Service({ title, description, link, image: imagePath });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create service' });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link } = req.body;

    const existingService = await Service.findById(id);
    if (!existingService) return res.status(404).json({ message: 'Service not found' });

    if (req.file) {
      const oldImage = existingService.image;
      if (oldImage) {
        const oldPath = path.join('public', oldImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      existingService.image = `/uploads/${req.file.filename}`;
    }

    existingService.title = title;
    existingService.description = description;
    existingService.link = link;

    const updatedService = await existingService.save();
    res.json(updatedService);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update service' });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const imagePath = path.join('public', service.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await service.deleteOne();
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
};
