import categoryModel from "./../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res)=>{
    try{
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message: "Name is required"});
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: "Category already exists"
            });
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save(); 
        res.status(201).send({
            success: true,
            message: "new Category created",
            category
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Category"
        });
    }
};

export const updateCategoryController = async (req, res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new: true});
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating category"
        });
    }
};

export const categoryController = async (req, res) => {
    try{
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while loading all categories"
        });
    }
};

export const singleCategoryController = async (req, res) => {
    try{
        const category = await categoryModel.find({slug: req.params.slug});
        res.status(200).send({
            success: true,
            message: "Getting Single Category Successfully",
            category
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while loading a category"
        });
    }
};

export const deleteCategoryController = async (req, res) => {
    try{
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Successfully Deleted Category"
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while Deleting a category"
        });
    }
};