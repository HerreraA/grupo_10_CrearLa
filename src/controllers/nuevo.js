processRegister: async (req, res) => {
    const resultValidation = validationResult(req);
    
    if(resultValidation.errors.length > 0) {
        return res.render('userRegisterForm', {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
    }
    
    let userInDB = User.findByField('email', req.body.email);

    if(userInDB) {
        return res.render('./users/register.ejs', {
            errors: {
                email: {
                    msg: 'Este email ya está registrado'
                }
            },
            oldData: req.body
        });
    }

    let userToCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        imagen: req.file.filename
    }

    let userCreated = User.create(userToCreate);

    return res.redirect('/users/login');
},