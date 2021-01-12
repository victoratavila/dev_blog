const category = require('../models/category');
const slugify = require('slugify');
const sendMail = require('../Mail/sender');

module.exports = {

    async getCategory(req, res){
        await category.findAll().then(category => {
            res.status(200).json(category);
        })
    },

    async createCategory(req, res){
        const { category_name } = req.body;

        const slug = slugify(category_name, {
            replacement: '-',
            lower: true
        })

        await category.findOne({ where: { category_name: category_name } }).then((search) => {
            if(search){
                res.status(200).json({result: 'This category was already registered, try a new one', alreadyExistsError: true});
            } else {
                category.create({ 
                    category_name: category_name,
                    slug: slug
                }).then(() => {
                    res.status(201).json({result: 'New category successfully created'});
                }).catch(err => {
                    console.log(err);
                }) 
            }
        })
    },

    async deleteCategory(req, res){
        const { id } = req.params;
        await category.findOne({ where: { id: id }}).then(result => {
            if(result){
                category.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    
                    sendMail(
                        'Contato Nexum', 
                        'contato@nxadmin.com.br', 
                        'victoratavila@hotmail.com', 
                        `Categoria ${result.category_name} Deletada com sucesso!`, 
                        'Olá! Passando aqui para te avisar que você removeu uma categoria com sucesso do Devblog! Até logo! :)');

                    res.status(200).json({result: 'This category was successfully deleted'});
                }).catch(err => {
                    console.log(err);
                })
            } else {
                res.status(400).json({error: `There is not a category related to the id ${id}, inform a new one and try again`});
            }
        })
    },

    async categoryBySlug(req, res){
        const { slug } = req.params;

        await category.findOne({
            where: {
                slug: slug
            },

            order: [
                ['id', 'DESC']
            ]
        }).then((result) => {
            if(result){
                res.status(200).json(result);
            } else {
                res.status(404).json({error: `There is not a category related to the slug ${slug}`});
            }
        }).catch(err => {
            console.log(err);
        })
    }

}