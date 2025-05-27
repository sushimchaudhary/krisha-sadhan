// import Service from "../models/servicesModel.js";

// export const getAllServices = async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const createService = async (req, res) => {
//   try {
//     const { title, description, link } = req.body;
//     const image = req.file?.path;

//     if (!image) {
//       return res.status(400).json({ message: "Image is required" });
//     }

//     const newService = new Service({
//       title,
//       description,
//       link,
//       image: "/" + image.replace(/\\/g, "/"),
//     });

//     await newService.save();
//     res.status(201).json(newService);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const updateService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, link } = req.body;
//     const updatedData = { title, description, link };

//     if (req.file) {
//       updatedData.image = "/" + req.file.path.replace(/\\/g, "/");
//     }

//     const updatedService = await Service.findByIdAndUpdate(id, updatedData, {
//       new: true,
//     });

//     if (!updatedService) {
//       return res.status(404).json({ message: "Service not found" });
//     }

//     res.json(updatedService);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const deleteService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedService = await Service.findByIdAndDelete(id);

//     if (!deletedService) {
//       return res.status(404).json({ message: "Service not found" });
//     }

//     res.json({ message: "Service deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
