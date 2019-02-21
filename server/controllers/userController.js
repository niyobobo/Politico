import joi from 'joi';
import moment from 'moment';
import Helper from '../helpers/helper';
import queries from '../database/queries';
import executor from '../database/queryExecutor';

const userController = {

    async userLogin(req, res) {
        const { email, password } = req.body;
        
        const schema = joi.object().keys({
            email: joi.string().email().min(3).required(),
            password: joi.string().min(6).required()
        });

        const validation = joi.validate(req.body, schema, ({ abortEarly: false}));
        
        if (validation.error != null) {
            const errors = [];
            for (let index = 0; index < validation.error.details.length; index++) {
                errors.push(validation.error.details[index].message.split('"').join(''));
            }

            return res.status(400).send({
                status: res.statusCode,
                error: errors,
            });
        }
        try {
            const { rowCount, rows } = await executor.query(queries.userLogin, [email]);
            if (rowCount === 0) {
                return res.status(404).send({
                    status: res.statusCode,
                    error: 'No user found for this credentials',
                });
            }

            if(Helper.comparePassword(rows[0].password, password)){
                const user_token= Helper.generateToken(rows[0].id, rows[0].isadmin);
                const user_data = rows[0];
                delete user_data.password;
                return res.status(200).send({
                    status: res.statusCode,
                    data: [{
                        token: user_token,
                        user:user_data
                    }],
                });
            } else {
                return res.status(400).send({
                    status: res.statusCode,
                    error: 'Your password is not correct'
                });
            }
        } catch (error) {
            return res.status(400).send({
                status: res.statusCode,
                error: error
            });
        }
    },

    async userCreateAccount(req, res) {
        const {
            firstname,
            lastname,
            othername,
            email,
            phoneNumber,
            passportUrl,
            password,
            isAdmin,
        } = req.body;

        const schema = joi.object().keys({
            firstname: joi.string().trim().required(),
            lastname: joi.string().trim().required(),
            othername: joi.string().trim().required(),
            email: joi.string().email().trim().required(),
            phoneNumber: joi.string().trim().required(),
            passportUrl: joi.string().trim().required(),
            password: joi.string().min(6).required(),
            isAdmin: joi.boolean().required(),
        });

        const validation = joi.validate(req.body, schema, {
            abortEarly: false
        });

        if (validation.error != null) {
            const errors = [];
            for (let index = 0; index < validation.error.details.length; index++) {
                errors.push(validation.error.details[index].message.split('"').join(''));
            }

            return res.status(400).send({
                status: res.statusCode,
                error: errors,
            });
        }

        const pswd = Helper.hashPasword(password);
        const user = [
            firstname,
            lastname,
            othername,
            email,
            phoneNumber,
            passportUrl,
            pswd,
            isAdmin,
            moment(new Date()),
        ];
        
        const { rowCount } = await executor.query(queries.userLogin, [email]);
        
        if (rowCount !== 0) {
            return res.status(400).send({
                status: res.statusCode,
                error: 'This account is already registered',
            });
        }

        try {
            const result = await executor.query(queries.createAccount, user);
            if (result.rowCount === 1) {
                const user_token= Helper.generateToken(result.rows[0].id, rows[0].isadmin);
                const user_data = result.rows[0];
                delete user_data.password;
                return res.status(201).send({
                    status: res.statusCode,
                    data: [{
                        token: user_token,
                        user:user_data
                    }],
                });
            }
        } catch (error) {
            return res.status(400).send({
                status: res.statusCode,
                error: error
            });
        }
    },
};

export default userController;